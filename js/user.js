
let userInfo = document.querySelector("#user_info");
let userD = document.querySelector("#user");
let links = document.querySelector("#links");

if (localStorage.getItem("email")) {
    links.remove(); 
    userInfo.style.display = "flex"; 
    userD.innerHTML = localStorage.getItem("email"); 
}

let loguotbut = document.querySelector("#logout");
loguotbut.addEventListener("click", function () {
    localStorage.clear(); 
    setTimeout(() => {
        window.location = "login.html"; 
    }, 1500);
});