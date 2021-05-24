export const preAdded = [
  {
    "@context": "http://www.w3.org/ns/anno.jsonld",
    id: "#ce0ed291-766b-4763-8e91-90ce1d04e706",
    type: "Annotation",
    body: [
      {
        type: "TextualBody",
        value: "This is a comment",
        created: "2020-05-18T09:39:47.582Z",
        creator: {
          id: "2",
          name: "test2",
        },
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
          exact: "Ijhaca;",
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

export const innerContentDefault = `<h1>Homer: The Odyssey</h1> 
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

export var myAnnotation = {
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
