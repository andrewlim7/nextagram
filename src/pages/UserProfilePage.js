import React from 'react';
import UserImages from '../containers/UserImages.js';
import Image from "react-graceful-image";

class UserProfilePage extends React.Component {
    
    render(){
        const {id} = this.props.match.params
        const currentUser = this.props.users.find(user => 
            user.id == id 
            )

        return (
            <div className="container">
                <div className="row m-0">
                    <div className="profile-image">
                        <Image src={currentUser ? currentUser.profileImage : ""} alt="profile_image" width="200" height="200" className="rounded-circle"/>
                      </div>                    
                      <div className="profile-user-settings">
                        <h1 className="profile-user-name">
                            {currentUser ? currentUser.username : "Loading..."}
                        </h1>
                      </div>
                </div>
                <div className="row m-0">
                    <UserImages user_id={currentUser && currentUser.id} />
                </div>
            </div>

            
        )
    }
}

export default UserProfilePage
