import {tableGoods} from './elems';
import {calcTotalSum, currencyFormatRUB, setNumbers, calcTotalPrice} from './utils';

const fillingRow = (goodsRow, {id, title, category, units, count, price, discount, image}) => {
  goodsRow.innerHTML = `
      <td class="table__cell number"></td>
      <td class="table__cell table__cell_left table__cell_name" data-id="${id}">
        <span class="table__cell-id">id: ${id}</span>
        ${title}</td>
      <td class="table__cell table__cell_left">${category}</td>
      <td class="table__cell">${units}</td>
      <td class="table__cell">${count}</td>
      <td class="table__cell">${currencyFormatRUB(price)}</td>
      <td class="table__cell table__cell_total"
        data-sum="${(price - (price * discount / 100)) * count}">
        ${calcTotalPrice(count, price, discount)}</td>
      <td class="table__cell table__cell_btn-wrapper">
        <button class="table__btn table__btn_pic" data-pic="${image}"></button>
        <button class="table__btn table__btn_edit"></button>
        <button class="table__btn table__btn_del"></button>
      </td>
    </tr>
    <tr>
  `;
  return goodsRow;
};

export const renderRow = (data) => {
  const goodsRow = document.createElement('tr');
  goodsRow.classList.add('table__goods_item');
  goodsRow.dataset.id = data.id;
  tableGoods.append(fillingRow(goodsRow, data));
  setNumbers();
  calcTotalSum();
};

export const editRow = (data) => {
  const goodsRow = document.querySelector(`[data-id="${data.id}"]`);
  fillingRow(goodsRow, data);
  calcTotalSum();
};

export const tableRender = (goods) => {
  tableGoods.textContent = '';
  goods.forEach(renderRow);
  setNumbers();
  calcTotalSum();
};
