import React from 'react';
import { connect } from 'react-redux';

import { addProduct } from '../actions';

class Product extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="ui image">
                    <img src={this.props.product.image} className="visible content" alt={this.props.product.name} />
                </div>
                <div className="content">
                    <p className="header">{this.props.product.name}</p>
                    <div className="meta">
                        <span className="date">R$ {this.props.product.price}</span>
                    </div>
                </div>
                <div className="extra content">
                    <button className="ui button primary" onClick={() => this.props.addProduct(this.props.product)}>
                        <i className="add icon"></i>
                            Adicionar ao carrinho
                    </button>
                </div>
            </div>
        );
    }
};

export default connect(null, { addProduct: addProduct })(Product);