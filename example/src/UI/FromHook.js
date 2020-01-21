import React, {useState} from 'react'

import {useSubject} from 'react-rxjs-tools'

export default ({subject})=>{
    const [hasError, setHasError] = useState(false);
    const [complete, setComplete] = useState(false);
    const onError = (err)=>{
        setHasError(true);
        console.log('Value handled error',err);
    };
    const onComplete = (err)=>{
        setComplete(true);
        console.log('Value handled completion',err);
    };
    const [val,setVal] = useSubject(subject,onError,onComplete);
    const onClick = ()=>setVal(val+1);
    return (
        <span>
            {val}
            {hasError?' Stream error ':null}
            {complete?' Stream completed ':null}
            <button onClick={onClick}>increment</button>
            <button onClick={()=>subject.error(5)}>Generate error</button>
            <button onClick={()=>subject.complete()}>Complete</button>
        </span>
    );
}
