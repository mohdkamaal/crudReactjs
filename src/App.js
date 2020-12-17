import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editMode: false,
    };
  }

  submitBtn = (event) => {
    const name = this.name.value;
    const phone = this.phone.value;
    const email = this.email.value;
    let isValid = true;

    if (!email === this.state.update) {
      this.updateItem();
    } else {
      if (!this.name.value) {
        isValid = false;

        alert("Please enter your name.");
      } else isValid = true;

      if (!this.phone.value) {
        isValid = false;
        alert("please enter phone number");
      } else isValid = true;

      if (!this.email.value) {
        isValid = false;

        alert("Please enter your email Address.");
      } else isValid = true;

      if (typeof this.email.value !== "undefined") {
        var pattern = new RegExp(
          /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );

        if (!pattern.test(this.email.value)) {
          isValid = false;

          alert("Please enter valid email address.");
        } else isValid = true;
      }

      if (isValid) {
        const info = { name: name, phone: phone, email: email };
        const data = this.state.data;
        data.push(info);
        this.setState({ data: data });
        event.preventDefault();
        event.target.reset();
      }
    }
    return isValid;
  };

  deleteItem = (x) => {
    var data = this.state.data;
    data.splice(
      data.findIndex((xyz) => xyz.email === x),
      1
    );
    this.setState({ data: data });
  };

  editItem = (store) => {
    this.name.value = store.name;
    this.phone.value = store.phone;
    this.email.value = store.email;
    this.setState({ editMode: true });
  };
  // {
  //   [edit.target.name] = edit.target.value;
  //   this.setState({ input });
  // };

  updateItem = (email) => {
    debugger;
    const elementsIndex = this.state.data.findIndex(
      (element) => element.email === email
    );
    const newArray = [this.state.data];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      completed: !newArray[elementsIndex].completed,
    };
    this.setState({ data: newArray });
  };
  render() {
    const Card = (props) => (
      <div className="col-md-6 col-lg-3">
        <div className="card mb-3">
          <div className="card-body">
            <p className="card-title">
              <span>Name: </span>
              {props.info.name}
            </p>
            <p className="card-text">
              <span>Phone: </span>
              {props.info.phone}
            </p>
            <p className="card-text">
              <span>Email: </span>
              {props.info.email}
            </p>

            <button
              className="btn btn-success btn-sm"
              onClick={() => this.editItem(props.info)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => this.deleteItem(props.deleteMail)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );

    return (
      <div className="container">
        <h1>CRUD with React</h1>
        <hr />
        <div className="row">
          <form className="form-inline" onSubmit={this.submitBtn}>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              placeholder="Name"
              ref={(input) => (this.name = input)}
              // value={this.state.input.name}
            />
            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
              <input
                type="text"
                className="form-control"
                placeholder="Phone"
                ref={(input) => (this.phone = input)}
                // value={this.state.input.phone}
              />
            </div>
            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                ref={(input) => (this.email = input)}
                // value={this.state.input.email}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <hr />
        <h6>Your data cards are showing below:</h6>
        <div className="row">
          {this.state.data.map((info, index) => (
            <Card
              key={index}
              info={info}
              idCard={index}
              deleteMail={info.email}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
