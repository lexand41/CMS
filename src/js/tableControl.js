import {modal, modalWarning, tableGoods} from './elems';
import {modalControl} from './modalControl';
import {searchControl} from './searchControl';
import {getGoods, deleteGoods} from './serviceAPI';
import {tableRender} from './tableView';
import {calcTotalSum} from './utils';


export const tableControl = async () => {
  modalControl({
    modal,
    delegation: {
      parent: tableGoods,
      target: '.table__goods_item',
      targetExclude1: '.table__btn_del',
      targetExclude2: '.table__btn_pic',
    },
  });

  tableGoods.addEventListener('click', ({target}) => {
    const delBtn = target.closest('.table__btn_del');
    if (delBtn) {
      const row = delBtn.closest('.table__goods_item');
      modalWarning.classList.add('active');

      modalWarning.addEventListener('click', async ({target}) => {
        if (target.closest('.modal__btn_pass')) {
          const isDel = await deleteGoods(row.dataset.id);
          row.dataset.id = '';
          modalWarning.classList.remove('active');

          if (isDel) {
            row.remove();
            calcTotalSum();
          }
        }
        if (target.closest('.modal__btn_back')) {
          modalWarning.classList.remove('active');
        }
      });
    }
  });
  searchControl();
  const goods = await getGoods();
  tableRender(goods);
};
