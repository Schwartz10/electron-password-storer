import React from 'react';
import { Modal, ListGroup, ListGroupItem } from 'react-bootstrap';

const Credentials = props => {
  const { credentials, handleClick } = props;
  return (
    <div>
      <ListGroup>
        {credentials.map((credential, idx) => {
          const { account, password } = credential;
          return (
            <ListGroupItem
              key={idx}
              onClick={(event) => handleClick(event, account, password)}
              href={account}>{account}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
};

const CredentialsModal = props => {
  const shouldDisplay = props.displayModalWithCreds.length > 0;
  const credentials = props.displayModalWithCreds;
  const { handleClick } = props;
  return (
    <div className="static-modal">
      <Modal show={shouldDisplay}>
        <Modal.Header>
          <Modal.Title>Which Account?</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <h5>We found multiple accounts associated with that service</h5>
            <Credentials credentials={credentials} handleClick={handleClick} />
          </Modal.Body>
        <Modal.Footer>
          <h5>test</h5>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CredentialsModal;
