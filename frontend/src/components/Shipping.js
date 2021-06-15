import React from 'react';

class Shipping extends React.Component {
    state = { shippingPrice: 25 };

    onShippingChange = (event) => {
        this.setState({
            shippingPrice: parseInt(event.target.value)
        });

        this.props.onChangeShipping(parseInt(event.target.value));
    }

    render() {
        return(
            <div>
                <table className="ui celled striped table">
                    <thead>
                        <tr>
                            <th colSpan="3">Informações do frete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="radio" id="shipp1" name="shipping" value="25"
                                    checked={this.state.shippingPrice === 25}
                                    onChange={this.onShippingChange}  />
                                <label htmlFor="shipp1"> Transporadora A (5 dias úteis)</label>
                            </td>
                            <td className="right aligned collapsing">R$ 25,00</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="radio" id="shipp2" name="shipping" value="35"
                                    checked={this.state.shippingPrice === 35}
                                    onChange={this.onShippingChange} />
                                <label htmlFor="shipp2"> Transportadora B (3 dias úteis)</label>
                            </td>
                            <td className="right aligned collapsing">R$ 35,00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Shipping;