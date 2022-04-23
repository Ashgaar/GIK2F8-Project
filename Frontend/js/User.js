/* User.js
  HTML-code to represent a "User-object"
*/

//Stores data from a html form element used for creating users
const formElement = document.querySelector('form.create__form');

function renderUser(user) {
  return `
  <li class="card card-catalina-blue text-dark">
      <a class="card-link card-link-catalina-blue" href="./update.html?id=${user.id}"><span title="Uppdatera ${user.f_name} ${user.l_name}">Uppdatera</span></a>
      <span class="card-border card-border-left card-border-left-catalina-blue"></span>              
      <span class="card-border card-border-top card-border-top-catalina-blue"></span>
      <span class="card-border card-border-right card-border-right-catalina-blue"></span>
      <span class="card-border card-border-bottom card-border-bottom-catalina-blue"></span>
      <span class="card-fill"></span>
      <div class="card-img">
          <img class="card-img-base" src="./img/svg/profile.svg" alt="...">
          <img class="card-img-color" src="./img/svg/profile_catalina-blue.svg" alt="...">
          <img class="card-img-grad" src="./img/svg/profile_catalina-blue-grad.svg" alt="...">
      </div>
      <div class="card-body">
          <h5 class="card-title card-title-razzmatazz">${user.f_name} ${user.l_name}</h5>
          <p class="card-text">${user.presentation}</p>
      </div>
      <p class="card-text card-email card-email-persian-green"><a href="mailto:${user.email}" title="Mejla ${user.f_name} ${user.l_name}">${user.email}</a></p>
  </li>
`;
}

//When "event" happens. Takes data from a form, and creates a user, the user is then used when calling Post in the API
async function createUser(event){
  event.preventDefault();
  const user = {
    f_name: formElement.f_name.value,
    l_name: formElement.l_name.value,
    email: formElement.email.value
  };

  //Creates a user
  try {
    const createResponse = await create(user);
    //If the api responds with an error code
    if (createResponse.status >= 400){
      const jsonResponse = await createResponse.json();
      formElement.insertAdjacentHTML('afterend', `
      <label class="mt-3 col-lg-7">
        <strong class="text-danger">Error "${jsonResponse.detail}"<strong/>
      <label/>`);
    }
    else {
      window.location.href = './read.html';
    }
  } catch (error) {
    console.log(error);
  }  
}
