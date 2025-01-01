export let orders = JSON.parse(localStorage.getItem('orders')) || [] ;

export function addOrder(order) {
  orders.unshift(order); 
  saveToStorage();
}

function saveToStorage () {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function logOrders() {
  console.log(orders);
}

export function removeOrder(orderId) {
  const newOrders = [];

  orders.forEach((order) => {
    if(order.id !== orderId){
      newOrders.push(order);
    }
  });

  orders = newOrders;
  saveToStorage();
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order
    }
  });

  return matchingOrder;
}



// export function getOrder(orderId) {
//   console.log('Looking for order with ID:', orderId);

//   const orders = [
//     {
//       id: '2b79004a-9d8f-4493-86c5-ef174d9498eb',
//       products: [
//         { productId: 'b0f17cc5-8b40-4ca5-9142-b61fe3d98c85', quantity: 2, estimatedDeliveryTime: '2024-12-31T00:00:00Z' }
//       ]
//     }
//   ];

//   const order = orders.find((order) => order.id === orderId);
//   console.log('Found order:', order);
//   return order;
// }
