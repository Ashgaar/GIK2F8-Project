//Website url
const url ='http://127.0.0.1:8000/users/';

//Fetches and returns all users as a Json
async function getAllJSON(){
    const result = (await fetch(url)).json();
    return result;
}

//Fetches and returns user with id of "id" as a Json
async function getById(id){
    const result = (await fetch(url+id)).json();
    return result;
}

//Makes a HttpPost request of the API with relevant user creation data
async function create(data){
    const JSONData = JSON.stringify(data);
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSONData
    });
    
    return result;
}

//Makes a HttpPut request of the API with relevant user update data
async function update(data){
    const JSONData = JSON.stringify(data);
    const result = await fetch(url+data.id, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSONData
    });

    return result;
}

//Makes a HttpDelete request of the API with relevant data.
function remove(data){
    const JSONData = JSON.stringify(data);
    const result = fetch(url+data.email, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        },
        body: JSONData
    });

    return result;
}