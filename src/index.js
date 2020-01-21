import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { skip } from 'rxjs/operators';

export const useSubject = (subject,onError,onComplete) => {
  const [value, setValue] = useState(subject.hasError?null:subject.getValue());
  useEffect(() => {
    const subFn = { next: data => setValue(data) };
    if (onError) { subFn.error = err => onError(err); }
    if (onComplete) { subFn.complete = () => onComplete(); }
    const sub = subject.pipe(skip(1)).subscribe(subFn);  
    return () => sub.unsubscribe();
  },[]);
  const newSetState = state => subject.next(state);
  return [value, newSetState];
};

export const Subscription = ({subject,children,onError,onComplete}) => {
  const [value, setValue] = useState(subject.hasError?null:subject.getValue());
  useEffect(() => {
    const subFn = { next: data => setValue(data) };
    if (onError) { subFn.error = err => onError(err); }
    if (onComplete) { subFn.complete = () => onComplete(); }
    const sub = subject.pipe(skip(1)).subscribe(subFn);  
    return () => sub.unsubscribe();
  },[]);
  return children(value);
}

Subscription.propTypes = {
  subject: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onComplete: PropTypes.func,
}