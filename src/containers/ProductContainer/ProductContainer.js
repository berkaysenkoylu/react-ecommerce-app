import React, { Component } from 'react';

import axiosProducts from '../../axios-products';
import classes from './ProductContainer.module.scss';
import FilterPool from '../../components/FilterPool/FilterPool';
import Paginator from '../../components/Paginator/Paginator';
import ProductMini from '../../components/ProductMini/ProductMini';
import AppliedFilters from '../../components/AppliedFilters/AppliedFilters';
import Modal from '../../components/Modal/Modal';

class ProductContainer extends Component {
    state = {
        products: [],
        productPerPage: 3,
        pageCount: 0,
        currentPage: 0,
        productCount: 0,
        hasNextPage: false,
        hasPrevPage: false,
        showModal: false,
        selectedProduct: '',
        appliedFilters: [], // { type: 'checkbox', name: 'Category1' }, { type: 'slider', name: 'pricing', values=[] }
        filterToReset: { name: null, type: null }
    }

    componentDidMount() {
        axiosProducts.get(`/?page=${this.state.currentPage + 1}&perPage=${this.state.productPerPage}`).then(response => {
            this.setState({
                products: response.data.products,
                productCount: response.data.count,
                hasNextPage: response.data.hasNextPage,
                hasPrevPage: response.data.hasPrevPage
            });
        });

        this.timeout = null;
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.appliedFilters !== this.state.appliedFilters || prevState.productPerPage !== this.state.productPerPage || prevState.currentPage !== this.state.currentPage) {
            // Refetch the product data
            // Setup the query string
            let queryString = "";
            queryString = this.state.appliedFilters.map(f => {
                if(f.type === 'checkbox')
                    return 'Category=' + f.name;
                else 
                    return `Price=${f.values[0]}-${f.values[1]}`;
            }).join('&');

            if(queryString === '')
                queryString = queryString.concat(`page=${this.state.currentPage + 1}&perPage=${this.state.productPerPage}`);
            else
                queryString = queryString.concat(`&page=${this.state.currentPage + 1}&perPage=${this.state.productPerPage}`);

            axiosProducts.get(`?` + queryString).then(response => {
                this.setState({
                    products: response.data.products,
                    productCount: response.data.count,
                    hasNextPage: response.data.hasNextPage,
                    hasPrevPage: response.data.hasPrevPage
                });
            });
        }
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

    onFilterResetedHandler = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                filterToReset: { name: null, type: null }
            }
        });
    }

    onAllFiltersReseted = () => {
        // TODO
    }

    onAppliedFilterClosedHandler = (name, type) => {
        let resetFilter = {
            name, type
        }
        this.setState(prevState => {
            return {
                ...prevState,
                filterToReset: resetFilter
            };
        });
    }

    onSelectedFilters = (filterObject) => {
        switch(filterObject.type) {
            case "checkbox":
                filterObject.elements.forEach(ele => {
                    if(ele.selected) {
                        let filterObj = { type: 'checkbox', name: ele.name };

                        if(!this.checkFilterExist(filterObj)) {
                            this.setState(prevState => {
                                return {
                                    ...prevState,
                                    appliedFilters: prevState.appliedFilters.concat(filterObj)
                                };
                            });
                        }
                    }
                    else {
                        // Remove the filter from selected filter array if it exists in it
                        let filterObj = { type: 'checkbox', name: ele.name };
                        if(this.checkFilterExist(filterObj)) {
                            this.setState(prevState => {
                                return {
                                    ...prevState,
                                    appliedFilters: prevState.appliedFilters.filter(filter => filter.name !== ele.name)
                                };
                            });
                        }
                    }
                });
                break;
            case "slider":
                if(filterObject.elements.min !== filterObject.elements.currMin || filterObject.elements.max !== filterObject.elements.currMax) {
                    let filterObj = { type: 'slider', name: filterObject.name, values: [filterObject.elements.currMin, filterObject.elements.currMax] };

                    if(this.checkFilterExist(filterObj)) {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                appliedFilters: prevState.appliedFilters.map(filter => {
                                    if(filter.name !== filterObject.name) {
                                        return filter;
                                    }
                                    else {
                                        return {
                                            ...filter,
                                            values: [filterObject.elements.currMin, filterObject.elements.currMax]
                                        }
                                    }
                                })
                            };
                        });
                    }
                    else {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                appliedFilters: prevState.appliedFilters.concat(filterObj)
                            };
                        });
                    }
                }
                else {
                    // Check if exists in the arr, if so; remove it
                    let filterObj = { type: 'slider', name: filterObject.name };
                    if(this.checkFilterExist(filterObj)) {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                appliedFilters: prevState.appliedFilters.filter(filter => filter.name !== filterObj.name)
                            };
                        });
                    }
                }
                break;
            default:
                break;
        }
    }

    checkFilterExist = (filter) => {
        let f = this.state.appliedFilters.find(ft => ft.name === filter.name);

        return f;
    }

    onPaginationChangeHandler = (paginationObject) => {
        // { perPage: 5, currentPage: 0, pageCount: 1 }

        this.setState(prevState => {
            return {
                ...prevState,
                productPerPage: paginationObject.perPage,
                currentPage: paginationObject.currentPage,
                pageCount: paginationObject.pageCount
            }
        })
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
                        <FilterPool 
                            resetFilter={this.state.filterToReset}
                            selectedFilters={this.onSelectedFilters}
                            filterReseted={this.onFilterResetedHandler}
                            resetAllFilters={this.onAllFiltersReseted}
                        />
                    </div>
                    <div className={classes.Products}>
                        <AppliedFilters filters={this.state.appliedFilters} appliedFilterClosed={this.onAppliedFilterClosedHandler} />
                        <div className={classes.Products__Pool}>
                            {productContainer}
                        </div>
                        <div className={classes.Products__Pagination}>
                            <Paginator 
                                itemPerPage={[3, 5, 10]}
                                maxItemCount={this.state.productCount}
                                pagination={this.onPaginationChangeHandler}
                                hasNextPage={this.state.hasNextPage}
                                hasPrevPage={this.state.hasPrevPage}
                            />  
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ProductContainer;