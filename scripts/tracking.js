import { calculateCartQuantity } from "../data/cart.js";
import { getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadPage() {
  await loadProductsFetch();

  document.querySelector('.js-cart-quantity')
  .innerText = calculateCartQuantity();

  const url = new URL(window.location.href); // Current URL
  const orderId = url.searchParams.get('orderId'); // Extracts the orderId
  const productId = url.searchParams.get('productId'); // Extracts the productId

  console.log('Order ID from URL:', orderId);


  // console.log('Order ID:', orderId); // Should log: 2b79004a-9d8f-4493-86c5-ef174d9498eb
  // console.log('Product ID:', productId); // Should log: b0f17cc5-8b40-4ca5-9142-b61fe3d98c85

  const order = getOrder(orderId);
  const product = getProduct(productId);

  // Get additional details about the product like
  // the estimated delivery time.

  // console.log('Order products:', order.products);
  // console.log('Product ID:', product.id);
  let productDetails;
  console.log('Order:', order);
  console.log('Order products:', order ? order.products : 'Order is undefined or null');
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  console.log('Order:', order);
  console.log('Order products:', order ? order.products : 'Order is undefined or null');


  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

  const trackingHTML = 
  `
  <div class="order-tracking">
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
    </div>

    <div class="product-info">
        ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
     <div class="progress-label ${
        percentProgress < 50 ? 'current-status' : ''
      }">
         Preparing
      </div>
      <div class="progress-label ${
        (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
      }">
        Shipped
      </div>

      <div class="progress-label ${
        percentProgress >= 100 ? "current-status" : ''
      }">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

loadPage();