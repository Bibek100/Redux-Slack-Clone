import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import "semantic-ui-css/semantic.min.css";
import firebase from "./firebase";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithdevTools } from "redux-devtools-extension";

const store = createStore(() => {}, composeWithdevTools);

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);

        this.props.history.push("/");
      }
    });
  }
  setUser = () => {};
  render() {
    return (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

const RootWithAuth = withRouter(Root);
//wrapped root component with the withrouter
//that is high-order component so that we can make history
//object available to our component that lead us to use the functionality of push
//so that we can access route components

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,

  document.getElementById("root")
);

serviceWorker.unregister();
