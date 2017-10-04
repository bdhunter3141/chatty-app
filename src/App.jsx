import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

   constructor(props) {
    super(props);
    this.state ={
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [] // messages coming from the server will be stored here as they arrive
    };

  }


  handleSubmit = (e) => {
    if (e.key === 'Enter') {
      let typedInput = e.target.value;
      e.target.value = "";
      let newMessage = {username: this.state.currentUser.name, content: typedInput};
      this.webSock.send(JSON.stringify(newMessage));
      }
    }


  componentDidMount() {
    console.log("componentDidMount <App />");
    this.webSock = new WebSocket("ws://localhost:3001");
    this.webSock.onopen = function (event) {
      console.log('Connected to server')
    };

    this.webSock.onmessage = (event) => {
      // code to handle incoming message
      let newMessage = JSON.parse(event.data);
      let messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    }

  }


  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <main>
          <MessageList messages={this.state.messages} />
        </main>
        <footer>
          <ChatBar handleSubmit={this.handleSubmit} name={this.state.currentUser.name} />
        </footer>


      </div>

    );
  }

}
export default App;
