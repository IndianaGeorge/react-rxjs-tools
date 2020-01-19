import React from 'react'

import {Subscription} from 'react-rxjs-tools'

export default ({subject})=>{
    const onClick = ()=>subject.next(subject.value+1);
    return (
        <Subscription subject={subject}>
            {(data)=>
                <span onClick={onClick}>{data}</span>
            }
        </Subscription>
    );
}
