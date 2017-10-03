import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

   constructor(props) {
    super(props);
    this.state ={
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            id: 1,
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            id: 2,
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ]
    };

  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {

    const _captureInput = (e) => {
      let typedInput = e.target.value;
      console.log(typedInput);
    }

    const _handleSubmit = (e) => {
      if (e.key === 'Enter') {
        console.log("enter!!")
        let typedInput = e.target.value;
        e.target.value = "";
        const newMessage = {id: this.state.messages.length + 1, username: this.state.currentUser.name, content: typedInput};
        const messages = this.state.messages.concat(newMessage);
        this.setState({messages: messages});
      }
    }

    console.log("Rendering <App/>");
    return (
      <div>
        <main>
          <MessageList messages={this.state.messages} />
        </main>
        <footer>
          <ChatBar captureInput={_captureInput} handleSubmit={_handleSubmit} name={this.state.currentUser.name} />
        </footer>


      </div>

    );

  }
}
export default App;
