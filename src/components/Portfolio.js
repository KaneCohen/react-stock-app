import { toMoney } from '../utils';
import React, { Component, PropTypes } from 'react';

class Portfolio extends Component {
  constructor() {
    super();
  }

  viewStock(symbol) {
    const { actions } = this.props;
    actions.findSymbol(symbol.toUpperCase());
  }

  renderBody() {
    const { portfolio } = this.props;

    const rows = portfolio.map(stock => {
      return (
        <tr key={stock.symbol}>
          <td>({stock.symbol}) {stock.name}</td>
          <td>{stock.quantity}</td>
          <td>{stock.askPrice}</td>
          <td><button className="btn btn-default" onClick={this.viewStock.bind(this, stock.symbol)}>View Stock</button></td>
        </tr>
      );
    });

    if (rows.length) {
      return rows;
    }

    return (
      <tr>
        <td className="text-center" colSpan="4">No Stocks</td>
      </tr>
    );
  }

  render() {
    const { cash } = this.props;

    return (
      <div className="portfolio">
        <div className="row">
          <div className="col-xs-6">
            <h5>Current Portfolio</h5>
          </div>
          <div className="col-xs-6 text-right">
            <h5>Cash: ${toMoney(cash)}</h5>
          </div>
        </div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Company</th>
              <th>Quantity</th>
              <th>Price Paid</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderBody()}
          </tbody>
        </table>
      </div>
    );
  }

}

Portfolio.propTypes = {
  actions: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  cash: PropTypes.number.isRequired,
  portfolio: PropTypes.array.isRequired
};

export default Portfolio;

