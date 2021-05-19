import React, { useEffect, useState } from "react";

export default function SideBarComment({ comment }) {
  const [invalid, setinvalid] = useState(false);
  const match = (obj) => {
    const content = document.getElementById("content");
    if (!content) return;

    const targetSelector = obj.target.selector;
    const quote = targetSelector[0].exact;
    const position = [targetSelector[1].start, targetSelector[1].end];

    const contentQuote = content.textContent.substring(
      position[0],
      position[1]
    );

    if (contentQuote != quote) {
      console.log(contentQuote, quote, "diff");
      console.log(position);
      const res = document.querySelectorAll(`span[data-id="${obj.id}"]`);
      for (let annotation of res) {
        annotation.classList.add("highlight");
        setinvalid(true);
      }
    } else {
      console.log("valid");
    }
  };
  useEffect(() => {
    match(comment);
  }, []);
  return (
    <div
      style={{
        backgroundColor: invalid ? "rgba(233, 26, 12, 0.425)" : "#e2e2e2",
        margin: "5px",
        padding: "5px",
      }}
    >
      {comment.target.selector[0].exact}
      {invalid && <div>Content doesnt match</div>}
    </div>
  );
}
