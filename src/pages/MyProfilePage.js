import React from 'react'
import axios from 'axios'
import Loader from '../components/Loader'

export default class MyProfilePage extends React.Component {
    
    state = {
        isLoading:true
    }

    componentDidMount(){
        const jwt = localStorage.jwt

        axios.get('https://insta.nextacademy.com/api/v1/images/me', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
          })
        .then(response => {
            const {checkAuthorize} = this.props
            console.log(response)
            this.setState({isLoading:false})
            // checkAuthorize(true)
        })
        .catch(error => {
            console.log(error.response)
            this.setState({isLoading:false})
        })
    }


    render(){
        const {isLoading} = this.state
        const {isAuthorize} = this.props
        const loaderDOM = <Loader width={200} height={200} />
        console.log(isLoading)
        return (
            <div>
                {isLoading ? loaderDOM : localStorage.jwt ? <h1>Welcome! Owner!</h1> : <h1>Welcome! Strangers!</h1>}
            </div>
        )
    }
}