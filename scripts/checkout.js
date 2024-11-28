import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/ordersummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';

// import '../data/backend-practise.js'
// import '../data/car.js';
// import '../data/cart-class.js';

loadProducts(() => {
  renderCheckoutHeader();
  renderPaymentSummary();
  renderOrderSummary();     
})
