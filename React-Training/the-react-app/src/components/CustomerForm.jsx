import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class CustomerForm extends Component {

    state = {
        customer: {
            //default values should be provided if binding these values
            id: 0,
            name: "",
            location: ""
        }
    }

    constructor(props){
        super(props);
        console.log("[CustomerForm Constructor] : ",props);

        this.initState = {...this.state};

        if(this.props.data){
            this.state.customer = this.props.data;
        }
    }

    // static getDerivedStateFromProps(nextProps, currentState){
    //     if(nextProps.data.id !== currentState.customer.id){
    //         return {
    //             ...currentState,
    //             customer : nextProps.data
    //         }
    //     } else {
    //         return null;
    //     }
    // }    

    change = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        const updatedCustomer = {...this.state.customer};
        if(name === 'id'){
            updatedCustomer[name] = value ? parseInt(value): 0;
        }else{
            updatedCustomer[name] = value;
        }
        this.setState({
            customer: updatedCustomer
        });
    }

    save = () => {
        if(this.props.onSave){
            this.props.onSave(this.state.customer);
            this.setState(this.initState);
        } else if(this.props.onUpdate){
            this.props.onUpdate(this.state.customer);
        }
    }

    cancel = () => { 
        if(this.props.onCancel){
            this.props.onCancel();
        }
    }

    render(){
        return (
            <div>
                <fieldset>
                    <p>ID</p>
                    <div>
                        {this.props.data ? <input name="id" type="number" value={this.state.customer.id} onChange={this.change} disabled={true}/> : <input name="id" type="number" value={this.state.customer.id} onChange={this.change}/>}
                    </div>

                    <p>Name</p>
                    <div>
                        <input name="name" value={this.state.customer.name} onChange={this.change}/>
                    </div>

                    <p>Location</p>
                    <div>
                        <input name="location" value={this.state.customer.location} onChange={this.change}/>
                    </div>

                    <div>
                        <button onClick={this.save}>Save</button>&nbsp;<button onClick={this.cancel}>Cancel</button>
                    </div>
                </fieldset>
            </div>
        );
    }

}

export default withRouter(CustomerForm);