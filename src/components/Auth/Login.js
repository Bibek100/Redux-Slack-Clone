import React from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import md5 from "md5";
import {
  Grid,
  Form,
  Header,
  Icon,
  Segment,
  Button,
  Message,
} from "semantic-ui-react";
class Login extends React.Component {
  state = {
    email: "",
    password: "",

    errors: [],
    loading: false,
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((signedInUser) => {
          console.log(signedInUser);
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

  isFormValid = ({ email, password }) => email && password;

  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  render() {
    const {
      email,
      password,

      errors,
      loading,
    } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="violet" textAlign="center">
            <Icon name="puzzle piece" color="violet" />
            Login for SlackChat
          </Header>

          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="mail"
                value={email}
                onChange={this.handleChange}
                className={this.handleInputError(errors, "email")}
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
                className={this.handleInputError(errors, "password")}
                type="password"
              />

              <Button
                className={loading ? "loading" : ""}
                color="violet"
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
            Dont have and account?
            <Link to="/Register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
export default Login;
