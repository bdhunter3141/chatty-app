import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <div className="messages">
      {this.props.messages.map((message) =>

        <Message type={message.type} key={message.id} username={message.username}
          content={message.content} />
        )
        }
      </div>




    );
  }
}
export default MessageList;
