import React, { Component } from 'react';

import axiosProducts from '../../axios-products';
import classes from './ProductContainer.module.scss';
import FilterPool from '../../components/FilterPool/FilterPool';
import Paginator from '../../components/Paginator/Paginator';
import ProductMini from '../../components/ProductMini/ProductMini';
import Modal from '../../components/Modal/Modal';

class ProductContainer extends Component {
    state = {
        products: [],
        showModal: false,
        selectedProduct: ''
    }

    componentDidMount() {
        axiosProducts.get('').then(response => {
            this.setState({
                products: response.data.products
            });
        });

        this.timeout = null;
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    onModalOpenHandler = (id) => {
        let product = this.state.products.find(product => product._id === id);
        this.setState(prevState => {
            return {
                showModal: !prevState.showModal,
                selectedProduct: product
            }
        });
    }

    onModalClosedHandler = () => {
        this.timeout = setTimeout(() => {
            this.setState({
                showModal: false
            });
        }, 200);
        
    }

    onPaginationChangeHandler = (paginationObject) => {
        // console.log(paginationObject);
    }

    render() {
        let productContainer = this.state.products.map(product => {
            return <ProductMini 
                        key={product.name}
                        {...this.props}
                        {...product}
                        openModal={this.onModalOpenHandler}
                    />
        });

        return (
            <>
                <Modal 
                    show={this.state.showModal} 
                    // backdropClicked={this.onModalClosedHandler}
                    closed={this.onModalClosedHandler} 
                    product={this.state.selectedProduct} 
                />
                <div className={classes.ProductContainer}>
                    <div className={classes.ProductFilter}>
                        <FilterPool />
                    </div>
                    <div className={classes.Products}>
                        <div className={classes.Products__Pool}>
                            {productContainer}
                        </div>
                        <div className={classes.Products__Pagination}>
                            <Paginator itemPerPage={[3, 5, 10]} maxItemCount={10} pagination={this.onPaginationChangeHandler} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ProductContainer;