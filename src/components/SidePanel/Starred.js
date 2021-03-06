import React from "react";
import { connect } from "react-redux";
import { setCurrentChannel, setPrivateChannel } from "../../actions";
import { Menu, Icon } from "semantic-ui-react";
import firebase from "../../firebase";

class Starred extends React.Component {
  state = {
    user: this.props.currentUser,
    usersRef: firebase.database().ref("users"),
    activechannel: "",
    starredChannels: [],
  };
  componentDidMount = () => {
    if (this.state.user) {
      this.addListeners(this.state.user.uid);
    }
  };

  addListeners = (userId) => {
    this.state.usersRef
      .child(userId)
      .child("starred")
      .on("child_added", (snap) => {
        const starredChannels = {
          id: snap.key,
          ...snap.val(),
        };
        this.setState({
          starredChannels: [...this.state.starredChannels, starredChannels],
        });
      });
    this.state.usersRef
      .child(userId)
      .child("starred")
      .on("child_removed", (snap) => {
        const childToRemove = { id: snap.key, ...snap.val() };
        const filterChannels = this.state.starredChannels.filter((channel) => {
          return channel.id != childToRemove.id;
        });
        this.setState({ starredChannels: filterChannels });
      });
  };

  setActiveChannel = (channel) => {
    this.setState({ activechannel: channel.id });
  };
  changeChannel = (channel) => {
    this.setActiveChannel(channel);

    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false);
  };
  displayChannels = (starredchannels) => {
    return (
      starredchannels.length > 0 &&
      starredchannels.map((channel) => (
        <Menu.Item
          key={channel.id}
          onClick={() => this.changeChannel(channel)}
          name={channel.name}
          style={{ opacity: 0.7 }}
          active={channel.id === this.state.activechannel}
        >
          # {channel.name}
        </Menu.Item>
      ))
    );
  };
  render() {
    const { starredChannels } = this.state;
    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="star" />
            STARRED
          </span>{" "}
          ({starredChannels.length})
        </Menu.Item>
        {this.displayChannels(starredChannels)}
      </Menu.Menu>
    );
  }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(Starred);
