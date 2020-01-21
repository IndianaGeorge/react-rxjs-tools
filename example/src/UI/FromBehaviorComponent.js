import React, {useState} from 'react'

import {BehaviorSubscription} from 'react-rxjs-tools'

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
        console.log('FromBehaviorComponent handled error:',err);
    };
    const onComplete = (err)=>{
        setComplete(true);
        console.log('FromBehaviorComponent handled completion');
    };
    return (
        <BehaviorSubscription subject={subject} onError={onError} onComplete={onComplete}>
            {(data)=>
                <span>
                    {data}
                    {hasError?' Stream error ':null}
                    {complete?' Stream completed ':null}
                    <button onClick={onClick}>increment</button>
                    <button onClick={()=>subject.error('Error sent in FromBehaviorComponent')}>Generate error</button>
                    <button onClick={()=>subject.complete()}>Complete</button>
                </span>
            }
        </BehaviorSubscription>
    );
}
