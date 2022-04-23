const formElement = document.querySelector('form.create__form');
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');


if(userId) {
  getById(userId).then((user) => {
    formElement.f_name.value = user.f_name;
    formElement.l_name.value = user.l_name;
    formElement.email.value = user.email;
    formElement.presentation.value = user.presentation;
  });
}

async function updateUser(event){
    event.preventDefault();

    const user = {
      id: userId,
      f_name: formElement.f_name.value,
      l_name: formElement.l_name.value,
      email: formElement.email.value,
      presentation: formElement.presentation.value
    };
    
    try {
      const updateResponse = await update(user);
      if (updateResponse.status >= 400){
        const jsonResponse = await updateResponse.json();
        formElement.insertAdjacentHTML('afterend', `
        <article class="ml-2 mt-4 col-lg-7">
          <strong class="text-danger">Error "${jsonResponse.detail}"<strong/>
        <article/>`);
      } 
      else { //On success
        // window.location.href = './read.html';
      }
    } catch (error) {
      console.log(error);
    }  
  }