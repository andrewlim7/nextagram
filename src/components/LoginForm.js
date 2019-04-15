import React from 'react';
import axios from 'axios';
import { FormText, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AlertNotification from './AlertNotification';

export default class LoginForm extends React.Component {
    
    state = {
        email : '',
        password : '',
        checkFormInput : true,
        isError : false,
        erroMsg : ""
    }

    handleClick = e => {
        e.preventDefault()
        this.props.changeForm()
    }

    handleClose = e => {
        e.preventDefault()
        const {toggleClose} = this.props
        toggleClose()
    }

    handleSubmit = e => {
        e.preventDefault()
        const {email, password} = this.state
        const {toggleClose, checkLoginStatus, handleNotification} = this.props

        if (email && password) {
            // console.log("Email : " + email + " password : " +password)
        }

        this.setState({checkFormInput:true,isError:false})

        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/login',
            data: {
              email: email,
              password: password
            }
          })
          .then(response => {
            // console.log(response.data)
            // console.log(response.data.auth_token)
            // console.log(response.data.user)
            const {auth_token} = response.data
            const {id} = response.data.user
            if(auth_token){
                localStorage.setItem('jwt', auth_token)
                localStorage.setItem('id', id)
            }

            toggleClose()
            checkLoginStatus(true) 
            handleNotification(true)
          })
          .catch(error => {
                // console.log(error.response)
                // console.log(error.response.data)
                const {message} = error.response.data
                this.setState({checkFormInput:false,isError:true,erroMsg:message})
            //   setTimeout(() => {
                // this.setState({ isError:false});
            //   }, 3000); //Ask liren, got memory leak when change to other pages.
          })
        
    }

    handleClose = e => {
        e.preventDefault()
        const {toggleClose} = this.props
        toggleClose()
    }
    
    handleInput = e => {
        const {email, password} = this.state
        this.setState({
            [e.target.name]: e.target.value
        })
        
        if(email && password){
            // console.log(`Email: ${email}, pw: ${password}`)
            this.setState({checkFormInput:false})
        } else {
            this.setState({checkFormInput:true})
        }
    }

    closeAlert = () => {
        this.setState({isError:false})
    }

  render() {
    const {checkFormInput, isError,erroMsg} = this.state

    return (
        <Form onSubmit={this.handleSubmit}>
            { isError &&
                <AlertNotification closeAlert={this.closeAlert}>
                    {erroMsg}
                </AlertNotification>
            }
            <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" onChange={this.handleInput}/>
            </FormGroup>
            <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" onChange={this.handleInput}/>
            </FormGroup>
            <FormText>
                New member? <a onClick={this.handleClick} href="/" className="no-under-link">Sign up here.</a>
            </FormText>
            <div className="submit-button-form">
                <Button disabled={checkFormInput} type="submit" color="primary">Login</Button>
                <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
            </div>
        </Form>
    )
  }
}