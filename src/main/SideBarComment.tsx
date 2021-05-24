import React, { useEffect, useState } from "react";

export default function SideBarComment({ comment }) {
  const [invalid, setinvalid] = useState(false);
  const [invalidWord, setinvalidWord] = useState(null);
  const match = (obj) => {
    const content = document.getElementById("content");
    console.log("match updated");
    if (!content) return;

    const targetSelector = obj.target.selector;
    const quote = targetSelector[0].exact;
    const position = [targetSelector[1].start, targetSelector[1].end];

    const contentQuote = content.textContent.substring(
      position[0],
      position[1]
    );

    console.log(targetSelector[1].start);

    console.log(contentQuote, quote);

    if (contentQuote != quote) {
      console.log(contentQuote, quote, "diff");
      console.log(position);
      const res = document.querySelectorAll(`span[data-id="${obj.id}"]`);
      for (let annotation of res) {
        annotation.classList.add("highlight");
      }
      // Show the new word
      // console.log({ contentQuote });
      setinvalid(true);
      setinvalidWord(contentQuote);
    } else {
      console.log("valid");
    }
  };
  useEffect(() => {
    match(comment);
  }, []);

  const walkTextNodes = (node, stopOffset, nodeArray?) => {
    const nodes = nodeArray ? nodeArray : [];

    const offset = (function () {
      var runningOffset = 0;
      nodes.forEach(function (node) {
        runningOffset += node.textContent.length;
      });
      return runningOffset;
    })();

    let keepWalking = true;

    if (offset > stopOffset) return false;

    if (node.nodeType === 3) nodes.push(node);

    node = node.firstChild;

    while (node && keepWalking) {
      keepWalking = walkTextNodes(node, stopOffset, nodes);
      node = node.nextSibling;
    }

    return nodes;
  };

  const calculateDomPositionWithin = (textNodeProperties, charOffsets) => {
    var positions = [];

    textNodeProperties.forEach(function (props, i) {
      charOffsets.forEach(function (charOffset, j) {
        if (charOffset >= props.start && charOffset <= props.end) {
          // Don't attach nodes for the same charOffset twice
          var previousOffset =
            positions.length > 0
              ? positions[positions.length - 1].charOffset
              : false;

          if (previousOffset !== charOffset)
            positions.push({
              charOffset: charOffset,
              node: props.node,
              offset: charOffset - props.start,
            });
        }
      });

      // Break (i.e. return false) if all positions are computed
      return positions.length < charOffsets.length;
    });

    return positions;
  };

  const charOffsetsToDOMPosition = (content, charOffsets) => {
    const maxOffset = Math.max.apply(null, charOffsets);

    const textNodeProps = (() => {
      let start = 0;
      return walkTextNodes(content, maxOffset).map(function (node) {
        var nodeLength = node.textContent.length,
          nodeProps = { node: node, start: start, end: start + nodeLength };

        start += nodeLength;
        return nodeProps;
      });
    })();

    return calculateDomPositionWithin(textNodeProps, charOffsets);
  };

  function scrollIntoView(t) {
    if (typeof t != "object") return;

    if (t.getRangeAt) {
      // we have a Selection object
      if (t.rangeCount == 0) return;
      t = t.getRangeAt(0);
    }

    if (t.cloneRange) {
      // we have a Range object
      var r = t.cloneRange(); // do not modify the source range
      r.collapse(true); // collapse to start
      var t = r.startContainer;
      // if start is an element, then startOffset is the child number
      // in which the range starts
      if (t.nodeType == 1) t = t.childNodes[r.startOffset];
    }

    // if t is not an element node, then we need to skip back until we find the
    // previous element with which we can call scrollIntoView()
    let o = t;
    while (o && o.nodeType != 1) o = o.previousSibling;
    t = o || t.parentNode;
    if (t) t.scrollIntoView();
  }

  const getPosition = () => {
    const content = document.getElementById("content");
    console.log("match updated");
    if (!content) return;
    const targetSelector = comment.target.selector;
    const quote = targetSelector[0].exact;
    const position = [targetSelector[1].start, targetSelector[1].end];
    const contentQuote = content.textContent.substring(
      position[0],
      position[1]
    );

    console.log({ contentQuote });
    let selection = window.getSelection();

    if (selection.rangeCount > 0) {
      selection.removeAllRanges();
    }
    const [domStart, domEnd] = charOffsetsToDOMPosition(content, [
      position[0],
      position[1],
    ]);
    console.log({ domStart, domEnd });

    let range = new Range();
    range.setStart(domStart.node, domStart.offset);
    range.setEnd(domEnd.node, domEnd.offset);

    selection.addRange(range);
    scrollIntoView(window.getSelection());
  };
  return (
    <div
      style={{
        backgroundColor: invalid ? "rgba(233, 26, 12, 0.425)" : "#e2e2e2",
        margin: "5px",
        padding: "5px",
      }}
    >
      {comment.target.selector[0].exact}
      {invalid && (
        <div>
          Content doesnt match. Should be {comment.target.selector[0].exact} but
          instead found {invalidWord}
        </div>
      )}
      <button
        onClick={(e) => {
          e.preventDefault();
          getPosition();
        }}
      >
        Show location
      </button>
    </div>
  );
}
