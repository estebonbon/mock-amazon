import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/ordersummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';

import { loadCart } from '../data/cart.js';

// import '../data/backend-practise.js'
// import '../data/car.js';
// import '../data/cart-class.js';

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('mystery'); 
    });
  }),

]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
})




// loadProducts(() => {
//   loadCart(() => {
    // renderOrderSummary();
    // renderPaymentSummary();
    // renderCheckoutHeader();
//   });
// });

// Promises help to keep the code flat
