import {category, form, modal, vendorCodeId, modalTotalPrice} from './elems';
import {closeModal} from './modalControl';
import {getCategory, postGoods, getGoods, editGoods} from './serviceAPI';
import {toBase64, calcTotalPrice} from './utils';
import {editRow, renderRow} from './tableView';
import {showPreview} from './previewControl';
import {API_URI} from './const';


const updateCategory = async () => {
  category.textContent = '';
  const categoryList = await getCategory();
  const categoryOption = categoryList.map(cat => {
    const option = document.createElement('option');
    option.value = cat;
    return option;
  });
  category.append(...categoryOption);
};

export const formControl = () => {
  form.addEventListener('change', () => {
    const formProduct = new FormData(form);
    const {price, count, discount} = Object.fromEntries(formProduct);
    modalTotalPrice.innerHTML = `${calcTotalPrice(count, price, discount)}`;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};

    for (const [key, val] of formData) {
      if (val) {
        data[key] = val;
      }
    }

    if (data.image.size && data.image.size <= 1e6) {
      data.image = await toBase64(data.image);
    } else {
      delete data.image;
    }

    if (data.imagesave) {
      const goods = await editGoods(data);
      editRow(goods);
    } else {
      const goods = await postGoods(data);
      renderRow(goods);
    }

    closeModal(modal, 'active');
    await updateCategory();
  });
};

export const fillingForm = async (id) => {
  const {
    title, category, description, units, count, price, discount, image,
  } = await getGoods(id);

  vendorCodeId.textContent = `id: ${id}`;
  modalTotalPrice.innerHTML = `${calcTotalPrice(count, price, discount)}`;

  form.title.value = title;
  form.category.value = category;
  form.description.value = description;
  form.units.value = units;
  form.count.value = count;
  form.price.value = price;
  form.discount.value = discount;
  form.imagesave.value = image;
  form.identificator.value = id;
  showPreview(`${API_URI}${image}`);
};
