import React, { Component } from 'react';
import './App.scss';
import './stylesheets/main.scss';
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import MyProfilePage from './pages/MyProfilePage';
// import NameForm from './components/NameForm';
// import FlexibleButton from './components/FlexibleButton';
import NavBar from './components/NavBar.js';
import { Route } from 'react-router-dom';
import axios from 'axios';


class App extends React.Component {
  state = {
    users:[],
    isLoading: true
  }

  refreshApp = () => {
    this.forceUpdate()
  }

  componentDidMount() {
    // performing a GET request to '/api-end-point'
    axios.get('https://insta.nextacademy.com/api/v1/users')
    .then(result => {
    // If successful, we do stuffs with 'result'
      this.setState({users:result.data,isLoading:false})
    })
    .catch(error => {
      // If unsuccessful, we notify users what went wrong
      console.log('ERROR: ', error)
    })
  }

  render(){
    const {users,isLoading} = this.state

    return (
      <div style={{backgroundColor:"#fafafa"}}>
      <NavBar refreshApp={this.refreshApp} />
      {/* <FlexibleButton><strong>Hello</strong>Hello!</FlexibleButton>
      <FlexibleButton text='Hmmm...' color='yellow' textSize={8}/>
      <FlexibleButton color='#0099ac' textSize={50}>Big and Bright</FlexibleButton> */}
      <Route exact path="/" component={props => <HomePage {...props} users={users} isLoading={isLoading} />}/>
      <Route path="/users/:id" component={props => <UserProfilePage {...props} users={users} />}/>
      <Route exact path="/profile" component={MyProfilePage}/>
      </div>
    )
  }
}

export default App;
