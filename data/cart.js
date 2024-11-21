export const cart = [];

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