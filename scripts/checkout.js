import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/ordersummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';

import { loadCart } from '../data/cart.js';

// import '../data/backend-practise.js'
// import '../data/car.js';
// import '../data/cart-class.js';

async function loadPage() {

  try {

    await loadProductsFetch(); 
    /* replaces .then !waits!, only works in async function */

    // throw ('error')
  
    await new Promise((resolve, reject) => {
      loadCart(() => {
        // reject('error3')
        resolve(); /* Resolve makes things wait until done */
      });
    });  
  } catch (error) {
    console.log('unexpected error'); 
  }

  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();

}

loadPage()

// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve('mystery'); 
//     });
//   }),   

// ]).then((values) => {
//   console.log(values);
  // renderOrderSummary();
  // renderPaymentSummary();
  // renderCheckoutHeader();
// })

// loadProducts(() => {
//   loadCart(() => {
    // renderOrderSummary();
    // renderPaymentSummary();
    // renderCheckoutHeader();
//   });
// });

// Promises help to keep the code flat
