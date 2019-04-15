import React, { Component } from 'react';
import UserImages from '../containers/UserImages';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom'

class HomePage extends React.Component {
  
  render(){
    const {users, isLoading} = this.props

    // const loaderDOM = (<img src={loader} className="loader mx-auto d-block"/>) //using stateless functional component
    const loaderDOM = (<Loader width={200} height={200} />) 

    return (
      <div className="container" style={{marginTop:"10px"}}>
        {isLoading ? loaderDOM : 
            <>
              {
                users.map(user =>
                <div key={user.id} style={{backgroundColor:"white"}} className="profile">
                  <div className="row m-0">
                      <div className="profile-image">
                        <img src={user.profileImage} alt="profile_image" width="200" height="200" className="rounded-circle"/>
                      </div>                    
                      <div className="profile-user-settings">
                        <h1 className="profile-user-name">
                            <Link to={"/users/"+user.id}>{user.username}</Link>
                        </h1>
                      </div>
                  </div>
                  <div className="row m-0">
                      <UserImages user_id={user.id}/>
                  </div>
                </div>
                )
              }
            </>
        }
      </div>
    )
  }
}

export default HomePage;