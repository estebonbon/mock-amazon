// I had to change const to let because, if it was a const variable it means it can never be changed or influenced by other functions

export let cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
},
{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
}];

export function addToCart(productId) {
  let matchingItem;

  // Tracks each item in the cart Array, no duplicates only the quantity can change.
  cart.forEach((cartItem) => { 
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    })
  }
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
}