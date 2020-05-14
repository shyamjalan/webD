import React, {Component} from 'react';


class CustomerDetails extends Component {

    constructor(props){
        super(props);
        // console.log(props);
    }

    back = () => {
        this.props.history.goBack();
    }

     render(){
         return (
             <div>
                 <h3>Customer Details : {this.props.match.params.id}</h3>
                 <div>
                     <button onClick={this.back}>Back</button>
                 </div>
             </div>
         );
     }

}

export default CustomerDetails;