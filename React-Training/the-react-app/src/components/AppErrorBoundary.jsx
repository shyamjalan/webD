import React, {Component} from 'react';


class AppErrorBoundary extends Component {

    state = {
        error: null
    }

    componentDidCatch(error,info){
        if(error){
            this.setState({
                error: error
            });
        }
    }

    render(){
        if(this.state.error){
            return(
                <div>
                    <h3>Something went wrong!!! Please try later</h3>
                </div>
            )
        }
        else{
            return(
                <>{this.props.children}</>
            )
        }
    }
}

export default AppErrorBoundary;