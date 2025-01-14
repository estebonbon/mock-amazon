import {cart, removeFromCart, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import { formatCurrency } from '../money.js'; 
// import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
// import isSatSun from '../money.js'
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary () {

  let cartSummaryHTML = '';

  // This code is about gathering productId and assigning it to the variable matchingId, so that the product can be modified when needed
  cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    // console.log(matchingProduct);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);
    
    cartSummaryHTML += `
    <div class="cart-item-container 
    js-cart-item-conatiner 
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name js-product-name-${matchingProduct.id}">
            ${matchingProduct.name}
          </div>
          <div class="product-price js-product-price-${matchingProduct.id}">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link js-update-link link-primary" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span> 
              
            <span class="delete-quantity-link js-delete-link js-delete-link-${matchingProduct.id} 
            link-primary" 
            data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <!-- I have learned the hard way it is crucial for all paramters to be in position -->
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
    `;
  });

  // The purpose of thise html is to create a function the will display products and there relevant prices, cartItem is passed as a parameter
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = ''; /* we are naming the variable, and initializing to avoid undefined/ unintentional concatenation of undefined */
    // loops through the delivery options
    deliveryOptions.forEach((deliveryOption) => {
    

      const dateString = calculateDeliveryDate(deliveryOption);

      // This code below is a ternary operator
      const priceString = deliveryOption.priceCents 
      === 0
      ? 'FREE' /* result if true */
            // Delagates the decimal math to formatCurrency.
      : `$${formatCurrency(deliveryOption.priceCents)} -`; /* result if false */

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option 
        js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
        /* incharge of displaying the blue button */
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input
          js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
  `
    });
    return html;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;
    // cartSummaryHTML is the combined elements in the cart


    document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
       /*  console.log(productId) */
        removeFromCart(productId);
        
        // console.log(cart);
        // const container = document.querySelector(`.js-cart-item-container-${productId}`);
        // container.remove(); Code replaced by rendering the html again

        renderCheckoutHeader();
        renderPaymentSummary();
        renderOrderSummary(); 

      });
    });

    document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset
        updateDeliveryOption(productId, deliveryOptionId)

        // Recursion a function can re-run itself, takes updated data and regenerates the view
        renderOrderSummary();
        renderPaymentSummary();
      });
  });

  document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      // had to replace the matchingId aurgument with 'productId'
      // It was spelt js-cart-id instead of js-cart-item-container and this is why i wouldn't work

      container.classList.add('is-editing-quantity');

      // console.log(container);
    });
  });

  document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {

        // This line of code retrieves the productID via the dataset
        const productId = link.dataset.productId;

        // This line of code looks for the class at the top of the product element, and uses the productId used in the line above to find the right match
        const container = document.querySelector(`.js-cart-item-container-${productId}`);

        // This line of code wants to extract the exact input value for this productId that the user put in
        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

        // The line of code converts the variable into a number
        const newQuantity = Number(quantityInput
          .value);

     /*    console.log(productId, newQuantity) */

        // Prevents the code from continuing to run unless the coditions are met
        if (newQuantity < 0 || newQuantity >= 1000) {
          alert('Quantity must be at least 0 and less than 1000');
          return;
        }

        // This sends a message to the cart.js file, and gives it to arguments. The function will scan the cart array. When it finds the matching product being reviewed it will update it with a newQuantity
        updateQuantity(productId, newQuantity);

        // This removes the styles, which inturn removes the save link element from the dom
        container.classList.remove('is-editing-quantity');

        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();


        // // The next two line of code find the previous quantity of the product and update it with the new value
        // const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

        // quantityLabel.innerHTML = newQuantity;

        // updateCartQuantity(); /* by recalling this function is updates the top of the header in the html */
        // renderPaymentSummary();

      });
  });

}
 

/* MVC
Model - the code saves and manages the data
View - Takes the data and displays it on the page 
Controller - things like the event listener that allow you to interact with the page 

MVC is a design patern that makes sure the pages and the data are congruent*/
 
// const today = dayjs();
// // .add(is a method, the first space is the total you want to add, the next space is length of time written as string)
// const deliveryDate = today.subtract(1, 'month');

// console.log(deliveryDate.format('MMMM, D'));

// // This is where the html is pushed for items in the cart array.

// const newDate = today.add(5, 'day');
// console.log(newDate.format('dddd'));

// console.log(isSatSun(newDate));

