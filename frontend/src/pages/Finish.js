import React from 'react';

class Finish extends React.Component {
    render() {
        return ( 
            <div>
                <div className="ui icon message success">
                    <i className="trophy icon"></i>
                    <div className="content">
                        <div className="header">Você concluiu sua compra!</div>
                        <p>Não precisa parar por aí, confira nossas ofertas na página de produtos!</p>
                    </div>
                </div>

                <div className="ui icon message info">
                    <i className="cart icon"></i>
                    <div className="content">
                        <div className="header">Código de rastreio</div>
                        <p>O código de rastreio da sua encomenda é: <strong>#{this.props.match.params.shipping}</strong></p>
                    </div>
                </div>

                <div className="ui icon message teal">
                    <i className="compress icon"></i>
                    <div className="content">
                        <div className="header">Código do pedido</div>
                        <p>O código do seu pedido é: <strong>#{this.props.match.params.transaction}</strong></p>
                    </div>
                </div>

            </div>
        );
    }
}

export default Finish;