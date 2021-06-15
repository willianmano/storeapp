const addProduct = (product) => {
    return {
        type: 'PRODUCT_ADDED',
        payload: {
            product: product
        }
    };
};

const removeProduct = (product) => {
    return {
        type: 'PRODUCT_REMOVED',
        payload: {
            product: product
        }
    };
};

export {addProduct, removeProduct};