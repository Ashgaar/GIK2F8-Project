//Reference to the dropdown menu that will contain the deleteable users.
const userList = document.getElementById('user');

//Fills the drop down menu with users
getAllJSON().then((users)=> {
    users.forEach((user) =>{
        const currentUserHTML = `
        <option value="${user.email}">
        ${user.f_name} ${user.l_name}
        </option>`;
        userList.insertAdjacentHTML("beforeend", currentUserHTML);
    });
});

//Calls the API to delete a user according to email
function deleteUser(event){
    event.preventDefault();
    const user = {  
      email: userList.value
    };
  
    remove(user)
      .then((result) => {
        // window.location.href = './read.html';
      })
      .catch((error) =>{
        console.log(error);
      });
  }