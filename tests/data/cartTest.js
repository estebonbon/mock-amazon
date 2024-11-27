import { addToCart, cart, loadFromStorage, removeFromCart } from "../../data/cart.js";


describe('Test suite: add to cart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('adds exisiting product to cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    }); 
    // console.log(localStorage.getItem('cart'));
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); 
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }]));
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2); 
  })

  it('adds a new product to cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    }); 
    // console.log(localStorage.getItem('cart'));
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); 
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1); 
  });
})

describe('Test suite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  })

  it('remove a product from the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }])
    });
    loadFromStorage(); /* loads the cart */

    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(0);
  })

  it('does not change anything if product not in the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }])
    });
    loadFromStorage(); /* loads the cart */

    removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart.length).toEqual(1);

    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart[0].quantity).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
    }]));
  });
});

// mocks only last for one test, 
// unit tests only test on piece of the code
// integration test test many pieces working together