import React, { Component } from 'react';
import {AppContext} from '../context/AppContext';
class Counter extends Component{

    state = {
        count : 5
    }

    inc(){
        // we can't directly use this.state.count++ as it is called with a different reference as a handler of an event 
        // not as a reference of Counter and it does not have a state variable. So, use bind or arrow function
        // even after binding, we should not mutate state directly (this.state.count++), 
        // we should use setState if we want to change the state for react to know
        // that the state is changed and react needs to re-render accordingly
        const updatedCount = this.state.count + 1;
        //async call
        this.setState({
            count : updatedCount
        }, () => {
            // console.log("This executed after update, count : ", this.state.count);
        })
        // console.log("This executed before update, count : ", this.state.count);
    }

    // using arrow function does not need state binding even for using as event handler
    // Arrow functions got introduced in ES6 but only after ES7, we could declare class functions to be arrow functions
    decr = () => {
        const updatedCount = this.state.count - 1;
        //async call
        this.setState({
            count : updatedCount
        }, () => {
            // console.log("This executed after update, count : ", this.state.count);
        })
        // console.log("This executed before update, count : ", this.state.count);
    }

    change = (evt) => {
        //evt.persist() is used to persist an event i.e. prevent event pooling for this event object
        //event object (evt) contains details about the event
        const value = evt.target.value;
        this.setState({
            count: value ? parseInt(value) : 0
        });
    }

    update = () => {
        const value = this.inputRef.value;
        this.setState({
            count: value ? parseInt(value) : 0
        });
    }

    constructor(props){
        super(props);
        //ES6 and before, this was a necessity to do state binding even for using as event handler
        this.inc = this.inc.bind(this);
    }

    render(){
        //return JSX
        return(
            <div>
                <h3>{this.props.title ? this.props.title : "Counter"}</h3>

                <h4>
                    <p>AppName: {this.context.appName}</p>
                    <p>Author: {this.context.author}</p>
                </h4>

                <p>Count : {this.state.count}</p>
                <div>
                    <button onClick={this.inc}>Increment</button>
                    &nbsp;
                    <button onClick={this.decr}>Decrement</button>
                </div>
                <div>
                    {/* If we want two way binding, we should handle the change event, otherwise the input will become read-only */}
                    {/* Controlled Input */}
                    Count: <input type="number" data-testid='cnt' value={this.state.count} onChange={this.change}/>
                </div>
                <div>
                    {/* ref is a custom property in react which contains a refernce to some DOM Element equivalent to Document.getElementById() */}
                    {/* Uncontrolled Input */}
                    Count: <input type="number" ref={(r) => {this.inputRef = r}}/>&nbsp;<button onClick={this.update}>Update</button> 
                </div>
            </div>
        )
    }
}

Counter.contextType=AppContext;
export default Counter;