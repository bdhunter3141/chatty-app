import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {

   constructor(props) {
    super(props);
    this.state ={
      connectionCount: 0,
      currentUser: {name: 'Anonymous', userFontColor: '#F08080'}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [] // messages coming from the server will be stored here as they arrive
    };

  }

  handleName = (e) => {
    const oldUser = this.state.currentUser.name;
    if (e.key === 'Enter') {
      let newUser = Object.assign({}, this.state.currentUser);
      newUser.name = e.target.value;
      let notification = {type: 'postNotification', content: `${oldUser} has changed their name to ${newUser.name}.`}
      this.webSock.send(JSON.stringify(notification));
      this.setState({currentUser: newUser});
    }
  }

  handleSubmit = (e) => {
    if (e.key === 'Enter') {
      let typedInput = e.target.value;
      e.target.value = "";
      let newMessage = {type: 'postMessage', userColor: this.state.currentUser.userFontColor, username: this.state.currentUser.name, content: typedInput};
      this.webSock.send(JSON.stringify(newMessage));
      }
    }


  componentDidMount() {

    console.log("componentDidMount <App />");
    this.webSock = new WebSocket("ws://localhost:3001");
    this.webSock.onopen = (event) => {
      setTimeout(() => {
      }, 1000);
      console.log('Connected to server');
    };

    this.webSock.onmessage = (event) => {
      // code to handle incoming message
      let newMessage = JSON.parse(event.data);

      switch (newMessage.type) {

        case 'initialConnection':

          const userColor = ['#F08080', '#2E8B57', '#4682B4', '#B22222'];
          let userFontColor;
          if (newMessage.connection <= 4) {
            userFontColor = userColor[newMessage.connection -1]
          } else {
            userFontColor = userColor[Math.floor(Math.random() * 4)];
          }

          let currentUserObject = Object.assign({}, this.state.currentUser);
          currentUserObject.userFontColor = userFontColor;
          this.setState({currentUser: currentUserObject});
          break;

        case 'connectionUpdate':
          this.setState({connectionCount: newMessage.connection});
          console.log("Number of connections: ", newMessage.connection);
          break;

        default:
          console.log("new")
          let messages = this.state.messages.concat(newMessage);
          this.setState({messages: messages});
          break;

      }
    }
  }

  componentDidUpdate() {
    window.scrollTo(0, document.querySelector(".messages").scrollHeight);
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <NavBar connectionsCount={this.state.connectionCount} />
        <main>
          <MessageList messages={this.state.messages} />
        </main>
        <footer>
          <ChatBar handleSubmit={this.handleSubmit} handleName={this.handleName} name={this.state.currentUser.name} />
        </footer>


      </div>

    );
  }

}
export default App;
