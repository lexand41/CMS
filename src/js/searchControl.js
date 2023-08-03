import {filterSearch, inputSearch} from './elems';
import {searchGoods} from './serviceAPI';
import {tableRender} from './tableView';

inputSearch.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') e.preventDefault();
});

let i = 1;
let choice;

const titleSearch = () => {
  inputSearch.placeholder = 'Поиск по наименованию';
  return '?search=';
};

const categorySearch = () => {
  i = 0;
  inputSearch.placeholder = 'Поиск по категории';
  return '/category/';
};

export const searchControl = () => {
  filterSearch.addEventListener('click', () => {
    i === 1 ? choice = titleSearch() : i === 2 ?
      choice = categorySearch() : '', ++i;

    inputSearch.disabled = false;
    inputSearch.value = '';
    inputSearch.addEventListener('input', (e) => {
      e.preventDefault();
      let timeout;
      const inputText = async () => {
        const foo = inputSearch.value;
        const goods = await searchGoods(choice, foo);
        tableRender(goods);
      };
      clearTimeout(timeout);
      setTimeout(inputText, 300);
    });
  });
};
