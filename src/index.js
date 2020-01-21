import { Component, useState, useEffect } from 'react'
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
  });
  const newSetState = state => subject.next(state);
  return [value, newSetState];
};

export class Subscription extends Component {
  static propTypes = {
    subject: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
    onError: PropTypes.func,
    onComplete: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = { value: props.subject.value};
    const subFn = { next: value => this.setState({value: value}) };
    if (props.onError) { subFn.error = err => props.onError(err); }
    if (props.onComplete) { subFn.complete = () => props.onComplete(); }
    this.subscription = props.subject.pipe(skip(1)).subscribe(subFn);
  }

  render() {
    return this.props.children(this.state.value);
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }
}
