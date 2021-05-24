import React from "react";
import SideBarComment from "./SideBarComment";

export default function SideBar({ comments }) {
  const content = document.getElementById("content");

  return (
    <div>
      {content &&
        comments.map((comment) => {
          return <SideBarComment key={comment.id} comment={comment} />;
        })}
    </div>
  );
}
