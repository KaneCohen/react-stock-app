import { connect } from 'react-redux';
import Actions from '../actions';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import StockExchange from '../components/StockExchange';

class App extends Component {
  componentDidMount() {
    const { actions } = this.props;

    if (typeof window !== 'undefined') {
      const state = window.localStorage.getItem('state');
      if (state) {
        actions.setState(JSON.parse(state));
      }
    }
  }

  render() {
    const { actions, dispatch, state } = this.props;

    return (<StockExchange actions={actions} dispatch={dispatch} state={state} />);
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
