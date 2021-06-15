import React from 'react';

class Reports extends React.Component {
    getSales = () => {
        const orders = JSON.parse(localStorage.getItem('storeapp/orders'));

        if (!orders) {
            return '';
        }

        return(
            orders.map(order => {
                return (
                    <tr key={order.id}>
                        <td>{order.client}</td>
                        <td>R$ {order.total}</td>
                        <td>R$ {order.shipping}</td>
                    </tr>
                );
            })
        );
    }

    getCards = () => {
        const orders = JSON.parse(localStorage.getItem('storeapp/orders'));

        if (!orders) {
            return '';
        }

        let totalOrders = orders.reduce(
            (sum, order) => sum + parseInt(order.total), 0
        );

        let totalShipping = orders.reduce(
            (sum, order) => sum + parseInt(order.shipping), 0
        );

        return(
            <div className="ui equal width grid statistics">
                <div className="column">
                    <div className="statistic green ui segment" style={{width: '100%'}}>
                        <div className="value">{orders.length}</div>
                        <div className="label">Vendas</div>
                    </div>
                </div>
                <div className="column">
                    <div className="statistic teal ui segment" style={{width: '100%'}}>
                        <div className="value text">
                            <i className="money icon"></i> R$ {totalOrders}
                        </div>
                        <div className="label">Valor total</div>
                    </div>
                </div>
                <div className="column">
                    <div className="statistic violet ui segment" style={{width: '100%'}}>
                        <div className="value text">
                            <i className="plane icon"></i> R$ {totalShipping}
                        </div>
                        <div className="label">Valor dos fretes</div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.getCards()}
                <h1>Resumo das vendas</h1>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Nome do cliente</th>
                            <th>Total da compra</th>
                            <th>Frete</th>
                            </tr>
                        </thead>
                    <tbody>
                        {this.getSales()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Reports;