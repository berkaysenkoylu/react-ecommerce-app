import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axiosProducts from '../../axios-products';

// import classes from './AdminProduct.module.scss';
import ProductList from '../../components/Admin/Products/ProductList';

class AdminProduct extends Component {
    state = {
        products: []
    };

    componentDidMount() {
        axiosProducts.get('').then(response => {
            this.setState({
                products: response.data.products
            });
        }).catch(error => {
            console.log(error);
        })
    }

    onEditProduct = (id) => {
        console.log(`Gonna edit product of id: ${id}`);
    }

    onDeleteProduct = (id) => {
        console.log(`Gonna delete product of id: ${id}`);
    }

    render() {
        return (
            <Switch>
                <Route path={this.props.match.url + "/products"} render={() => <ProductList list={this.state.products} editProduct={this.onEditProduct} deleteProduct={this.onDeleteProduct} />} />
                <Route path={this.props.match.url + "/add-product"} render={() => {}} />
            </Switch>
        )
    }
}

export default AdminProduct;