import React, {useState} from 'react'

import {useBehaviorSubject} from 'react-rxjs-tools'

export default ({subject})=>{
    const [hasError, setHasError] = useState(false);
    const [complete, setComplete] = useState(false);
    const onError = (err)=>{
        setHasError(true);
        console.log('FromBehaviorHook handled error:',err);
    };
    const onComplete = (err)=>{
        setComplete(true);
        console.log('FromBehaviorHook handled completion');
    };
    const [val,setVal] = useBehaviorSubject(subject,onError,onComplete);
    const onClick = ()=>setVal(val+1);
    return (
        <span>
            {val}
            {hasError?' Stream error ':null}
            {complete?' Stream completed ':null}
            <button onClick={onClick}>increment</button>
            <button onClick={()=>subject.error('Error sent in FromBehaviorHook')}>Generate error</button>
            <button onClick={()=>subject.complete()}>Complete</button>
        </span>
    );
}
