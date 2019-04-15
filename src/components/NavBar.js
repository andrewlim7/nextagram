import React from 'react';
import MainLogo from '../images/instagram.png';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import {
    UncontrolledAlert,
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem} from 'reactstrap';
  

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
        isOpen: false,
        // isLoggedIn: false,
        isNotify: false
        };
    }
    toggle() {
        this.setState({
        isOpen: !this.state.isOpen
        });
    }

    logOut = event => {
        event.preventDefault()
        localStorage.removeItem('jwt')
        localStorage.removeItem('id')
        // this.setState({isLoggedIn:false})
        this.props.refreshApp()
        console.log("removed")
    }

    checkUserLoginStatus = status => {
        console.log(status)
        this.setState({isLoggedIn:status})
    }

    handleNotification = status => {
        this.setState({ isNotify:status});
        setTimeout(() => {
            this.setState({ isNotify:false});
          }, 3000);
    }

    componentDidMount() {
        const getToken = localStorage.jwt
        if(getToken) this.setState({isLoggedIn:true})
        console.log(getToken)
    }
    
    render() {
        const {isLoggedIn,isNotify} = this.state

        return (
        <div>
            { isNotify ? 
                <UncontrolledAlert color="success">
                    Welcome!
                </UncontrolledAlert>
                : ""
            }
            <Navbar light expand="md" className="nav-bar">
            <NavbarBrand tag={Link} to="/" style={{fontFamily:'Lobster', fontSize:"25px"}}>
                <img src={MainLogo} width="25" height="25"/>
                <span style={{marginLeft:"5px", fontSize:"25px"}}>︱</span> Nextagram
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                { localStorage.jwt ? 
                <>
                <NavItem className="nav-bar-profile">
                    <Button className="no-under-link-white"><Link to={'/profile'}>My Profile</Link></Button>
                </NavItem>
                <NavItem>
                    <Button color="primary" onClick={this.logOut}>Logout</Button>
                </NavItem>
                </>
                :
                <Modal checkLoginStatus={this.checkUserLoginStatus} handleNotification={this.handleNotification}/>
                }
                </Nav>
            </Collapse>
            </Navbar>
        </div>
        );
    }
    }