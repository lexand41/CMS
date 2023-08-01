import {form, inputImg, preview, previewText} from './elems';
import {toBase64} from './utils';


export const showPreview = (src) => {
  previewText.classList.add('visually-hidden');
  preview.classList.remove('visually-hidden');
  preview.src = src;
};

export const hidePreview = () => {
  previewText.classList.add('visually-hidden');
  preview.classList.add('visually-hidden');
  preview.src = '';
};

export const previewControl = () => {
  const imageFile = form.image;
  inputImg.addEventListener('change', async () => {
    if (imageFile.files.length && imageFile.files[0].size > 1e6) {
      console.log(imageFile.files[0].size);
      preview.classList.add('visually-hidden');
      previewText.classList.remove('visually-hidden');
      previewText.style.fontSize = '18px';
      previewText.style.color = 'red';
      previewText.textContent = 'Изображение не должно превышать размер 1 Мб';
    } else if (imageFile.files.length) {
      const src = await toBase64(imageFile.files[0]);
      showPreview(src);
    }
  });
};
