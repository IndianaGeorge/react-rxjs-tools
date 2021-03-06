import React, {useState, useEffect} from 'react'

import {Subscription} from 'react-rxjs-tools'

export default ({subject})=>{
    const [value, setValue] = useState(1);
    useEffect(() => {
        subject.subscribe({
            next: (data)=>setValue(data),
            error: ()=>{} //ignore stream errors
        });
    },[]);
    const onClick = ()=>{
        if (!subject.hasError) {
            subject.next(value+1);
        }
    }
    const [hasError, setHasError] = useState(false);
    const [complete, setComplete] = useState(false);
    const onError = (err)=>{
        setHasError(true);
        console.log('FromComponent handled error:',err);
    };
    const onComplete = (err)=>{
        setComplete(true);
        console.log('FromComponent handled completion');
    };
    return (
        <Subscription initial={1} subject={subject} onError={onError} onComplete={onComplete}>
            {(data)=>
                <span>
                    {data}
                    {hasError?' Stream error ':null}
                    {complete?' Stream completed ':null}
                    <button onClick={onClick}>increment</button>
                    <button onClick={()=>subject.error('Error sent in FromComponent')}>Generate error</button>
                    <button onClick={()=>subject.complete()}>Complete</button>
                </span>
            }
        </Subscription>
    );
}
