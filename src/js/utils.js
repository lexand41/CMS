import {modalCheckbox, modalDiscount} from './elems';


export const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('loadend', () => {
      resolve(reader.result);
    });

    reader.addEventListener('error', () => {
      reject(err);
    });

    reader.readAsDataURL(file);
  });
};

export const setNumbers = () => {
  const elements = document.querySelectorAll('.number');
  elements.forEach((elem, i) => {
    elem.innerHTML = i + 1;
  });
};

export const currencyFormatRUB = (number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(number)
};

export const calcTotalSum = () => {
  const priceTotals = document.querySelectorAll('.table__cell_total');
  const cmsTotalPrice = document.querySelector('.cms__total-price');
  let sumPriceTotals = 0;
  for (const priceTotal of priceTotals) {
    sumPriceTotals += +priceTotal.dataset.sum;
  }
  cmsTotalPrice.textContent = currencyFormatRUB(sumPriceTotals);
};

export const calcTotalPrice = (count, price, discount) => {
  if (!discount) discount = 0;
  const totalPrice = (price - (price * discount / 100)) * count;
  return currencyFormatRUB(totalPrice);
};

export const togleDiscount = () => {
  modalCheckbox.addEventListener('change', () => {
    modalDiscount.disabled = modalCheckbox.checked ? 0 : 1;
    if (!modalCheckbox.checked) {
      modalDiscount.value = '';
    }
  });
};
