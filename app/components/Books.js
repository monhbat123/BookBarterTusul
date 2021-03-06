import React from "react";
import BookHolder from "./stateless/BookHolder";
import { connect } from "react-redux";
import * as actions from "../actions/book_actions";
import { NavLink } from "react-router-dom";
import history from "../history";
class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterToShow: "all",
    };
    console.log(props.auth);
  }

  componentWillMount() {
    this.props.getBooks();
    if (this.props.auth.authenticated) {
      this.props.getBooksOnTrade();
    }
  }

  deleteBook(bookId) {
    this.props.deleteBook(bookId);
    // delete book from the state as well .
  }

  changeFilter(display) {
    //control of view
    if (display == "all") {
      this.refs.all.classList.add("filter_active");
      this.refs.trades.classList.remove("filter_active");
    } else {
      this.refs.trades.classList.add("filter_active");
      this.refs.all.classList.remove("filter_active");
    }
    this.setState({
      filterToShow: display,
    });
  }

  deleteTrade(tradeId) {
    this.props.deleteTrade(tradeId);
  }

  acceptTrade(tradeId) {
    this.props.acceptTrade(tradeId);
  }

  handleRequest(info) {
    if (this.props.auth.authenticated) {
      this.props.requestTrade(info);
    } else {
      history.push("/signin");
      this.props.alertMsg("Please Log In!");
    }
  }

  render() {
    // get all the books by mapping  ....
    const allBooks = this.props.handleBooks.books
      ? this.props.handleBooks.books.map((e, i) => {
          let currentUser = this.props.auth.authenticated
            ? this.props.auth.user.id
            : "annonymous";
          return (
            <BookHolder
              onTrade={e.onTrade}
              createdBy={e.createdBy}
              createdById={e.createdById}
              key={e._id}
              name={e.name}
              id={e._id}
              img_url={e.img_url}
              author={e.author}
              rating={e.rating}
              currentUser={currentUser}
              delete={this.deleteBook.bind(this)}
              authed={this.props.auth.authenticated}
              handleRequest={this.handleRequest.bind(this)}
            />
          );
        })
      : null;
    //get all the books on trade
    const booksOnTrade =
      this.props.trades && this.props.auth.authenticated ? (
        this.props.trades.map((e, i) => {
          let currentUser = this.props.auth.user.id;
          return (
            <BookHolder
              type="trade"
              onTrade={e.onTrade}
              createdBy={e.createdBy}
              createdById={e.createdById}
              requestedBy={e.requestedBy}
              requestedById={e.requestedById}
              key={i}
              name={e.name}
              id={e._id}
              img_url={e.img_url}
              author={e.author}
              rating={e.rating}
              currentUser={currentUser}
              delete={this.deleteBook.bind(this)}
              authed={this.props.auth.authenticated}
              handleRequest={this.handleRequest.bind(this)}
              handleDeleteOfTrade={this.props.deleteTrade.bind(this)}
              handleAcceptTrade={this.props.acceptTrade.bind(this)}
            />
          );
        })
      ) : (
        <div>
          <h3>Эхлээд та нэвтэрнэ үү!</h3>
        </div>
      );
    return (
      <div style={{ marginTop: "20px" }}>
        {this.props.display === "home" ? null : (
          <div className="nav_filter">
            <p
              ref="all"
              onClick={() => {
                this.changeFilter("all");
              }}
              className="filter_active"
            >
              Бүгд
            </p>
            {this.props.auth.authenticated ? (
              <p
                ref="trades"
                onClick={() => {
                  this.changeFilter("trades");
                }}
              >
                Таны солилцоонууд{" "}
                <span className="badge">{this.props.trades.length}</span>
              </p>
            ) : null}
          </div>
        )}

        {this.state.filterToShow === "all" ? (
          <div className=" book_container">{allBooks}</div>
        ) : (
          <div className=" book_container">{booksOnTrade}</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

Books = connect(mapStateToProps, actions)(Books);

export default Books;
