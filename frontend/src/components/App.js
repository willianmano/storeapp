import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Index from '../pages/Index';
import Cart from '../pages/Cart';
import Finish from '../pages/Finish';
import Reports from '../pages/Reports';

class App extends React.Component {
    render() {
        return (
            <div className="ui main container" style={{marginTop: '6em'}}>             
                <BrowserRouter>
                    <Header />
                    <Route path="/" exact component={Index} />
                    <Route path="/carrinho" component={Cart} />
                    <Route path="/fim/:transaction/:shipping" component={Finish} />
                    <Route path="/relatorios" component={Reports} />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;