import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      edit: false,
      index: "",
      act: 0,
      itemsToDelete: [],
    };
  }

  submitBtn = (e) => {
    debugger;
    e.preventDefault();
    let data = this.state.data;
    const name = this.name.value;
    const phone = this.phone.value;
    const email = this.email.value;

    // if statement for submit or update

    let isValid = true;
    // if- statement fot valid fieldss
    if (!this.name.value) {
      isValid = false;
      alert("Please enter your name.");
    }

    if (!this.phone.value) {
      isValid = false;
      alert("please enter phone number");
    }

    if (!this.email.value) {
      isValid = false;
      alert("Please enter your email Address.");
    }

    if (typeof this.email.value !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(this.email.value)) {
        isValid = false;
        alert("Please enter valid email address.");
      }
    }

    if (isValid) {
      if (this.state.act === 0) {
        const info = { name: name, phone: phone, email: email };
        data.push(info);
      } else {
        //update
        let index = this.state.index;
        data[index].name = name;
        data[index].phone = phone;
        data[index].email = email;
      }

      this.setState({
        data: data,
        act: 0,
      });
      this.myForm.reset();
    }

    // this.name.focus();
  };

  deleteItem = (x) => {
    var del = this.state.data;
    del.splice(
      del.findIndex((xyz) => xyz.email === x),
      1
    );
    this.setState({ data: del });
  };

  editItem = (i) => {
    debugger;
    let currentItem = this.state.data[i];
    this.name.value = currentItem.name;
    this.phone.value = currentItem.phone;
    this.email.value = currentItem.email;
    this.setState({ act: 1, index: i });

    this.name.focus();
  };

  multipleDelete = (email) => {
    let currentItems = this.state.itemsToDelete;
    if (currentItems.indexOf(email) > -1) {
      currentItems = currentItems.filter((x) => x != email);
    } else {
      currentItems.push(email);
    }

    this.setState({ itemsToDelete: currentItems });
  };

  buttonToMultiDelete = () => {
    debugger;
    let deleteChecked = this.state.itemsToDelete;
    deleteChecked.splice(0, deleteChecked.length);
    this.setState({ data: deleteChecked });
  };

  render() {
    const Card = (props) => (
      <div className="col-md-6 col-lg-3">
        <div className="card mb-3">
          <div className="card-body">
            <input
              type="checkbox"
              aria-label="Checkbox for following text input"
              onClick={() => this.multipleDelete(props.detail.email)}
              checked={
                this.state.itemsToDelete.indexOf(props.detail.email) > -1
              }
            ></input>
            <p className="card-title">
              <span>Name: </span>
              {props.detail.name}
            </p>
            <p className="card-text">
              <span>Phone: </span>
              {props.detail.phone}
            </p>
            <p className="card-text">
              <span>Email: </span>
              {props.detail.email}
            </p>

            <button
              className="btn btn-success btn-sm"
              onClick={() => this.editItem(props.indexData)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => this.deleteItem(props.detail.email)}
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
          <form
            ref={(form) => (this.myForm = form)}
            className="form-inline"
            onSubmit={this.submitBtn}
          >
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

            {this.state.itemsToDelete.length > 0 && (
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => this.buttonToMultiDelete()}
              >
                Delete All
              </button>
            )}
          </form>
        </div>
        <hr />
        <h6>Your data cards are showing below:</h6>
        <div className="row">
          {this.state.data.map((data, i) => (
            <Card key={i} indexData={i} detail={data} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
