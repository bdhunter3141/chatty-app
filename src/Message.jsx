import React, {Component} from 'react';

// Render Messages

class Message extends Component {

  render() {

    // Set color styling for usernames

    let divStyle = {color: this.props.userColor};


    // If message type is normal message

    if (this.props.type === 'incomingMessage') {
      return (
        <div className="message">
          <span style={divStyle} className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
    }


    // If message type includes an image

    if (this.props.type === 'imageMessage') {

      // Check which part of message is an image

      function isImage(test) {
        return /(https?:\/\/.*\.(?:png|jpg))/i.test(test);
      }

      return (
        <div className="message">
          <span style={divStyle} className="message-username">{this.props.username}</span>
          <div className='message-content'>{this.props.content.map((item, index) =>
                { return isImage(item) ? // If it's an image, display in image tags
                  <div>
                    <img className='message-image' src={item} />
                  </div>
                  :
                  <span>{item}</span> // If it is normal text, display normally
                }
              )}</div>
        </div>

      );
    }


    // If message is a notification then style accordingly

    if (this.props.type === 'incomingNotification') {
      return (
        <div className='message system'>
          {this.props.content}
        </div>
      );
    }
  }
}

export default Message;
