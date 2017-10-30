// Include React
import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Auth from '../../utils/Auth';
import { connect } from 'react-redux';

require('./signup.css');

class Signup extends Component { 

	constructor(props) {
    super(props);
    this.state = {
    	value: '',
    	username: '',
    	password: '',
    	passwordRepeat: '',
    	email: '',
    	emailRepeat: '',
      redirectToReferrer: false
    };

    this.handleUsernameValidation = this.handleUsernameValidation.bind(this);
    this.handlePasswordValidation = this.handlePasswordValidation.bind(this);
    this.handlePasswordRepeat = this.handlePasswordRepeat.bind(this);
    this.handleEmailValidation = this.handleEmailValidation.bind(this);
    this.handleEmailRepeat = this.handleEmailRepeat.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameValidation(event) {
  	// username is passed in
  	const usernameVal = this.refs.username.value,
  				usernameForm = this.refs.usernameForm,
  				usernameFeedback = this.refs.usernameFeedback;
  	// username is updated in state
  	this.setState({
  		'username': usernameVal
  	});

    // username is checked to see if it matches certain length. If not, the screen will indicate it as such.
    if (usernameVal.length < 6) {
    	usernameForm.classList.remove("has-success");
      usernameForm.classList.add("has-error");
      usernameFeedback.textContent = "username must be at least 6 characters long";
    } else {
      usernameForm.classList.remove("has-error");

      usernameForm.classList.add("has-success");
      usernameFeedback.textContent = "Username valid!";
    }
  }

	handlePasswordValidation(event) {

		// password is passed in
		const passwordVal = this.refs.password.value;
		const passwordForm = this.refs.passwordForm;
		const passwordFeedback = this.refs.passwordFeedback;

		this.setState({
	  	'password': passwordVal
	  });

		const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
	  if (!passwordRegEx.test(passwordVal)) {
	    passwordForm.classList.remove("has-success");
	    passwordForm.classList.add("has-error");
	    passwordFeedback.textContent = "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and must be at least 8 characters long.";
	  } else {
	    passwordForm.classList.remove("has-error");

	    passwordForm.classList.add("has-success");
	    passwordFeedback.textContent = "Password set correctly!";    
	  }
	}

	handlePasswordRepeat(event) {
		const passwordVal = this.props.password;
		const passwordRepeat = this.refs.repeatPassword.value;
		const repeatPasswordForm = this.refs.repeatPasswordForm;
		const repeatPasswordFeedback = this.refs.repeatPasswordFeedback;

		this.setState({
	  	'passwordRepeat': passwordRepeat
	  });

		if (passwordVal !== passwordRepeat) {
      repeatPasswordForm.classList.remove("has-success");

      repeatPasswordForm.classList.add("has-error");
      repeatPasswordFeedback.textContent = "Passwords Don't Match";
    } else {
      repeatPasswordForm.classList.remove("has-error");

      repeatPasswordForm.classList.add("has-success");
      repeatPasswordFeedback.textContent = "Passwords Match!";    
    }
	}

 	handleEmailValidation(event) {

 		const emailVal = this.refs.email.value;
 		const emailForm = this.refs.emailForm;
 		const emailFeedback = this.refs.emailFeedback;
 		const emailAdditionalFeedback = this.refs.emailAdditionalFeedback;
	  const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	  this.setState({
      'email': emailVal
    });

	  if (!emailRegEx.test(emailVal)) {
      emailForm.classList.remove("has-success");

      emailForm.classList.add("has-error");
      emailFeedback.textContent = "Invalid Email";
      emailAdditionalFeedback.textContent = "Ex: someone@example.com";
    
    } else {
      emailForm.classList.remove("has-error");

      emailForm.classList.add("has-success");
      emailFeedback.textContent = "Valid Email!";
      emailAdditionalFeedback.textContent = "";
    }
  }

  handleEmailRepeat(event) {

 		const emailVal = this.refs.emailRepeat.value;
 		const emailForm = this.refs.emailRepeatForm;
 		const emailFeedback = this.refs.emailRepeatFeedback;
	  const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	  this.setState({
      'emailRepeat': emailVal
    });

	  if (!emailRegEx.test(emailVal)) {
      emailForm.classList.remove("has-success");

      emailForm.classList.add("has-error");
      emailFeedback.textContent = "Emails Don't Match";
    
    } else {
      emailForm.classList.remove("has-error");

      emailForm.classList.add("has-success");
      emailFeedback.textContent = "Emails Match!";
    }
  }

  signUpUser(username, email, password) {
  	axios.post("/apis/users/signup", {
      username: this.refs.username.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    }).then(function(data) {
      if (data.duplicateUser) {
        // Replace with Modal
        alert("Sorry, that username has been taken");
      } else {
        Auth.authenticateUser(data.data.token);
        this.setState({ 
          redirectToReferrer: true
        });
        console.log("It works!");
      }
    }.bind(this))
    .catch(function(err) {
      console.log(err);
    });
  }

	handleSubmit(event) {
		event.preventDefault();

  	const username = this.state.username;
  	const email = this.state.email;
  	const password = this.state.password;

		let userData = {
      username: username,
      email: email,
      password: password
    };

    if (!userData.username || !userData.email || !userData.password) {
      return alert("Please don't leave fields blank");
    }

    // If we have an email and password, run the signUpUser function
    this.signUpUser(userData.username, userData.email, userData.password);

    this.setState({
      value: '',
    	username: '',
    	password: '',
    	passwordRepeat: '',
    	email: '',
    	emailRepeat: ''
    });
	}

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
    	<div>
	    	<Nav />
				<div id="registration-container">
				<div className="registration-header">
					<h1>NEW MEMBER REGISTRATION</h1>
					<img className="registration-img" src={require("./img/registration.jpeg")} alt="Registration Image" />
				</div>
					<form onSubmit={this.handleSubmit.bind(this)}>		
						<div className="col-md-6 registration-form-inputs">							
							<div id="username-form" ref="usernameForm" className="form-group col-lg-12">
								<input placeholder="Enter Username" ref="username" className="form-control" id="username-input" value={this.state.username} onChange={this.handleUsernameValidation}/>
								<small id="username-feedback" ref="usernameFeedback" className=""></small>
							</div>
							
							<div id="password-form" className="form-group col-lg-12" ref="passwordForm">
								<input placeholder="Enter Password" type="password" ref="password" className="form-control" id="password-input" value={this.state.password} onChange={this.handlePasswordValidation} />
								<small id="password-feedback" ref="passwordFeedback" className=""></small>
							</div>
							
							<div id="repeat-password-form" className="form-group col-lg-12" ref="repeatPasswordForm">
								<input placeholder="Enter Password Again" type="password" ref="repeatPassword" className="form-control" id="repeat-password-input" value={this.state.passwordRepeat} onChange={this.handlePasswordRepeat} />
								<small id="repeat-password-feedback" className="" ref="repeatPasswordFeedback"></small>
							</div>
						
							<div id="email-form" className="form-group col-lg-12" ref="emailForm">
								<input placeholder="Enter Email" type="email" ref="email" className="form-control" id="email-input" value={this.state.email} onChange={this.handleEmailValidation} />
							  <p id="email-feedback" className="" ref="emailFeedback"></p>
							  <small id="email-additional-feedback" ref="emailAdditionalFeedback" className="form-text text-muted"></small>
							</div>
							
							<div id="email-repeat-form" className="form-group col-lg-12" ref="emailRepeatForm">
								<input placeholder="Enter Email Again" type="email" ref="emailRepeat" className="form-control" id="repeat-email-input" value={this.state.emailRepeat} onChange={this.handleEmailRepeat} />
								<small id="email-repeat-feedback" className="" ref="emailRepeatFeedback"></small>
							</div>									
						</div>
					
						<div className="col-md-6 text-center register-button">							
							<button type="submit" className="btn btn-primary signup">Register</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    value: state.signupStates[0].value,
    username: state.signupStates[0].username,
    password: state.signupStates[0].password,
    passwordRepeat: state.signupStates[0].passwordRepeat,
    email: state.signupStates[0].email,
    emailRepeat: state.signupStates[0].emailRepeat,
    redirectToReferrer: state.signupStates[0].redirectToReferrer
  };
}

export default connect(mapStateToProps)(Signup);