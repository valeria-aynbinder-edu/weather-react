import React from 'react';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import axios from 'axios';

export class LoginScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        // window.localStorage.setItem("username", this.state.username)
        // window.localStorage.setItem("password", this.state.password)
        axios.post('http://127.0.0.1:8000/auth_app/api-token-auth/', {
            username: this.state.username,
            password: this.state.password
        })
        .then(result => {
            window.localStorage.setItem("token", result.data.token)
            console.log(result)
        })
        .catch(error => window.alert(error))
        event.preventDefault()
    }

    render() {
        return(
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" 
                value={this.state.username}
                onChange={(event) => this.setState({username: event.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                value={this.state.password}
                onChange={(event) => this.setState({password: event.target.value})}/>
            </Form.Group>
            <Button variant="primary" type="submit" onSubmit={this.handleSubmit}>
                Login
            </Button>
        </Form>
        )
    }
}