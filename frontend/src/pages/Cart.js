import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { removeProduct } from '../actions';
import Shipping from '../components/Shipping';
import Client from '../components/Client';

class Cart extends React.Component {
    state = { totalProducts: 0, shippingPrice: 25, requestError: null };

    componentDidMount() {
        this.calculateTotalproducts();
    }

    removeProduct = async (product) => {
        await this.props.removeProduct(product);

        this.calculateTotalproducts();
    }

    calculateTotalproducts = () => {
        let total = this.props.products.reduce(
            (sum, product) => sum + parseInt(product.price), 0
        );

        this.setState({ totalProducts: total });
    }

    shippingChanged = price => {
        this.setState({ shippingPrice: price });
    }

    onClientFormSubmit = async (user) => {
        const order = {
            products: this.props.products,
            shipping: this.state.shippingPrice,
            user: user
        };

        const response = await axios.post('http://localhost:8080/checkout', order);

        if (response.data === 'error') {
            this.setState({ requestError: true });
        } else {
            this.addOrderToLocalStorage(order, response.data);

            window.location.replace(`/fim/${response.data.transaction}/${response.data.shipping}`);
        }
    }

    addOrderToLocalStorage = (order, extra) => {
        let totalOrder = order.products.reduce(
            (sum, product) => sum + parseInt(product.price), 0
        );

        const orderData = {
            id: extra.transaction,
            client: order.user.name,
            total: totalOrder,
            shipping: order.shipping
        };

        let storageOrders = JSON.parse(localStorage.getItem('storeapp/orders'));
        let newStorageOrders = null;

        if (storageOrders) {
            newStorageOrders = [...storageOrders, orderData];
        } else {
            newStorageOrders = [orderData];
        }

        localStorage.setItem('storeapp/orders', JSON.stringify(newStorageOrders));
    }

    renderRequestErrorMessage = () => {
        if (this.state.requestError) {
            return(
                <div className="ui icon message error">
                    <div className="content">
                        <p>Compra recusada. Verifique seus dados, digite um CPF vélido e dados do cartão.</p>
                    </div>
                </div>
            );
        }
    }

    render() {
        const products = this.props.products.map((product) => {
            return (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td className="right aligned collapsing">R$ {product.price}</td>
                    <td className="center aligned collapsing"><button onClick={() => {this.removeProduct(product)}} className="ui compact icon button basic red"><i className="icon trash"></i></button></td>
                </tr>
            );
        });

        if (this.state.totalProducts === 0) {
            return (
                <div className="ui icon message info">
                    <i className="cart icon"></i>
                    <div className="content">
                        <div className="header">Seu carrinho está vazio!</div>
                        <p>Aproveite nossas ofertas na página de produtos.</p>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="ui grid">
                    <div className="ten wide column">
                        <table className="ui celled striped table">
                            <thead>
                                <tr>
                                    <th colSpan="3">Itens do carrinho</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products}
                                <tr>
                                    <td className="right aligned"><strong>TOTAL</strong></td>
                                    <td colSpan="2" className="collapsing">R$ {this.state.totalProducts}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <Shipping onChangeShipping={this.shippingChanged} />

                        { this.renderRequestErrorMessage() }

                        <Client onSubmit={this.onClientFormSubmit} />

                        { this.renderRequestErrorMessage() }
                    </div>

                    <div className="six wide column">
                        <div className="ui card">
                            <div className="content">
                                <div className="header">Resumo do pedido</div>
                            </div>
                            <div className="content">
                            <table className="ui celled striped table">
                            <tbody>
                                <tr>
                                    <td>Total do pedido</td>
                                    <td className="right aligned collapsing">R$ {this.state.totalProducts}</td>
                                </tr>
                                <tr>
                                    <td>Frete</td>
                                    <td className="right aligned collapsing">R$ {this.state.shippingPrice}</td>
                                </tr>
                                <tr>
                                    <td className="right aligned"><strong>TOTAL</strong></td>
                                    <td className="right aligned collapsing"><strong>R$ {this.state.totalProducts + this.state.shippingPrice}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return { products: state.products };
}

export default connect(mapStateToProps, { removeProduct: removeProduct })(Cart);