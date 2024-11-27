import { calculateCartQauntity, cart } from '../../data/cart.js'
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../money.js';

export function renderPaymentSummary () {

  // The totall combined cost of all the products
  let productPriceCents = 0;

  // The combined shipping cost
  let shippingPriceCents = 0;


  cart.forEach((cartItem) => {
    // This function retrieves the information needed to find a product
    // Product is now the equvialent of the cartItem.productId found from the products array.

    const product = getProduct(cartItem.productId); 

    // Reads products[array].priceCents * cart[array].quantity
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOtpion = getDeliveryOption(cartItem.deliveryOptionId)

    shippingPriceCents += deliveryOtpion.priceCents;
  })

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;

  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  // console.log(productPriceCents, shippingPriceCents);
  // console.log(totalBeforeTaxCents);
  // console.log(taxCents);
  // console.log(totalCents);

  const cartQuantity = calculateCartQauntity();

  const paymentSummaryHTML =
  `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (${cartQuantity}):</div>
    <div class="payment-summary-money">
    $${formatCurrency(productPriceCents)}
    </div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money
    js-payment-summary-shipping">
    $${formatCurrency(shippingPriceCents)}
    </div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">
    $${formatCurrency(totalBeforeTaxCents)}
    </div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">
    $${formatCurrency(taxCents)}
    </div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money
    js-payment-summary-total">
     $${formatCurrency(totalCents)}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
}

