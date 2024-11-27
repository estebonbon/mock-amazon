import { renderOrderSummary } from "../../scripts/checkout/ordersummary.js";

import {  loadFromStorage, cart } from "../../data/cart.js";

describe('Test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = 
    `
    <div class="js-checkout-header"></div>
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
    `;

    // If a function effect elements that will be rendered onto the page including things like cart quantity, the <div> that holds all the html must be included in the test
    //     <div class="js-payment-summary"></div>

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1',
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });  
    loadFromStorage();

    renderOrderSummary();  
  }) /* runs function before each test, this is called a hook */

  it('displays cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-conatiner').length
    ).toEqual(2);

    expect(
     document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');

    expect(
     document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
  });

  it('removes a product', () => {
 
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll('.js-cart-item-conatiner').length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

  })
});