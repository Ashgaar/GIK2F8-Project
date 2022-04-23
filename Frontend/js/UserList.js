
//This code loads and displays users on the webbpage

//Contains html elements to put users into.
const userContainer = document.querySelector("ul.gallery");

//Retrieves users and puts them in the userContainer
getAllJSON().then((users)=> {
    users.forEach((user) =>{

        const userHTML = renderUser(user);

        userContainer.insertAdjacentHTML("beforeend",userHTML);
    });
});
