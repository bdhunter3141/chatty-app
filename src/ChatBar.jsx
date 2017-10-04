import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <div className="chatbar">
        <input onKeyUp={this.props.handleName} className="chatbar-username" defaultValue={this.props.name} placeholder="Type name and ENTER"></input>
        <input onKeyUp={this.props.handleSubmit} className="chatbar-message" placeholder="Type a message and hit ENTER"></input>
      </div>
    );
  }
}
export default ChatBar;
