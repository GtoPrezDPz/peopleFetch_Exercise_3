const url = "http://localhost:3000/people/";
let currentId = 0;

const appiCall = async () => {
    const resp = await fetch(url);
    if (resp.status == 200) {
        const results = await resp.json();
        return results;
    }
    else {
        alert("Server error");
    }
}

window.onload = () => {    
    
    document.querySelector(".form").addEventListener("submit", handleSubmit);

    appiCall()
        .then(data=>{
            if (data && data.length > 0) {
                let people = data[0];
                currentId = people.id;
                document.getElementById("user").value = people.user;
                document.getElementById("lastname").value = people.lastname;
                document.getElementById("password").value = people.password;
                document.getElementById("name").value = people.name;
                document.getElementById("companyEmail").value = people.companyEmail;
                document.getElementById("personalEmail").value = people.personalEmail;
                document.getElementById("population").value = people.population;
                document.getElementById("image").value = people.urlImage;
                document.getElementById("creationDate").value = people.creationDate;
                document.getElementById("activated").checked = people.activated;
                document.getElementById("finalDate").value = people.finalDate; 
            }  
        })
        .catch (error => console.log(error));  
}

const handleSubmit = (event) => {
    event.preventDefault();
    let people = {
        user: document.getElementById("user").value,
        lastname: document.getElementById("lastname").value,
        password: document.getElementById("password").value,
        name: document.getElementById("name").value,
        companyEmail: document.getElementById("companyEmail").value,
        personalEmail: document.getElementById("personalEmail").value,
        population: document.getElementById("population").value,
        urlImage: document.getElementById("image").value,
        creationDate: document.getElementById("creationDate").value,
        activated: document.getElementById("activated").checked,
        finalDate: document.getElementById("finalDate").value        
    }
    
    
    if (!(validate(people))) {        
        return false;        
    } else {
        updateUser(people)
        .then(res => alert("Updated user"))
        .catch(error => console.log(error));
        
    }    
}

const validate = newUser => {
    for (const [key, value] of Object.entries(newUser)){        
        if (value == null || value == ""){     
            alert (`Error en ${key}`);
            window.location.reload();
        }             
    }
    return true;
}


const updateUser = async (newUser) => {
    const res = await fetch(url + currentId, {
        method: "PUT",
        body: JSON.stringify({
            user: newUser.user,
            lastname: newUser.lastname,
            password: newUser.password,
            name: newUser.name,
            companyEmail: newUser.companyEmail,
            personalEmail: newUser.personalEmail,
            population: newUser.population,
            urlImage: newUser.urlImage,
            creationDate: newUser.creationDate,
            activated: newUser.activated,
            finalDate: newUser.finalDate
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (res.status != 200) alert("Server Error");
    else {
        const data = await res.json();
        return data;
    }
}