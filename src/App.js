import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      store: [],
    };
  }

  componentDidMount() {
    this.setState({
      store: this.data,
    });
  }

  render() {
    return (
      <div>
        <h1>hello crud</h1>
      </div>
    );
  }
}
export default App;
