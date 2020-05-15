import React, {useState, useEffect, useRef, useContext} from 'react';
import Axios from 'axios';
import withBorder from "../hoc/withBorder";
import {AppContext} from '../../context/AppContext'

// const arr = useState(""); // arr -> [prop fn]
// const text = arr[0];
// const setText = arr[1];

const Search = (props) => {

    const appContext = useContext(AppContext);

    // this is like defining state inside the class but since there is no inherited function to setState, we have to declare it
    // and render is called whenever it is called
    // let searchCount = 0;
    const searchCount = useRef(0);
    const [text, setText] = useState("");
    const [results, setResult] = useState([]);
    // const [searchCount, setCount] = useState(0);
    useEffect(() => {
        //component did mount
        console.log("In the effect");
        searchRef.focus();

        //component did unmount
        return () => {
            console.log("in the effect cleanup");
        }
    }, []);
    
    useEffect(() => {
        //component did update
        console.log("In the effect for text change");
    }, [text]);

    useEffect(() => {
        //component did update
        console.log("In the effect for results change");
    }, [results]);

    let searchRef = null;

    const change = (e) => {
        setText(e.target.value);
    }

    async function search(){
        // setCount(searchCount+1);
        searchCount.current++;
        const url = "https://en.wikipedia.org/w/api.php";
        const params = {
            action: "opensearch",
            format: "json",
            limit: 20,
            search: text,
            origin: "*"
        }
        try {
            const resp = await Axios.get(url, {params: params});
            setResult(resp.data);

        } catch (error) {
            console.log("Error : ", error);
        }
        
    }

    function renderResults() {
        return results[1].map((item,index) => {
            return (
                <div key={index}>
                    <p>{item}</p>
                </div>
            )
        })
    }

    return (
        <div>
            <h3>Search</h3>
            <h4>
                <p>AppName: {appContext.appName}</p>
                <p>Author: {appContext.author}</p>
            </h4>
            <h5>Search Count : {searchCount.current}</h5>
            <div>
                <input type="search" value={text} onChange={change} ref={(r) => {searchRef = r}}/>
                &nbsp;
                <button onClick={search}>Search</button>
            </div>
            <div>
                {results.length ? renderResults() : null}
            </div>
        </div>
    )
}

export default withBorder(Search);