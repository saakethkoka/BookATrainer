import React from "react";

class CreateAccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        emailInput:'',
        passwordInput: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    alert('A username was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label for="emailInput">
            Email:
        </label>
        <input type="email" name="emailInput" required onChange={this.handleChange} />

        <label for="passwordInput">
            Password:
        </label>
        <input type="text" name="passwordInput" required onChange={this.handleChange} />
        <button onSubmit={this.handleSubmit}>CreateAccount</button>
      </form>
    );
  }
}

export default CreateAccountForm;