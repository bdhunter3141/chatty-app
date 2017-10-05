import React, {Component} from 'react';


class Message extends Component {

  render() {
    console.log("Rendering <Message/>");
    let divStyle = {color: this.props.userColor};

    if (this.props.type === 'incomingMessage') {
      return (
        <div className="message">
          <span style={divStyle} className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
    }

    if (this.props.type === 'imageMessage') {

      function isImage(test) {
        return /(https?:\/\/.*\.(?:png|jpg))/i.test(test);
      }

      return (
        <div className="message">
          <span style={divStyle} className="message-username">{this.props.username}</span>
          {this.props.content.map((item, index) =>
                { return isImage(item) ?
                  <img src={item} />
                  :
                  <span className="message-content">{item}</span>
                }
              )}
        </div>

      );
    }

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
