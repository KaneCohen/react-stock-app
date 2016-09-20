import React, { Component, PropTypes } from 'react';

class Symbol extends Component {
  constructor() {
    super();
    this.timer = null;
  }

  buyStock() {
    const { actions, symbol } = this.props;
    const quantity = parseInt(this.quantityInput.value, 10);
    this.quantityInput.value = null;
    actions.buyStock(symbol.symbol, quantity);
  }

  sellStock() {
    const { actions, symbol } = this.props;
    const quantity = parseInt(this.quantityInput.value, 10);
    this.quantityInput.value = null;
    actions.sellStock(symbol.symbol, quantity);
  }

  render() {
    const { symbol } = this.props;

    if (symbol === null) {
      return (
        <div className="symbol text-center">
          <h4>No Symbol Selected</h4>
        </div>
      );
    }

    return (
      <div className="symbol">
        <h5>{symbol.name} ({symbol.symbol})</h5>
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
          <button className="btn btn-primary" onClick={this.buyStock.bind(this)}>Buy</button>
          <button className="btn btn-danger" onClick={this.sellStock.bind(this)}>Sell</button>
        </div>
      </div>
    );
  }

}

Symbol.propTypes = {
  actions: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  symbol: PropTypes.object
};

export default Symbol;

