import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './createAccount.css';


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

  handleChange= (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div class="createAccount">
        <h2 class="text-center">Create An Account</h2>
        <form name="createAccountForm" onSubmit={this.handleSubmit}>
          <label for="emailInput">
              Email:
              <input type="email" name="emailInput" required onChange={this.handleChange} />
          </label>
          <br></br>
          <label for="passwordInput"> 
              Password:
              <input type="text" name="passwordInput" required onChange={this.handleChange} />
          </label>
          <button onSubmit={this.handleSubmit}>CreateAccount</button>
        </form>
      </div>
    );
  }
}

export default CreateAccountForm;