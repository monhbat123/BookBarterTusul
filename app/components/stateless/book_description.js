import React from "react";

export default function Book_description(props) {
  return (
    <div>
      <p className="sub_title">
        <b>{props.name}</b>
      </p>
      <p className="sub_title">
        <b>Эзэмшигч:</b> {props.createdBy}
      </p>
      <p className="sub_title">
        <b>Үнэлгээ:</b> {props.rating} of 5
      </p>
      {props.onTrade ? (
        <p className="highlighted">Солилцогдож байгаа</p>
      ) : (
        <button
          className="btn btn-info"
          style={{ color: "black", background: "white" }}
          onClick={() => {
            props.handleRequest(props);
          }}
        >
          Хүсэлт илгээх
        </button>
      )}
    </div>
  );
}
