import React from "react";

export default function On_trade_description(props) {
  console.log(props);
  return (
    <div>
      <p className="sub_title">
        <b>{props.name}</b>
      </p>
      <p className="sub_title">
        <b>Owner:</b> {props.createdBy}
      </p>
      <p className="sub_title">
        <b>With:</b> {props.requestedBy}
      </p>
      <p className="sub_title">Currently on Trade</p>
      {props.createdById == props.currentUser ? (
        <div>
          <button
            className="btn btn-info"
            onClick={() => {
              props.handleDeleteOfTrade(props.id);
            }}
          >
            Солилцоог хийх
          </button>
        </div>
      ) : (
        <p className="sub_title">
          <strong>Та амжилттай солилцлоо</strong>
        </p>
      )}
    </div>
  );
}
