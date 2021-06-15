import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    renderCartCounting = () => {
        if (this.props.products.length) {
            return <div className="floating ui bottom teal label" style={{top: '4px'}}>{this.props.products.length}</div>;
        }
    }
    render() {
        return(
            <div className="ui inverted main menu fixed">
                <div className="ui container">
                    <Link to="/" className="header item">
                        <img alt="Store APP logo" className="logo" src="https://semantic-ui.com/examples/assets/images/logo.png" />tore App
                    </Link>
                    <Link to="/" className="item">Nossos produtos</Link>
                    <Link to="/relatorios" className="item">Relatórios</Link>
                    <Link to="/carrinho" className="item right floated">
                        <i className="icon cart"></i> Seu carrinho
                        {this.renderCartCounting()}
                    </Link>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return { products: state.products };
}

export default connect(mapStateToProps)(Header);