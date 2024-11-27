import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0,
},
{
  id: '2',
  deliveryDays: 3,
  priceCents: 499,
},
{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}]



export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption; 

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId) {
      deliveryOption = option; /* Makes it equall to the whole object of option */
    }
  });
  return deliveryOption || deliveryOption[0];
}

function isWeekend(date) {
  const dayOfWeek = date.format('dddd');

  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';

}

export function calculateDeliveryDate(deliveryOption) {

  let remainingDays = deliveryOption.deliveryDays; /* shipping days selected by customer */

  let deliveryDate = dayjs(); /* todays date */

  // The goal is to find the final date the product will be delivered. The deliveryDate will go up by the number of remaining days. When the weekend comes, the value of remaining days will not be subtracted, therefore forcing the delivery date to be on a week day. 

  while(remainingDays > 0 ){
    deliveryDate = deliveryDate.add(1, 'day');

    if(!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }
  
  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}