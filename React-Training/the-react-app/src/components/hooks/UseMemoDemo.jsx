import React, { useState, useMemo } from 'react';



const UseMemoDemo = () => {

    
    const [count, setCount] = useState(0);
    const  [name, setName] = useState('Anil');

    const parseData = (data) => {

        console.log("parsing data");
        if(data){
            return "Hello " + data;
        }
        else{
            return "";
        }
    }

    const computedValue=useMemo(() => parseData(name),[name]);    

    return (
        <div>
            <h2>Use Memo Demo</h2>
            <h4>Count: {count}</h4>
            <div>
                <button onClick={() => setCount(count + 1)}>Increment</button>
            </div>
            <div>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <p>
                {/* {parseData(name)} */}
                {computedValue}
            </p>
        </div>
    );
}

export default UseMemoDemo;