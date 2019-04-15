import React from 'react';
import { UncontrolledAlert} from 'reactstrap';

export default class AlertNotification extends React.Component {
    constructor(props){
        super(props)
        this.timer = null
    }

    componentDidMount(){
        this.timer = setTimeout(this.props.closeAlert, 10000)
    }
    
    componentWillUnmount(){
        clearTimeout(this.timer)
    }

    render() {
        return (
            <UncontrolledAlert color="danger">
                   {this.props.children}
            </UncontrolledAlert>
        )
    }

}