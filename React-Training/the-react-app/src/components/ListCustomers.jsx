import React, {Component} from 'react';
import Axios from 'axios';
import './ListCustomers.css';
import CustomerForm from './CustomerForm';

class ListCustomers extends Component {

    state = {
        data: [],
        addMode: false,
        selectedCustomer: null
    }

    constructor(props){
        super(props);
        // this.url = "https://calm-beach-18228.herokuapp.com/customers";
        this.url = "http://localhost:9000/customers"
    }

    //loaded
    async componentDidMount(){
        //fetch does not need any library to be installed
        // try {
        //     const resp = await fetch(this.url);
        //     const data = await resp.json();
        //     console.log(data);
        // } catch (error) {
        //     console.log("Error : ", error);
        // }

        try {
            //get returns a promise
            const resp = await Axios.get(this.url);
            this.setState({
                data: resp.data
            })
            // console.log(resp);
        } catch (error) {
            console.log("Error : ", error);
        }
    }

    add = async (newCustomer) => {
        try {
            await Axios.post(this.url, newCustomer);
            alert("Saved...");
            const newData = [...this.state.data];
            newData.push(newCustomer);
            this.setState({
                data: newData
            });
        } catch (error) {
            console.log("Error in saving : ",error);
        }
        
    }

    hideModal = () => {
        this.setState({
            addMode: false
        })
    }

    delete = (evt, custId) => {
        //prevents navigation
        evt.preventDefault();
        // state is treated as immutable
        // So, a copy of state (data) is created
        const updatedData = [...this.state.data];
        const index = updatedData.findIndex(item => item.id === custId);
        updatedData.splice(index, 1);

        this.setState({
            data: updatedData
        });
    }

    edit = (evt, customer) => {
        evt.preventDefault();
        this.setState({
            addMode: false,
            selectedCustomer: customer
        })

    }

    addNew = (evt) => {
        evt.preventDefault();
        this.setState({
            addMode: true,
            selectedCustomer: null
        })
    }

    render(){
         return (
            <div>
                <h2>Customers</h2>
                <p>
                    <a href="#" onClick={this.addNew}>Add New</a>
                </p>
                <div>
                    {this.state.addMode ? <CustomerForm onSave={this.add} onCancel={this.hideModal}/> : null}
                </div>
                {/* For inline styling, we use camelCase like flexFlow for flex-flow */}
                <div style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'center'}}>
                    {this.state.data.map((item, index) => {
                        return (
                            //key is an inbuilt attribute for react which ensures that a new instance is created when the key changes 
                            <div className="customer" key={item.id}>
                                <p>ID : {item.id}</p>
                                <p>Name : {item.name}</p>
                                <p>Location : {item.location}</p>
                                <div>
                                    <button onClick={(e) => {this.edit(e, item);}}>Edit</button>
                                    <button onClick={(e) => {this.delete(e, item.id);}}>Delete</button>&nbsp;
                                    {/* <a href="#" onClick={(e) => {this.delete(e, item.id);}}>Delete</a> */}
                                </div>
                                <br/>
                            </div>
                        );
                    })}
                </div>
                <div>
                    {/* key ensures that a new instance is created when the key changes */}
                    {this.state.selectedCustomer ? <CustomerForm key={this.state.selectedCustomer.id} data={this.state.selectedCustomer}/> : null}
                </div>
             </div>
         );
     }

}

export default ListCustomers;