import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    console.log("Rendering <NavBar/>");
    return (

      <nav className='navbar'>
        <a href="/" className="navbar-brand">Chatty</a>
        <p className='navbar-counter'>
          {this.props.connectionsCount} User(s) Online.
        </p>
      </nav>

    );
  }
}
export default NavBar;
