import React, {Component} from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import {ipcRenderer} from 'electron';

function sendMessageToMain(event){
  event.preventDefault();
  ipcRenderer.send('store-key', event.target.service.value, event.target.username.value, event.target.password.value);
}

class StoreKey extends Component {
  componentDidMount(){
    ipcRenderer.on('store-key-reply', (event, storedSuccessfully) => {
      return storedSuccessfully // render success notification : render error notification
    })
  }

  componentWillUnmount(){
    ipcRenderer.removeAllListeners('store-key-reply')
  }

  render() {
    return(
      <div className='store-key-container'>
        <h1>Store your password</h1>
        <Form inline onSubmit={sendMessageToMain}>
          <FormGroup controlId="service">
            <ControlLabel>Service</ControlLabel>{' '}
            <FormControl type="text" placeholder="Gmail" />
          </FormGroup>{' '}
          <FormGroup controlId="username">
            <ControlLabel>Username</ControlLabel>{' '}
            <FormControl type="text" placeholder="joesmith@gmail.com" />
          </FormGroup>{' '}
          <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>{' '}
            <FormControl type="password" placeholder="..." />
          </FormGroup>{' '}
          <Button type="submit">Store Password</Button>
        </Form>
      </div>
   )
  }
}

export default StoreKey;
