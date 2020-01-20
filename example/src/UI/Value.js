import React, {useState} from 'react'

import {useSubject} from 'react-rxjs-tools'

export default ({subject})=>{
    const [hasError, setHasError] = useState(false);
    const onError = (err)=>{
        //setHasError(true);
        console.log('Value handled error',err);
    };
    const onComplete = ()=>console.log('Value handled completion');
    const [val,setVal] = useSubject(subject,onError,onComplete);
    const onClick = ()=>setVal(val+1);
    return (
        <span>
            {val}
            {hasError?' An Error ocurred ':null}
            <button onClick={onClick}>increment</button>
            <button onClick={()=>subject.error(5)}>Generate error</button>
            <button onClick={()=>subject.complete()}>Complete</button>
        </span>
    );
}
