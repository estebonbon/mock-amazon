// I had to change const to let because, if it was a const variable it means it can never be changed or influenced by other functions

import { validDeliveryOption } from "./deliveryOptions.js";

export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));
  // If cart didn't equall anything why does it affect amazon.html it doesnt make sense. 
  // The file importing it will not be able to run properly, it will hault at an undefined variable

  if(!cart){
    cart = [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1',
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '2',
    }]; 
  }
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, productQuantity = 1) {
  let matchingItem;

  console.log('Product being added:', productId, 'Quantity:', productQuantity);
  console.log('Cart before update:', cart);


  // Tracks each item in the cart Array, no duplicates only the quantity can change.
  cart.forEach((cartItem) => { 
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem) {
    matchingItem.quantity += productQuantity || 0;
  } else {
    cart.push({
      productId: productId,
      quantity: productQuantity || 1,
      deliveryOptionId: '1'
    })
  }

  saveToStorage();
}

// This function avoids splice and figuring out what index each individual item has 
export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity() {
   // This is a separate operation that tracks the amount of items in the cart
   let cartQuantity = 0;
   cart.forEach((item) => {
     cartQuantity += item.quantity;
   });

  //  console.log(cartQuantity)
   return cartQuantity;
}

// This function take the param of productId searches for it in the cart array. Takes the new value of deliveryOptionId and gives it to matchingItem, so that is can be updated inside the cart array
export function updateDeliveryOption(productId, deliveryOptionId) {

  if(!validDeliveryOption(deliveryOptionId)) {
    return; 
  };
  // If deliveryOptionId equals a value that does not exist, the rest of this code inside will not run.

  let matchingItem;
   
  cart.forEach((cartItem) => { 
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(!matchingItem) {
    return;
  }

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {

  let matchingItem

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

export function loadCart(done) { 
  // Initialize the variable
  const xhr = new XMLHttpRequest();

  // Add event listener in this case it is load
  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    done();
  });
    // The first line is the command we want it to execute, seconde line executes.
    xhr.open('GET', 'https://supersimplebackend.dev/cart ');
    xhr.send();
} 

export async function loadCartFetch() {
  const response = await 

  fetch('https://supersimplebackend.dev/cart');

  const text = await response.text();
  console.log(text);
  return text;
}
 