import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axiosProducts from '../../axios-products';

// import classes from './AdminProduct.module.scss';
import ProductList from '../../components/Admin/Products/ProductList';
import MutateProduct from '../../components/Admin/MutateProduct/MutateProduct';

class AdminProduct extends Component {
    state = {
        products: [],
        loading: false
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

    onAddProductHandler = (data) => {
        // Depending on 'add' or 'edit' mode, choose an action

        if(data.mode === 'add') {
            this.setState({
                loading: true
            });

            axiosProducts.post('', data.formData).then(response => {
                this.setState(prevState => {
                    let copiedProducts = [...prevState.products];

                    copiedProducts = copiedProducts.concat(response.data.product);

                    return {
                        loading: false,
                        products: copiedProducts
                    }
                });
                this.props.history.push(this.props.match.url + "/products");

            }).catch(error => {
                console.log(error);
            });
        }
        else if(data.mode === 'edit') {
            this.setState({
                loading: true
            });

            axiosProducts.put('/' + data.id, data.formData).then(response => {
                this.setState(prevState => {
                    let copiedProducts = [...prevState.products];

                    copiedProducts = copiedProducts.map(p => p._id !== response.data.updatedProduct._id ? p : response.data.updatedProduct);

                    return {
                        products: copiedProducts,
                        loading: false
                    }
                });
                this.props.history.push(this.props.match.url + "/products");
            }).catch(error => {
                console.log(error);
                this.setState({
                    loading: false
                });
            })
        }
    }

    onEditProduct = async (id) => {
        // Route to add-product page with edit mode
        this.props.history.push(this.props.match.url + `/add-product?edit=true&id=${id}`);
    }

    onDeleteProduct = (id) => {
        axiosProducts.delete('/' + id).then(response => {
            this.setState((prevState) => {
                let newProductList = [...prevState.products].filter(p => p._id !== id);

                return {
                    products: newProductList
                }
            })
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <Switch>
                <Route path={this.props.match.url + "/products"} render={() => <ProductList list={this.state.products} editProduct={this.onEditProduct} deleteProduct={this.onDeleteProduct} />} />
                <Route path={this.props.match.url + "/add-product"} render={() => <MutateProduct {...this.props} addProduct={this.onAddProductHandler} editProduct={this.onAddProductHandler} loading={this.state.loading} productList={this.state.products} />} />
            </Switch>
        )
    }
}

export default AdminProduct;