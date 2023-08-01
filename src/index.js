import {modalBtn} from './js/elems';
import {modalControl, modalImgControl} from './js/modalControl';
import {previewControl} from './js/previewControl';
import {tableControl} from './js/tableControl';
import {formControl} from './js/formControl';
import {togleDiscount} from './js/utils';

import './index.html';

import './css/index.css';

const init = () => {
  modalControl({modalBtn});
  modalImgControl();
  previewControl();
  tableControl();
  formControl();
  togleDiscount();
};

init();
