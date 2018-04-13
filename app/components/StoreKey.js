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
    this.getValidationState = this.getValidationState.bind(this);
  }

  componentDidMount(){
    ipcRenderer.on('store-key-reply', (event, storedSuccessfully) => {
      // if the key was stored successfully, popup a success notification and clear the form fields
      if (storedSuccessfully) {
        createNotification('success', 'Password stored successfully!', 'Success', 3000);
        this.setState(initialState);
      }
      // if user didnt' enter in all credentials, throw a error notif
      else {
        createNotification("error", 'Make sure you entered valid credentials', "Error", 3000);
      }
    });
  }

  componentWillUnmount(){
    ipcRenderer.removeAllListeners('store-key-reply');
  }

  handleChange(event, type){
    // handles form change
    this.setState({[type]: event.target.value});
  }

  handleSubmit(event){
    // handles form submission
    const {service, username, password} = this.state;
    event.preventDefault();
    ipcRenderer.send('store-key', service, username, password);
  }

  getValidationState(field) {
    console.log(this.state[field].length);
    if (this.state[field].length === 0) return 'error';
    return null;
  }

  render() {
    const {service, username, password} = this.state;

    return (
      <div className="store-key-container">
        <h1>Store your password</h1>
        <Form inline onSubmit={this.handleSubmit}>

          <FormGroup validationState={this.getValidationState('service')}controlId="service">
            <ControlLabel>Service</ControlLabel>{' '}
            <FormControl onChange={(event) => this.handleChange(event, 'service')}type="text" placeholder="Gmail" value={service} />
          </FormGroup>{' '}

          <FormGroup validationState={this.getValidationState('username')}controlId="username">
            <ControlLabel>Username</ControlLabel>{' '}
            <FormControl onChange={(event) => this.handleChange(event, 'username')}type="text" placeholder="joesmith@gmail.com" value={username} />
          </FormGroup>{' '}

          <FormGroup validationState={this.getValidationState('password')}controlId="password">
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
