import React, {Component} from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import {ipcRenderer} from 'electron';
import createNotification from './notification';

const initialState = {
  service: '',
  username: '',
  password: ''
};

class StoreKey extends Component {
  constructor(){
    super();
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    ipcRenderer.on('store-key-reply', (event, storedSuccessfully) => {
      storedSuccessfully ?
        createNotification("success",'Password stored successfully!', 'Success', 3000) :
        createNotification("error", 'An unknown error occured', "Error", 3000);
    })
  }

  componentWillUnmount(){
    ipcRenderer.removeAllListeners('store-key-reply')
  }

  handleChange(event, type){
    this.setState({[type]: event.target.value});
  }

  handleSubmit(event){
    const {service, username, password} = this.state;
    event.preventDefault();
    this.setState(initialState);
    ipcRenderer.send('store-key', service, username, password);
  }

  render() {
    const {service, username, password} = this.state;

    return (
      <div className="store-key-container">
        <h1>Store your password</h1>
        <Form inline onSubmit={this.handleSubmit}>

          <FormGroup controlId="service">
            <ControlLabel>Service</ControlLabel>{' '}
            <FormControl onChange={(event) => this.handleChange(event, 'service')}type="text" placeholder="Gmail" value={service} />
          </FormGroup>{' '}

          <FormGroup controlId="username">
            <ControlLabel>Username</ControlLabel>{' '}
            <FormControl onChange={(event) => this.handleChange(event, 'username')}type="text" placeholder="joesmith@gmail.com" value={username} />
          </FormGroup>{' '}

          <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>{' '}
            <FormControl onChange={(event) => this.handleChange(event, 'password')}type="password" placeholder="..." value={password} />
          </FormGroup>{' '}

          <Button type="submit">Store Password</Button>
        </Form>
      </div>
    );
  }
}

export default StoreKey;
