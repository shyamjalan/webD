import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/actionCreators'

class ReduxCounter extends Component{
    render(){
        return(
            <div>
                <h3>Redux Counter</h3>
                <h4>Count : {this.props.ctr}</h4>
                <div>
                    <button onClick={this.props.inc}>INCREMENT</button>&nbsp;
                    <button onClick={this.props.decr}>DECREMENT</button>&nbsp;
                    <button onClick={this.props.fetch}>Fetch Customers</button>
                </div>
                <div>
                    {this.props.customers.length === 0 ? <div>No Data</div> : (
                        this.props.customers.map(item => {
                            return (
                                <div key={item.id}>
                                    <p>{item.name}</p>  
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        )
    }
}

//var hoc = connect(mapStateToProps)
//var ConnectedComponent = hoc(ReduxCounter)
//export default ConnectedComponent

//Mapping the reduc state to the component Props
const mapStateToProps = (reduxState) => {
    return{
        ctr: reduxState.count,
        customers: reduxState.customers
    }
}

//Mapping the redux dispatch to the component Props
const mapDispatchToProps = (dispatch) => {
    return {
        inc: () => {dispatch(actionCreators.createINCAction())},
        decr: () => {dispatch(actionCreators.createDECRAction())},
        fetch: () => {dispatch(actionCreators.createFCAction())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ReduxCounter);