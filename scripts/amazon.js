  import { addToCart, calculateCartQauntity } from '../data/cart.js'
  // import{identicalVariable} from '../thefile'
  // all imports must be at the top of the folder
  // rename import {cart as myCart} from '../theFile'
  import { products } from '../data/products.js';

  import { formatCurrency } from './money.js';

  updateCartQuantity();
  
  let productsHTML = '';
  // products is on a separate .js file and is being used here to create dom Elements
  products.forEach((product) => {
    // Below is an accumlator pattern
    productsHTML += `
    <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name} 
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${formatCurrency(product.priceCents)}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        // Data attribute is put on each item
        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `
  })

  // console.log(productsHTML)

document.querySelector('.js-products-grid').innerHTML = productsHTML;

// function setCartQuantity() {
//      // This is a separate operation that tracks the amount of items in the cart
//      let cartQuantity = 0;
//      cart.forEach((item) => {
//        cartQuantity += item.quantity;
//      });

//     //  console.log(cartQuantity)
//      return cartQuantity;
// }

// console.log(setCartQuantity());
 function updateCartQuantity() {
  let cartQuantity = calculateCartQauntity();

     console.log(cartQuantity);
  //  console.log(cart);

   // Updates the integer in the cart Icon
   document.querySelector('.js-cart-quantity')
     .innerHTML = cartQuantity;


}


document.querySelectorAll('.js-add-to-cart') /* Targets the yellow btn's*/
  .forEach((button) => {
    button.addEventListener('click', () => {
      // console.log('added product');
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
      // setCartQuantity();

    });
  });