export function formatCurrency(priceCents) {
  return(Math.round(priceCents) / 100).toFixed(2);  
}

export default function isWeekendDate(date) {
  const thedate = date.format('dddd');

  if(thedate === 'Saturday' || thedate === 'Sunday'){
    return thedate;
  }

  return 'It is not the weekend :('
}