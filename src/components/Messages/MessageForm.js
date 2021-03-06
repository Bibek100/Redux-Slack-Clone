import React from "react";
import { Segment, Button, Input, Icon, Form } from "semantic-ui-react";
import firebase from "../../firebase";
import FileModal from "./FileModal";
import { v4 as uuidv4 } from "uuid";
import ProgressBar from "./ProgressBar";

class MessageForm extends React.Component {
  state = {
    storageRef: firebase.storage().ref(),
    uploadState: "",
    uploadTask: null,
    percentUploaded: 0,
    message: "",
    loading: false,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    errors: [],
    modal: false,
  };

  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  createMessage = (fileUrl = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL,
      },
    };
    if (fileUrl !== null) {
      message["image"] = fileUrl;
    } else {
      message["content"] = this.state.message;
    }
    return message;
  };
  sendMessage = () => {
    const { getMessagesRef } = this.props;
    const { message, channel, errors, modal } = this.state;

    if (message) {
      this.setState({ loading: true });
      getMessagesRef()
        .child(channel.id)
        .push() // push onto messagesRef
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: "", errors: [] });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            loading: false,
            errors: errors.concat(err),
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: "Add a message." }),
      });
    }
  };

  getPath = () => {
    if (this.props.isPrivateChannel) {
      return `chat/private-${this.state.channel.id}`;
    } else {
      return `chat/public`;
    }
  };

  uploadFile = (file, metadata) => {
    const pathToUpload = this.state.channel.id;
    const ref = this.props.getMessagesRef();
    const filePath = `${this.getPath()}/${uuidv4()}.jpg`;

    this.setState(
      {
        uploadState: "uploading",
        uploadTask: this.state.storageRef.child(filePath).put(file, metadata),
      },
      () => {
        this.state.uploadTask.on(
          "state_changed",
          (snap) => {
            const percentUploaded = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            this.props.isProgressBarVisible(percentUploaded);
            this.setState({ percentUploaded });
          },
          (err) => {
            console.log(err);
            this.setState({
              errors: this.state.errors.concat(err),
              uploadState: "error",
              uploadTask: null,
            });
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then((downloadUrl) => {
                this.sendFileMessage(downloadUrl, ref, pathToUpload);
              })
              .catch((err) => {
                console.log(err);
                this.setState({
                  errors: this.state.errors.concat(err),
                  uploadState: "error",
                  uploadTask: null,
                });
              });
          }
        );
      }
    );
  };
  sendFileMessage = (fileUrl, ref, pathToUpload) => {
    ref
      .child(pathToUpload)
      .push()
      .set(this.createMessage(fileUrl))
      .then(() => {
        this.setState({ uploadState: "done" });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errors: this.state.errors.concat(err),
        });
      });
  };
  render() {
    const {
      modal,
      errors,
      message,
      loading,
      percentUploaded,
      uploadState,
    } = this.state;
    return (
      <Segment className="message__form">
        <Form onSubmit={this.sendMessage}>
          <Input
            fluid
            value={message}
            name="message"
            onChange={this.handleChange}
            style={{ marginBottom: "0.7em" }}
            label={<Button icon={"add"} />}
            className={
              errors.some((error) => error.message.includes("message"))
                ? "error"
                : ""
            }
            labelPosition="left"
            placeholder="Write your messages"
          />

          <Button.Group icon widths="2">
            <Button
              type="submit"
              onClick={this.sendMessage}
              color="orange"
              disabled={loading}
              content="Add Reply"
              labelPosition="left"
              icon="edit"
            />
            <Button
              type="button"
              color="teal"
              disabled={uploadState === "uploading"}
              onClick={this.openModal}
              content="Upload Media"
              labelPosition="right"
              icon="cloud upload"
            />
          </Button.Group>
        </Form>

        <FileModal
          uploadFile={this.uploadFile}
          modal={modal}
          closeModal={this.closeModal}
        />
        <ProgressBar
          uploadState={uploadState}
          percentUploaded={percentUploaded}
        />
      </Segment>
    );
  }
}

export default MessageForm;
