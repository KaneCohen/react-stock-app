import React, { Component, PropTypes } from 'react';

class Symbol extends Component {
  constructor() {
    super();
    this.timer = null;
  }

  buyStock() {
    const { actions, symbol } = this.props;
    let quantity = this.quantityInput.value;
    if (! isNaN(quantity)) {
      quantity = Math.round(this.quantityInput.value);
      actions.buyStock(symbol.symbol, quantity);
      this.quantityInput.value = null;
    }
  }

  sellStock() {
    const { actions, symbol } = this.props;
    let quantity = this.quantityInput.value;
    if (! isNaN(quantity)) {
      quantity = Math.round(this.quantityInput.value);
      actions.sellStock(symbol.symbol, quantity);
      this.quantityInput.value = null;
    }
  }

  render() {
    const { symbol, stockAction, fetchingError } = this.props;

    if (fetchingError) {
      return (
        <div className="symbol text-center">
          <h4 className="text-danger">Symbol Not Found</h4>
        </div>
      );
    }

    if (symbol === null) {
      return (
        <div className="symbol text-center">
          <h4>No Symbol Selected</h4>
        </div>
      );
    }

    return (
      <div className="symbol">
        <h4>{symbol.name} ({symbol.symbol})</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Bid</th>
              <th>Ask</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{symbol.bidPrice ? symbol.bidPrice : '---'}</th>
              <th>{symbol.askPrice ? symbol.askPrice : '---'}</th>
            </tr>
          </tbody>
        </table>
        <div className="symbol-action-form form-inline">
          <input className="form-control" placeholder="Quantity" ref={(ref) => this.quantityInput = ref} />
          <button className="btn btn-primary" onClick={this.buyStock.bind(this)} disabled={stockAction ? 'disabled' : ''}>Buy</button>
          <button className="btn btn-danger" onClick={this.sellStock.bind(this)} disabled={stockAction ? 'disabled' : ''}>Sell</button>
        </div>
      </div>
    );
  }

}

Symbol.propTypes = {
  actions: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  stockAction: PropTypes.bool.isRequired,
  symbol: PropTypes.object
};

export default Symbol;

