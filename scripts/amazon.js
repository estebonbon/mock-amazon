  import { addToCart, calculateCartQuantity } from '../data/cart.js'
  import { products, loadProducts } from '../data/products.js';

  loadProducts(renderProductsGrid);

  function renderProductsGrid () {

    updateCartQuantity();
  
    let productsHTML = '';
    
    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');
  
    let filteredProducts = products;
  
    // If a search exists in the URL parameters,
    // filter the products that match the search.
    if (search) {
      filteredProducts = products.filter((product) => {
        return product.name.includes(search);
      });
    }
  
    filteredProducts.forEach((product) => {
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
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
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

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <!-- Data attribute is put on each item -->
          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `
    })



  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  function updateCartQuantity() {
    let cartQuantity = calculateCartQuantity();

    // Updates the integer in the cart Icon
    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }


  document.querySelectorAll('.js-add-to-cart') /* Targets the yellow btn's*/
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const productQuantity = Number(quantitySelector.value);

          addToCart(productId, productQuantity);
          updateCartQuantity();
      });
    });



  const filterInput = document.querySelector('.js-search-bar');

  filterInput.addEventListener('input', function (event) {
    const textInput = event.target.value.toLowerCase(); /* This makes all the text lowercase */
    const products = document.querySelectorAll('.product-container');

    for (const product of products) {
      const productText = product.innerText.toLowerCase();

      if(!productText.includes(textInput)) {
        product.classList.add('hide');
      } else {
        product.classList.remove('hide');
      }
    }
  });
}

