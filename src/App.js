import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import axios from 'axios'
import { LoginScreen } from './LoginScreen';


class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

      screen: "dashboard",

      first_name: "",
      last_name: "",
    }
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token')
    if (token) {
      axios.get('http://127.0.0.1:8000/weather/users/current', {headers: {Authorization: 'Token ' + token}})
      .then(response => {
        if (response.status == 200) {
          this.setState({first_name: response.data.first_name, last_name: response.data.last_name})
        } else if (response.status == 401) {
          console.log('401')
        }
      })
      .catch(error => {
        if (error.response.status == 401) {
          console.log("Need to go to login")
          this.setState({screen: "login"})
        }

      })
    }
  }

  render() {
    return (
      <>
        {this.state.screen == 'dashboard' &&
        <Navbar>
          <Container>
            <Navbar.Brand href="#home">Weather App</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="#login">{this.state.first_name + ' ' + this.state.last_name}</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        }
        {this.state.screen == 'login' &&
          <LoginScreen />
        }
      </>
    );
  }
}

export default App;
