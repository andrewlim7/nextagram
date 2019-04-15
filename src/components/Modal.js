import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      isLoginForm: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  changeForm = () => {
    const {isLoginForm} = this.state
    this.setState({isLoginForm:!isLoginForm})
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  render() {
    const {isLoginForm} = this.state
    const {checkLoginStatus,handleNotification} = this.props
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>Login</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{isLoginForm ? "Login" : "Sign Up"}</ModalHeader>
          <ModalBody>
            {isLoginForm ? <LoginForm changeForm={this.changeForm} toggleClose={this.toggle} checkLoginStatus={checkLoginStatus} handleNotification={handleNotification}/> 
            : <RegisterForm changeForm={this.changeForm} toggleClose={this.toggle} checkLoginStatus={checkLoginStatus} handleNotification={handleNotification}/>}
          </ModalBody>
          {/* <ModalFooter>
              {isLoginForm ? <Button type="submit" color="primary" onClick={this.toggle}>Login</Button> : <Button type="submit" color="primary" onClick={this.toggle}>Sign Up</Button>}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}