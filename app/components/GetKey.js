import React, {Component} from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import {ipcRenderer} from 'electron';

class GetKey extends Component {

  componentDidMount(){
    ipcRenderer.on('get-key-reply', (event, ...args) => {
    });
  }

  componentWillUnmount(){
    ipcRenderer.removeAllListeners('get-key-reply');
  }

  handleSubmit(event){
    // handles form submission
    const {service, username, password} = this.state;
    event.preventDefault();
    ipcRenderer.send('get-key', service, username, password);
  }

  render() {
    return (
      <div className="get-key-container">
        <h1>Get a password</h1>
        <Form inline onSubmit={this.handleSubmit}>

          <FormGroup controlId="service">
            <ControlLabel>Service</ControlLabel>{' '}
            <FormControl type="text" placeholder="Gmail" />
          </FormGroup>{' '}

          <Button type="submit">Get Password</Button>
        </Form>
      </div>
    );
  }
}

export default GetKey;
