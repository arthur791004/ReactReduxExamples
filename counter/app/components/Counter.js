import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { increment, decrement } from '../actions';

class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value, onIncrement, onDecrement } = this.props;
    return (
      <div>
        <div>Counter: { value }</div>
        <RaisedButton label="+" onClick={ onIncrement } />
        <RaisedButton label="-" onClick={ onDecrement } />
      </div>
    );
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    value: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onIncrement: () => dispatch(increment()),
    onDecrement: () => dispatch(decrement()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
