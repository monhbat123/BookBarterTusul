import React from "react";

export default function On_trade_description(props) {
  console.log(props);
  return (
    <div>
      <p className="sub_title">
        <b>{props.name}</b>
      </p>
      <p className="sub_title">
        <b>Эзэмшигч:</b> {props.createdBy}
      </p>
      <p className="sub_title">
        <b>Солилцогч:</b> {props.requestedBy}
      </p>
      <p className="sub_title">
        <strong>Одоогоор солилцоо явагдаж байна</strong>
      </p>
      {props.createdById == props.currentUser ? (
        <div>
          <p className="sub_title">
            Таны солилцоо хийсэн хүний утасны дугаар <br></br>
            <strong>{props.rating}</strong>
          </p>
          <button
            className="btn btn-info"
            style={{ marginTop: "50px" }}
            onClick={() => {
              props.handleDeleteOfTrade(props.id);
            }}
          >
            Солилцоо хийгдсэн
          </button>
        </div>
      ) : (
        <p className="sub_title">
          Таны солилцоо хийсэн хүний утасны дугаар <br></br>
          <strong>{props.rating}</strong>
        </p>
      )}
    </div>
  );
}
