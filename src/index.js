import { Component, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { skip } from 'rxjs/operators';

export const useSubject = subject => {
  const [value, setState] = useState(subject.getValue());
  useEffect(() => {
    const sub = subject.pipe(skip(1)).subscribe(s => {setState(s)});
    return () => sub.unsubscribe();
  });
  const newSetState = state => subject.next(state);
  return [value, newSetState];
};

export class Subscription extends Component {
  static propTypes = {
    subject: PropTypes.object.isRequired,
    render: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { value: props.subject.value};
    this.subscription = props.subject.pipe(skip(1)).subscribe(value => this.setState({value: value}));
  }

  render() {
    return this.props.render(this.state.value);
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }
}
