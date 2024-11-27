import {cart, removeFromCart, calculateCartQauntity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products} from '../../data/products.js';
import { formatCurrency } from '../money.js'; 
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../../data/delivery.js';


const today = dayjs();
// .add(is a method, the first space is the total you want to add, the next space is length of time written as string)
const deliveryDate = today.add(7, 'days');

console.log(deliveryDate.format('dddd, MMMM D'));

// This is where the html is pushed for items in the cart array.

export function renderOrderSummary () {

  let cartSummaryHTML = '';

  // This code is about gathering productId and assigning it to the variable matchingId, so that the product can be modified when needed
  cart.forEach((cartItem) => {

    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
      if(product.id === productId){
        matchingProduct = product
      }
    })

    // console.log(matchingProduct);

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption; 

    deliveryOptions.forEach((option) => {
      if(option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(
      // id , the established number of days for that id.
      deliveryOption.deliveryDays,
      'days'
    ); 

    const dateString = deliveryDate.format('dddd, MMMM D');
    
    cartSummaryHTML += `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link js-update-link link-primary" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span> 
              
            <span class="delete-quantity-link js-delete-link link-primary" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          /* I have learned the hard way it is crucial for all paramters to be in position */
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
      const today = dayjs();
      const deliveryDate = today.add(
        // id , the established number for that id.
        deliveryOption.deliveryDays,
        'days'
      ); 

      const dateString = deliveryDate.format('dddd, MMMM D');

      // This code below is a ternary operator
      const priceString = deliveryOption.priceCents 
      === 0
      ? 'FREE' /* result if true */
            // Delagates the decimal math to formatCurrency.
      : `$${formatCurrency(deliveryOption.priceCents)} -`; /* result if false */

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
        /* incharge of displaying the blue button */
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
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
        removeFromCart(productId);
        console.log(cart);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);

        container.remove();
        updateCartQuantity();
      });
    });


  function updateCartQuantity() {
    // This is a separate operation that tracks the amount of items in the cart
    let cartQuantity = calculateCartQauntity();

    document.querySelector('.js-total-checkout')
    .innerHTML = `${cartQuantity} items`;
  }

  updateCartQuantity();


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

        console.log(productId, newQuantity)

        // Prevents the code from continuing to run unless the coditions are met
        if (newQuantity < 0 || newQuantity >= 1000) {
          alert('Quantity must be at least 0 and less than 1000');
          return;
        }

        // This sends a message to the cart.js file, and gives it to arguments. The function will scan the cart array. When it finds the matching product being reviewed it will update it with a newQuantity
        updateQuantity(productId, newQuantity);

        // This removes the styles, which inturn removes the save link element from the dom
        container.classList.remove('is-editing-quantity');

        // The next two line of code find the previous quantity of the product and update it with the new value
        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

        quantityLabel.innerHTML = newQuantity;

        updateCartQuantity(); /* by recalling this function is updates the top of the header in the html */

      });
  });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset
        updateDeliveryOption(productId, deliveryOptionId)

        // Recursion a function can re-run itself, takes updated data and regenerates the view
        renderOrderSummary();
      });
  });
}

 

/* MVC
Model - the code saves and manages the data
View - Takes the data and displays it on the page 
Controller - things like the event listener that allow you to interact with the page 

MVC is a design patern that makes sure the pages and the data are congruent*/
 