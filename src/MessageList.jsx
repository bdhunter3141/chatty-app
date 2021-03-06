import React, {Component} from 'react';
import Message from './Message.jsx';

// Render Message List

class MessageList extends Component {
  render() {
    return (
      <div className="messages">

      {this.props.messages.map((message) =>

        <Message userColor={message.userColor} type={message.type} key={message.id} username={message.username}
          content={message.content} />

        )}
      </div>
    );
  }
}
export default MessageList;
