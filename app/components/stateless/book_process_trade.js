import React from "react";

export default function Book_process_description(props) {
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
        <b>Байршил:</b> {props.address}
      </p>
      <p className="sub_title">
        <b>Хүсэлт илгээсэн:</b> {props.requestedBy}
      </p>
      <p className="sub_title">
        <b>Төлөв:</b> явагдаж байна
      </p>
      {props.createdById == props.currentUser ? (
        <div>
          <button
            className="btn btn-info"
            onClick={() => {
              props.handleAcceptTrade(props.id);
            }}
          >
            Accept
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              props.handleDeleteOfTrade(props.id);
            }}
          >
            Decline
          </button>
        </div>
      ) : (
        <p className="sub_title">
          <strong>Хариу өгөхийг хүлээж байна</strong>
        </p>
      )}
    </div>
  );
}
