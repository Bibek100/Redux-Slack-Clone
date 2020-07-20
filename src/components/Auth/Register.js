import React from "react";
import { Link } from "react-router-dom";
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
  handleChnage = () => {};
  render() {
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for SlackChat
          </Header>

          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                type="text"
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="mail"
                onChange={this.handleChange}
                type="text"
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="text"
              />
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="PasswordConfirmation"
                onChange={this.handleChange}
                type="password"
              />
              <Button color="orange" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
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
