import React, {useState} from 'react'

import {Subscription} from 'react-rxjs-tools'

export default ({subject})=>{
    const onClick = ()=>{
        if (!subject.hasError) {
            subject.next(subject.value+1);
        }
    }
    const [hasError, setHasError] = useState(false);
    const [complete, setComplete] = useState(false);
    const onError = (err)=>{
        setHasError(true);
        console.log('FromComponent handled error',err);
    };
    const onComplete = (err)=>{
        setComplete(true);
        console.log('FromComponent handled completion',err);
    };
    return (
        <Subscription subject={subject} onError={onError} onComplete={onComplete}>
            {(data)=>
                <span>
                    {data}
                    {hasError?' Stream error ':null}
                    {complete?' Stream completed ':null}
                    <button onClick={onClick}>increment</button>
                    <button onClick={()=>subject.error(5)}>Generate error</button>
                    <button onClick={()=>subject.complete()}>Complete</button>
                </span>
            }
        </Subscription>
    );
}
