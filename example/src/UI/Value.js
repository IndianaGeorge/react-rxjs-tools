import React from 'react'

import {useSubject} from 'react-rxjs-tools'

export default ({subject})=>{
    const [val,setVal] = useSubject(subject);
    const onClick = ()=>setVal(val+1);
    return (
        <span onClick={onClick}>{val}</span>
    );
}
