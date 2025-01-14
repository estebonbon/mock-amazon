import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductsFetch } from '../data/products.js';

import { loadCartFetch } from '../data/cart.js';

async function loadPage() {

  try {
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);
    // The promise must finish all of them, but at the sametime

  } catch (error) {
    console.log('unexpected error. Please Try again'); 
  }

  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();

}

loadPage()

