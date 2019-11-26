import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
        firstName:'',
        lastName:'',
      email: '',
      password: '',
        zipCode:'',
        comments:'',
      formErrors: {firstName:'', lastName:'',email: '', password: '',zipCode: '',comments: ''},
        firstNameValid:false,
        lastNameValid:false,
      emailValid: false,
      passwordValid: false,
        zipCodeValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
      let firstNameValid = this.state.firstNameValid;
      let lastNameValid = this.state.lastNameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let zipCodeValid = this.state.zipCodeValid;

    switch(fieldName) {
        case 'firstName':
            firstNameValid = value.match(/[a-zA-Z]/);
            fieldValidationErrors.firstName = firstNameValid ? '' : ' is invalid';

            break;
        case 'lastName':
            lastNameValid = value.match(/[a-zA-Z]/);
            fieldValidationErrors.lastName = lastNameValid ? '' : ' is invalid';
            break;
      case 'email':
        emailValid = value.match(/[a-zA-Z0-9]+@+[a-zA-Z0-9]+\.+[a-zA-Z0-9]/);
        fieldValidationErrors.email = emailValid ? '' : "is invalid,must have '@' and '.'";
        break;
      case 'password':
          passwordValid = value.length === 10;
          fieldValidationErrors.password = passwordValid ? '': ' must be 10 digits';
          break;
        case 'zipCode':
            zipCodeValid = value.length ===5;
            fieldValidationErrors.zipCode = zipCodeValid ? '': ' must be 5 digits';
            break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    firstNameValid:firstNameValid,
                    lastNameValid:lastNameValid,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    zipCodeValid: zipCodeValid,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.firstNameValid&&this.state.lastNameValid&&this.state.emailValid && this.state.passwordValid&& this.state.zipCodeValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }
    getSuspend(){
        let number = this.number;
        let password = this.password;
        number.value = "";
        password.value = "";
    }

  render () {
    return (
      <form className="demoForm">
          <h2>Feeback</h2>
          <h3>Love something? Hate something? Let us know!</h3>
          <h4>Note : Fields marked with an asterisk(*) are mandatory</h4>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>

          <div>
              <label>Title*:</label>
          <input type="radio" name="title" id="miss" value="miss" required="required"/>Miss
          <input type="radio" name="title" id="mr" value="mr" required="required"/>Mr.
          <input type="radio" name="title" id="mrs" value="mrs" required="required"/>Mrs.
          </div>


        <div className={`form-group ${this.errorClass(this.state.formErrors.firstName)}`}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" required className="form-control" name="firstName"
                 placeholder="First Name"
                 value={this.state.firstName}
                 onChange={this.handleUserInput}  />
        </div>

          <div className={`form-group ${this.errorClass(this.state.formErrors.lastName)}`}>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" required className="form-control" name="lastName"
                     placeholder="Last Name"
                     value={this.state.lastName}
                     onChange={this.handleUserInput}  />
          </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}  />
        </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Phone Number</label>
          <input type="number" className="form-control" name="password"
            placeholder="Phone Number"
            value={this.state.password}
            onChange={this.handleUserInput}  />

        </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.zipCode)}`}>
          <label htmlFor="zipCode">Zip Code</label>
          <input type="number" className="form-control" name="zipCode"
                 placeholder="Zip Code"
                 value={this.state.zipCode}
                 onChange={this.handleUserInput}  />
        </div>

          <div>
              <label >How did you hear*:</label>
              <input type='checkbox' name="source" value="facebook" /> Facebook
              <input type='checkbox' name="source" value="google" /> Google
              <input type='checkbox' name="source" value="yelp" /> Yelp
          </div>


          <div>
              <label htmlFor="comments">Comments*:</label>
              <textarea name="comments" id="comments" placeholder="Your comments" rows="5" cols="25"
                        value={this.state.comments} required onChange={this.handleUserInput}/>
          </div>
        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Submit</button>
          <button onClick={this.getSuspend.bind(this)}>Reset</button>

      </form>
    )
  }
}

export default Form;
