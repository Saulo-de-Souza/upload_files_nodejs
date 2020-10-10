window.onload = function (e) {
  var bt_enviar = document.getElementById('bt_enviar');
  var file = document.getElementById('file');

  bt_enviar.addEventListener('click', function (e) {

    const formData = new FormData();
    formData.append('file', file.files[0]);

    fetch('/posts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body:  formData,
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};
