import React, { useEffect, useState } from "react";
import { Recogito } from "@recogito/recogito-js";

import "@recogito/recogito-js/dist/recogito.min.css";

import "./style.css";
import SideBar from "./SideBar";

var myAnnotation = {
  "@context": "http://www.w3.org/ns/anno.jsonld",
  id: "https://www.example.com/recogito-js-example/foo",
  type: "Annotation",
  body: [
    {
      type: "TextualBody",
      value: "This annotation was added via JS.",
    },
  ],
  target: {
    selector: [
      {
        type: "TextQuoteSelector",
        exact: "that ingenious hero",
      },
      {
        type: "TextPositionSelector",
        start: 38,
        end: 57,
      },
    ],
  },
};

const preAdded = [
  {
    "@context": "http://www.w3.org/ns/anno.jsonld",
    id: "#ce0ed291-766b-4763-8e91-90ce1d04e706",
    type: "Annotation",
    body: [
      {
        type: "TextualBody",
        value: "This is a comment",
      },
      {
        type: "TextualBody",
        value: "A Tag",
        purpose: "tagging",
      },
      {
        type: "TextualBody",
        value: "Another Tag",
        purpose: "tagging",
      },
    ],
    target: {
      selector: [
        {
          type: "TextQuoteSelector",
          exact: "Troy",
        },
        {
          type: "TextPositionSelector",
          start: 124,
          end: 128,
        },
      ],
    },
  },
  {
    "@context": "http://www.w3.org/ns/anno.jsonld",
    id: "#447d4bea-08dc-4bd0-ae51-31f5ed7a95a0",
    type: "Annotation",
    body: [
      {
        type: "TextualBody",
        value: "Another comment",
      },
    ],
    target: {
      selector: [
        {
          type: "TextQuoteSelector",
          exact: "death in battle",
        },
        {
          type: "TextPositionSelector",
          start: 646,
          end: 661,
        },
      ],
    },
  },
  {
    "@context": "http://www.w3.org/ns/anno.jsonld",
    id: "#d7197c87-b45d-4217-9c4f-27573030448f",
    type: "Annotation",
    body: [
      {
        type: "TextualBody",
        value: "Comment...",
      },
    ],
    target: {
      selector: [
        {
          type: "TextQuoteSelector",
          exact: "Ithaca",
        },
        {
          type: "TextPositionSelector",
          start: 963,
          end: 970,
        },
      ],
    },
  },
];

const innerContentDefault = `<h1>Homer: The Odyssey</h1>
<p>
  <strong>Tell me, O muse,</strong> of that ingenious hero who
  travelled far and wide after he had sacked the famous town of Troy.
  Many cities did he visit, and many were the nations with whose
  manners and customs he was acquainted; moreover he suffered much by
  sea while trying to save his own life and bring his men safely home;
  but do what he might he could not save his men, for they perished
  through their own sheer folly in eating the cattle of the Sun-god
  Hyperion; so the god prevented them from ever reaching home. Tell
  me, too, about all these things, O daughter of Jove, from whatsoever
  source you may know them.
</p>
<p>
  <strong>So now all who escaped death in battle</strong> or by
  shipwreck had got safely home except Ulysses, and he, though he was
  longing to return to his wife and country, was detained by the
  goddess Calypso, who had got him into a large cave and wanted to
  marry him. But as years went by, there came a time when the gods
  settled that he should go back to Ithaca; even then, however, when
  he was among his own people, his troubles were not yet over;
  nevertheless all the gods had now begun to pity him except Neptune,
  who still persecuted him without ceasing and would not let him get
  home.
</p>`;

export default function Annotations() {
  const [recog, setrecog] = useState(null);

  const [innerContent, setinnerContent] = useState(innerContentDefault);

  const checkIfValid = (obj) => {
    const content = document.getElementById("content");

    const targetSelector = obj.target.selector;
    const quote = targetSelector[0].exact;
    const position = [targetSelector[1].start, targetSelector[1].end];

    const contentQuote = content.innerText
      .replace(/(\r\n|\n|\r)/gm, "")
      .substring(position[0], position[1]);

    if (contentQuote != quote) {
      const res = document.querySelectorAll(`span[data-id="${obj.id}"]`);
      for (let annotation of res) {
        annotation.classList.add("highlight");
      }
    } else {
      console.log("valid");
    }
  };

  const setDefault = (r) => {
    console.log(preAdded);
    for (let item of preAdded) {
      r.addAnnotation(item);
    }
  };

  const onInit = () => {
    document.getElementById("content").innerHTML = innerContent;
    // var r = Recogito.init({
    //   content: "content", // Element id or DOM node to attach to
    //   locale: "auto",
    //   widgets: ["COMMENT"],
    //   relationVocabulary: ["isRelated", "isPartOf", "isSameAs "],
    // });
    setTimeout(() => {
      console.log("Set recog");
      const r = new Recogito({
        content: "content",
        locale: "auto",
        widgets: ["COMMENT"],
      });
      setDefault(r);
      setrecog(r);
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

  const updateBody = () => {
    document.getElementById("content").innerHTML = innerContent;
  };

  const updateAnnotation = () => {
    if (!recog) return;

    const newObj = Object.assign({}, myAnnotation, {
      body: [
        {
          type: "TextualBody",
          value: "This annotation was added via JS, and has been updated now.",
        },
      ],
      target: {
        selector: [
          {
            type: "TextQuoteSelector",
            exact: "ingenious hero who",
          },
          {
            type: "TextPositionSelector",
            start: 43,
            end: 61,
          },
        ],
      },
    });
    console.log({ newObj });
    // recog.removeAnnotation(myAnnotation);

    recog.addAnnotation(newObj);
  };

  return (
    <>
      <div id="test-content" style={{ display: "flex" }}>
        <div style={{ flex: 4 }}>
          <button onClick={addAnnotation}>Add annotation</button>
          <p>that ingenious hero</p>
          {/* <button onClick={updateAnnotation}>Update annotation</button> */}
          <div id="outer-container">
            <span id="content" className="plaintext"></span>
            <textarea
              name="textarea"
              value={innerContent}
              onChange={(e) => {
                setinnerContent(e.target.value);
              }}
              cols={100}
              rows={30}
            ></textarea>
            <button onClick={updateBody}>Update</button>
          </div>
        </div>
        <div style={{ flex: 1, backgroundColor: "gray" }}>
          <SideBar comments={preAdded} />
        </div>
      </div>
    </>
  );
}
