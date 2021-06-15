import React from 'react';
import axios from 'axios';

import Product from '../components/Product';

class App extends React.Component {
    state = { products: [] };

    fetchProducts = async () => {
        const response = await axios.get('http://localhost:8080/');

        this.setState({ products: response.data });
    }

    componentDidMount() {
        this.fetchProducts();
    }

    render() {
        const productsRender = this.state.products.map((product) => {
            return <Product product={product} key={product.id} />;
        });

        return (
            <div className="ui cards four">
                {productsRender}
            </div>
        );
    }
}

export default App;