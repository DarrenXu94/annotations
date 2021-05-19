import * as React from "react";
import Annotations from "./Annotations";
// routing, etc.

export default class App extends React.Component {
  public render() {
    return (
      <div>
        <h1>Annotation test</h1>
        <Annotations />
      </div>
    );
  }
}
