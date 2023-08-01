import {hidePreview} from './previewControl';
import {fillingForm} from './formControl';
import {
  form,
  modal,
  modalDiscount,
  modalError,
  modalImg,
  modalSubmitBtn,
  modalTitle,
  modalTotalPrice,
  overlayImg,
  tableBody,
  vendorCodeId,
} from './elems.js';


export const openModal = (id) => {
  if (id) {
    fillingForm(id);
  }
  modal.classList.add('active');
};

export const closeModal = () => {
  modal.classList.remove('active');
  overlayImg.classList.remove('active');
  form.reset();
  modalDiscount.disabled = true;
  form.imagesave.value = '';
  form.identificator.value = '';
  vendorCodeId.textContent = '';
  modalTotalPrice.textContent = '';
  hidePreview();
};

export const modalControl = ({modalBtn, delegation}) => {
  if (modalBtn) {
    modalBtn.addEventListener('click', () => {
      modalTitle.textContent = 'Добавить новый товар';
      modalSubmitBtn.textContent = 'Добавить товар';
      openModal();
    });
  }

  if (delegation) {
    delegation.parent.addEventListener('click', ({target}) => {
      const goodsRow = target.closest(delegation.target);
      const targetExclude1 = target.closest(delegation.targetExclude1);
      const targetExclude2 = target.closest(delegation.targetExclude2);
      if (goodsRow && !targetExclude1 && !targetExclude2) {
        modalTitle.textContent = `Изменить товар`;
        modalSubmitBtn.textContent = 'Изменить товар';
        openModal(goodsRow.dataset.id);
      }
    });
  }

  modal.addEventListener('click', ({target}) => {
    if (target === modal || target.closest('.modal__close')) {
      closeModal();
    }
    if (target.closest('.modal__error_close')) {
      modalError.classList.remove('active');
    }
  });
};

export const modalImgControl = () => {
  tableBody.addEventListener('click', (e) => {
    if (e.target.closest('.table__btn_pic')) {
      const urlImage = e.target.closest('.table__btn_pic').dataset.pic;
      overlayImg.classList.add('active');
      modalImg.src = `http://localhost:3000/${urlImage}`;
    }
  });

  overlayImg.addEventListener('click', ({target}) => {
    if (target === overlayImg || target.closest('.modal__close')) {
      closeModal();
    }
  });
};

export const modaDleteControl = () => {
  tableBody.addEventListener('click', (e) => {
    if (e.target.closest('.table__btn_pic')) {
      const urlImage = e.target.closest('.table__btn_pic').dataset.pic;
      overlayImg.classList.add('active');
      modalImg.src = `http://localhost:3000/${urlImage}`;
    }
  });

  overlayImg.addEventListener('click', ({target}) => {
    if (target === overlayImg || target.closest('.modal__close')) {
      closeModal();
    }
  });
};

