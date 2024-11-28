// I had to change const to let because, if it was a const variable it means it can never be changed or influenced by other functions
import { validDeliveryOption } from "./deliveryOptions.js";
// "this" substitues for the outer object
// Use Pascal case for things that generate objects

class Cart {
  cartItems;
  localStorageKey;

  constructor (localStorageKey) {
    this.localStorageKey = 'localStorageKey';
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
    // If cart didn't equall anything why does it affect amazon.html it doesnt make sense. 
    // The file importing it will not be able to run properly, it will hault at an undefined variable
  
    if(!this.cartItems){
      this.cartItems = [{
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

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;
  
    // Tracks each item in the cart Array, no duplicates only the quantity can change.
    this.cartItems.forEach((cartItem) => { 
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
  
    if(matchingItem) {
      matchingItem.quantity += 1; 
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      })
    }
  
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
  
    this.saveToStorage();
  }
  
  updateDeliveryOption(productId, deliveryOptionId) {
  
    if(!validDeliveryOption(deliveryOptionId)) {
      return; 
    };
    // If deliveryOptionId equals a value that does not exist, the rest of this code inside will not run.
  
    let matchingItem;
     
    this.cartItemst.forEach((cartItem) => { 
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
  
    if(!matchingItem) {
      return;
    }
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
  
    let matchingItem
  
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
  
    this.saveToStorage();
  }

  calculateCartQauntity() {
    // This is a separate operation that tracks the amount of items in the cart
    let cartQuantity = 0;
    this.cartItems.forEach((item) => {
      cartQuantity += item.quantity;
    });
 
   //  console.log(cartQuantity)
    return cartQuantity;
  }
   
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');



console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);

// method has to be named costructor, it does not return values


