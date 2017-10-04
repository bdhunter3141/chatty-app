import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <div className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.name} placeholder="Type name and ENTER"></input>
        <input onKeyPress={this.props.handleSubmit} className="chatbar-message" placeholder="Type a message and hit ENTER"></input>
      </div>
    );
  }
}
export default ChatBar;
