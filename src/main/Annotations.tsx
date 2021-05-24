import React, { useEffect, useState } from "react";
import { Recogito } from "@recogito/recogito-js";

import "@recogito/recogito-js/dist/recogito.min.css";

import "./style.css";
import SideBar from "./SideBar";
import { innerContentDefault, myAnnotation, preAdded } from "./constants";

export default function Annotations() {
  const [recog, setrecog] = useState(null);

  const [innerContent, setinnerContent] = useState(innerContentDefault);

  const checkIfValid = (obj) => {
    const content = document.getElementById("content");

    const targetSelector = obj.target.selector;
    const quote = targetSelector[0].exact;
    const position = [targetSelector[1].start, targetSelector[1].end];

    const contentQuote = content.textContent.substring(
      position[0],
      position[1]
    );
    // console.log(contentQuote, quote);

    if (contentQuote != quote) {
      const res = document.querySelectorAll(`span[data-id="${obj.id}"]`);
      for (let annotation of res) {
        annotation.classList.add("highlight");
      }
      return false;
    } else {
      // console.log("valid");
      return true;
    }
  };

  const findClosestMatch = (item, r) => {
    const lengthOf =
      item.target.selector[1].end - item.target.selector[1].start;
    const term = item.target.selector[0].exact;

    const contentToSearch = document.getElementById("content").textContent;
    const n = contentToSearch.indexOf(term);

    const newItem = JSON.parse(JSON.stringify(item));
    newItem.target.selector[1].start = n;
    newItem.target.selector[1].end = n + lengthOf;

    r.addAnnotation(newItem);
    const res = document.querySelectorAll(`span[data-id="${item.id}"]`);
    for (let annotation of res) {
      annotation.classList.add("movedLocation");
    }
  };

  const setDefault = (r) => {
    // console.log(preAdded);
    for (let item of preAdded) {
      const isValid = checkIfValid(item);
      if (isValid) {
        r.addAnnotation(item);
      } else {
        findClosestMatch(item, r);
      }
    }
  };

  const onInit = () => {
    document.getElementById("content").innerHTML = innerContent;
    setTimeout(() => {
      const r = new Recogito({
        content: "content",
        locale: "auto",
        widgets: ["COMMENT"],
      });
      setDefault(r);
      setrecog(r);
      r.setAuthInfo({
        id: "1",
        displayName: "Display name",
      });
      r.on("createAnnotation", function (a) {
        console.log("created", a);
      });
    }, 200);
  };

  useEffect(() => {
    onInit();
  }, []);

  const addAnnotation = () => {
    if (!recog) return;
    recog.addAnnotation(myAnnotation);
    checkIfValid(myAnnotation);
  };

  const downloadAll = (e) => {
    e.preventDefault();
    console.log(recog.getAnnotations());
  };

  const loadAgain = () => {
    setDefault(recog);
  };

  return (
    <>
      <div id="test-content" style={{ display: "flex" }}>
        <div style={{ flex: 4 }}>
          <button onClick={addAnnotation}>Add annotation</button>
          <p>that ingenious hero</p>
          <div id="outer-container">
            <div style={{ paddingBottom: "90vh", backgroundColor: "gray" }}>
              Mock content in here
            </div>
            <span id="content" className="plaintext"></span>

            <div>
              <button onClick={loadAgain}>Load again</button>
            </div>

            <div>
              <button onClick={downloadAll}>Download all annotations</button>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, backgroundColor: "gray" }}>
          <SideBar comments={preAdded} />
        </div>
      </div>
    </>
  );
}
