import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Books from "./Books";
import { NavLink } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h1>
          <span className="logo_intro">
            Номны Өөрт байгаа номоо байхгүй номоор солиороой.
          </span>
        </h1>
        <div className="nav_filter see_all ">
          <button className="home_button">
            <NavLink to="/books">Бүгд</NavLink>
          </button>
        </div>
        <div className="outer_holder">
          <Books display="home" />
        </div>
        <hr />
        <footer></footer>
      </div>
    );
  }
}

export default connect(null, actions)(Home);
