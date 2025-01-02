import axios from 'axios';

const formToJson = (form) => {
  const jsonDate = Object.fromEntries(new FormData(form).entries());
  return jsonDate;
}

const changeLocation = (path) => {
  window.location.href = path;
}

const showOKModal = (message = '正常に完了しました', title = '') => {
  // alert(message);
  const modalEl = document.getElementById('modal');
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-message').textContent = message;
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
};

const form = document.querySelector('.form');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = formToJson(form);
  axios.post('/campgrounds', data)
    .then((res) => {
      showOKModal();
      changeLocation(`/campgrounds/${res.data._id}`);
    })
    .catch((err) => {
      const errMsg = err?.response?.data?.errMsg || 'エラーが発生しました';
      // showErrModal(errMsg);
    });

});
