import {API_URI} from './const';
import {modalError, modalTitle} from './elems';


export const getGoods = async (id) => {
  const response = await fetch(`${API_URI}api/goods/${id ? id : '?nopage=true'}`);
  if (response.ok) {
    return response.json();
  }

  throw new Error(response.status);
};

export const searchGoods = async (select, search) => {
  const response = await fetch(`${API_URI}api/goods${select}${search}`);
  if (response.ok) {
    return response.json();
  }

  throw new Error(response.status);
};

export const postGoods = async (data) => {
  const response = await fetch(`${API_URI}api/goods`, {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.json();
  } else {
    console.log(response.status);
    if (response.status === 404 || response.status === 422 || (response.status >= 500 && response.status < 600)) {
      modalTitle.textContent =
        `Произошла ошибка, статус (${response.status})`;
    } else {
      modalError.classList.add('active');
    }
  }

  throw new Error(response.status);
};

export const editGoods = async (data) => {
  const response = await fetch(`${API_URI}api/goods/${data.identificator}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'aplication/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error(response.status);
};

export const getCategory = async () => {
  const response = await fetch(`${API_URI}api/category`);
  if (response.ok) {
    return response.json();
  }

  throw new Error(response.status);
};

export const deleteGoods = async (id) => {
  const response = await fetch(`${API_URI}api/goods/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'aplication/json',
    },
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error(response.status);
};
