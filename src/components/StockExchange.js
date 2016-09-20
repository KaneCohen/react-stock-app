import React, { Component, PropTypes } from 'react';
import Symbol from './Symbol';
import Portfolio from './Portfolio';

class StockExchange extends Component {
  constructor() {
    super();
  }

  handleSymbolSubmit(e) {
    const { actions } = this.props;
    const input = this.symbolInput.value;
    if (input && input.length) {
      actions.findSymbol(input.toUpperCase());
    }

    e.preventDefault();
  }

  componentDidMount() {
    const { actions } = this.props;
    setInterval(() => {
      const { symbol, fetchingSymbol } = this.props.state;
      if (symbol && ! fetchingSymbol) {
        actions.findSymbol(symbol.symbol);
      }
    }, 5000);
  }

  renderContent() {
    const { actions, dispatch } = this.props;
    const { symbol, cash, portfolio, stockAction } = this.props.state;

    return (
      <div className="row">
        <div className="col-md-4">
          <Symbol actions={actions} dispatch={dispatch} symbol={symbol} stockAction={stockAction} />
        </div>
        <div className="col-md-8">
          <Portfolio actions={actions} dispatch={dispatch} portfolio={portfolio} cash={cash} />
        </div>
      </div>
    );
  }

  render() {
    const { actions, symbol } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading clearfix">
                <span className="heading">Simple Stock Exchange</span>
                <form className="symbol-form form-inline pull-right" onSubmit={this.handleSymbolSubmit.bind(this)}>
                  <div className="form-group">
                    <input className="form-control" placeholder="Enter Symbol" ref={(ref) => this.symbolInput = ref} />
                  </div>
                  <button className="btn btn-default">Find</button>
                </form>
              </div>
              <div className="panel-body">
                { this.renderContent() }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

StockExchange.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

export default StockExchange;
