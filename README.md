# react-rxjs-tools

> Tools to facilitate use of RxJS within React.js

[See a working demo](https://indianageorge.github.io/react-rxjs-tools/)

[![NPM](https://img.shields.io/npm/v/react-rxjs-tools.svg)](https://www.npmjs.com/package/react-rxjs-tools)

## Install

```bash
npm install --save react-rxjs-tools
```

## What is this?
This is a collection of tools to help you use RxJS within React.
- useSubject: a hook to update your component when data arrives from a given Subject
- useBehaviorSubject: same as above but for BehaviorSubject only, using it's initial value.
- Subscription: a component that will update when data arrives from it's Subject
- BehaviorSubscription: same as above but for BehaviorSubject only, using it's initial value.

## Using the useBehaviorSubject hook

**Advantages**:
- starts with the BehaviorSubject's current value
- you can use behaviorSubject$.getValue() in your component's code at render time
- you can subscribe to multiple streams
- you get a function to update the stream
- jsx is simpler

```jsx
import React from 'react'
import {useBehaviorSubject} from 'react-rxjs-tools'

export default ({behaviorSubject$})=>{
    const [val,setVal] = useBehaviorSubject(behaviorSubject$);
    return (
        <span>
            {val}
        </span>
    );
}
```

## Using the BehaviorSubscription component
**Advantages**:
- starts with the BehaviorSubject's current value
- you can use behaviorSubject$.getValue() in your component's code at render time
- you can use it from a class component
```jsx
import React from 'react'
import {BehaviorSubscription} from 'react-rxjs-tools'

export default ({behaviorSubject$})=>
    <BehaviorSubscription subject={behaviorSubject$}>
        {(data)=>
            <span>
                {data}
            </span>
        }
    </BehaviorSubscription>
```

## Using the useSubject hook
**Advantages**
- you can set your own initial value until the next value arrives from the stream
- you can subscribe to multiple streams
- you get a function to update the stream
- jsx is simpler
```jsx
import React, {useState} from 'react'
import {useSubject} from 'react-rxjs-tools'

export default ({subject})=>{
    const [val,setVal] = useSubject("waiting for data",subject);
    return (
        <span>
            {val}
        </span>
    );
}
```

## Using the Subscription component
**Advantages**
- you can set your own initial value until the next value arrives from the stream
- you can use it from a class component
```jsx
import React, {useState, useEffect} from 'react'
import {Subscription} from 'react-rxjs-tools'

export default ({subject})=>
        <Subscription initial="waiting for data" subject={subject}>
            {(data)=>
                <span>
                    {data}
                </span>
            }
        </Subscription>
```

## Handling stream error
All methods allow for handling stream errors. If a stream your component is subscribed to sends an error, your component **will throw an exception**, so (while it's optional) it's recommended that you always register an error handler, like so:

### useBehaviorSubject hook
```jsx
const [val,setVal] = useBehaviorSubject(subject$,errorCallback);
```

### BehaviorSubscription component
```jsx
<BehaviorSubscription subject={subject$} onError={errorCallback}>
  {...}
<BehaviorSubscription/>
```
In both cases, errorCallback should be a function that takes a single argument for the stream error.

## Handling stream completion
When a stream completes, it's value cannot change anymore, so the UI can just ignore it. If you do want to respond to stream completion, you can send a completion handler, like so:

### useBehaviorSubject hook
```jsx
const [val,setVal] = useBehaviorSubject(subject$,errorCallback,completionCallback);
```
or if you omit the error handler:
```jsx
const [val,setVal] = useBehaviorSubject(subject$,null,completionCallback);
```


### BehaviorSubscription component
```jsx
<BehaviorSubscription subject={subject$} onComplete={completionCallback}>
  {...}
<BehaviorSubscription/>
```
In both cases, completionCallback should be a function that takes no arguments.

## License

MIT © [IndianaGeorge](https://github.com/IndianaGeorge)
