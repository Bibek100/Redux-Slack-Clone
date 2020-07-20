import React from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import {
  Grid,
  Form,
  Header,
  Icon,
  Segment,
  Button,
  Message,
} from "semantic-ui-react";
class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
  };

  isFormValid = (values) => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = {
        message: "Fill in and fields",
      };
      this.setState({ errors: errors.concat(error) });
    } else if (!this.isPasswordValid(this.state)) {
      error = {
        message: "Password is invalid",
      };
      this.setState({ errors: errors.concat(error) });
    } else {
      return true;
    }
  };
  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };
  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if ((password = !passwordConfirmation)) {
      return false;
    } else {
      return true;
    }
  };
  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          console.log(createdUser);
          this.setState({ loading: false });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          });
        });
    }
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading,
    } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for SlackChat
          </Header>

          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                value={username}
                onChange={this.handleChange}
                type="text"
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="mail"
                value={email}
                onChange={this.handleChange}
                type="text"
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
                type="password"
              />
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="PasswordConfirmation"
                value={passwordConfirmation}
                onChange={this.handleChange}
                type="password"
              />
              <Button
                className={loading ? "loading" : ""}
                color="orange"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {this.state.errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Already a User?
            <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
export default Register;
