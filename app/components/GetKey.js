import React, {Component} from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import {ipcRenderer, clipboard} from 'electron';
import createNotification from './notification';
import CredentialsModal from './CredentialsModal';

class GetKey extends Component {
  constructor(){
    super();
    // if display modal has any credentials in it, we should display a modal with the credentials so the user can select which account he/she wants the pasword for
    this.state = {displayModalWithCreds: [], service: ''};
    this.handleResponse = this.handleResponse.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    ipcRenderer.on('get-password-reply', (event, credentials) => {
      // credentials will come back as an array of { account: 'foo', password: 'bar' } so we handle different cases depending on the length of the credentials array
      this.handleResponse(credentials);
    });
  }

  componentWillUnmount(){
    ipcRenderer.removeAllListeners('get-password-reply');
  }

  handleResponse(credentials){
    if (credentials.length === 0) {
      // if nothing comes back, give the user an error notif
      createNotification("error", 'We couldn\'t find a password for the service', "Error", 3000);
    }
    else if (credentials.length === 1) {
      // if one credential comes back, copy the password to the clipboard
      this.setState({service: ''});
      clipboard.write({text: credentials[0].password});
      createNotification('success', `Password for ${credentials[0].account} copied to clipboard!`, 'Success', 5000);
    }
    else {
      // display the modal so that a user can choose which account to select credentials from
      this.setState({displayModalWithCreds: credentials});
    }
  }

  handleChange(event){
    // handles form change
    this.setState({service: event.target.value});
  }

  handleSubmit(event){
    // handles form submission
    const { service } = this.state;
    event.preventDefault();
    ipcRenderer.send('get-password', service);
  }

  handleClick(event, account, password){
    event.preventDefault();
    // gets the password of the appropriate account and copies it to the users clipboard
    clipboard.write({text: password});
    createNotification('success', `Password for ${account} copied to clipboard!`, 'Success', 5000);
    // sets the credentials back to initial state
    this.setState({displayModalWithCreds: [], service: ''});
  }

  render() {
    const { service, displayModalWithCreds } = this.state;
    return (
      <div className="get-key-container">
        <h1>Get a password</h1>
        <Form inline onSubmit={this.handleSubmit}>

          <FormGroup controlId="service">
            <ControlLabel>Service</ControlLabel>{' '}
            <FormControl onChange={this.handleChange} type="text" placeholder="Gmail" value={service} />
          </FormGroup>{' '}

          <Button type="submit">Get Password</Button>
          <CredentialsModal displayModalWithCreds={displayModalWithCreds} handleClick={this.handleClick} />
        </Form>
      </div>
    );
  }
}

export default GetKey;
