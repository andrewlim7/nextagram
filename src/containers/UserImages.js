import React, { Component } from 'react';
import axios from 'axios';
import image_loader from '../images/image_loader.gif';
import Image from "react-graceful-image";

export default class UserImages extends React.Component {
    state = {
        isLoading:true,
        userImages:[]
    }

  componentDidMount() {
    const { user_id: userId} = this.props //destruct from parent with the name of heading(can change any name) and set it to custom name which is userId

    if (!userId) return
    
    // performing a GET request to '/api-end-point'
    axios.get('https://insta.nextacademy.com/api/v1/images?userId='+userId)
    .then(result => {
    // If successful, we do stuffs with 'result'
      this.setState({userImages:result.data,isLoading:false})
    })
    .catch(error => {
      // If unsuccessful, we notify users what went wrong
      console.log('ERROR: ', error)
    })
  }

  render(){
    const {userImages,isLoading} = this.state
    return (
        <div className="gallery">
            {
                userImages.map(image => 
                    <div key={image} className="gallery-item">
                        {
                            isLoading ? <Image src={image_loader} alt="image"/>
                            : <Image src={image} alt="image" className="gallery-image" retry={{ count: 10, delay: 2 }}/>
                        }
                    </div>
                )    
            }
        </div>
    )
  }
}