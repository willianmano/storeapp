import { internet } from 'faker';
import { addProduct, removeProduct } from '../index';

describe('addProduct', () => {
    it('has the correct type', () => {
        const action = addProduct();

        expect(action.type == 'PRODUCT_ADDED');
    });

    it('has the correct payload', () => {
        const product = {
            'img': 'http://imageurl.com',
            'name': 'product name',
            'price': 20
        };

        const action = addProduct(product);

        expect(action.payload.product).toEqual(product);
    });
});

describe('removeProduct', () => {
    it('has the correct type', () => {
        const action = removeProduct();

        expect(action.type == 'PRODUCT_REMOVED');
    });
});