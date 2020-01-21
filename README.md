# react-rxjs-tools

> Tools to facilitate use of RxJS within React.js

[![NPM](https://img.shields.io/npm/v/react-rxjs-tools.svg)](https://www.npmjs.com/package/react-rxjs-tools)

## Install

```bash
npm install --save react-rxjs-tools
```

## Using the useSubject hook

**Advantages**:
- you can subscribe to multiple streams
- jsx is simpler

```jsx
import React from 'react'
import {useSubject} from 'react-rxjs-tools'

export default ({subject$})=>{
    const [val,setVal] = useSubject(subject$);
    return (
        <span>
            {val}
        </span>
    );
}
```

## Using the Subscription component
**Advantages**:
- you can use it from a class component
```jsx
import React from 'react'
import {Subscription} from 'react-rxjs-tools'

export default ({subject$})=>
    <Subscription subject={subject$}>
        {(data)=>
            <span>
                {data}
            </span>
        }
    </Subscription>
```

## Handling stream error
Both methods allow for handling stream errors. If a stream your component is subscribed to sends an error, your component **will throw an exception**, so (while it's optional) it's recommended that you always register an error handler, like so:

### useSubject hook
```jsx
const [val,setVal] = useSubject(subject$,errorCallback);
```

### Subscription component
```jsx
<Subscription subject={subject$} onError={errorCallback}>
  {...}
<Subscription/>
```
In both cases, errorCallback should be a function that takes a single argument for the stream error.

## Handling stream completion
When a stream completes, it's value cannot change anymore, so the UI can just ignore it. If you do want to respond to stream completion, you can send a completion handler, like so:

### useSubject hook
```jsx
const [val,setVal] = useSubject(subject$,errorCallback,completionCallback);
```
or if you omit the error handler:
```jsx
const [val,setVal] = useSubject(subject$,null,completionCallback);
```


### Subscription component
```jsx
<Subscription subject={subject$} onComplete={completionCallback}>
  {...}
<Subscription/>
```
In both cases, completionCallback should be a function that takes no arguments.

## License

MIT © [IndianaGeorge](https://github.com/IndianaGeorge)
