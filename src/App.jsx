import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {

   constructor(props) {
    super(props);
    this.state ={
      connections: 0,
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [] // messages coming from the server will be stored here as they arrive
    };

  }

  handleName = (e) => {
    const oldUser = this.state.currentUser.name;
    if (e.key === 'Enter') {
      let newUser = {name: e.target.value};
      let notification = {type: 'postNotification', content: `${oldUser} has changed their name to ${newUser.name}.`}
      this.webSock.send(JSON.stringify(notification));
      this.setState({currentUser: newUser});
    }
  }

  handleSubmit = (e) => {
    if (e.key === 'Enter') {
      let typedInput = e.target.value;
      e.target.value = "";
      let newMessage = {type: 'postMessage', username: this.state.currentUser.name, content: typedInput};
      this.webSock.send(JSON.stringify(newMessage));
      }
    }


  componentDidMount() {
    console.log("componentDidMount <App />");
    this.webSock = new WebSocket("ws://localhost:3001");
    this.webSock.onopen = function (event) {
      console.log('Connected to server');
    };

    this.webSock.onmessage = (event) => {
      // code to handle incoming message
      let newMessage = JSON.parse(event.data);

      if (newMessage.type === 'connectionUpdate') {
        this.setState({connections: newMessage.connection});
        console.log("Number of connections: ", this.state.connections);
      }

      if (newMessage.type !== 'connectionUpdate') {
        let messages = this.state.messages.concat(newMessage);
        this.setState({messages: messages});
      }
    }

  }


  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <NavBar connections={this.state.connections} />
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
