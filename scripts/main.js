const usersContainer = document.querySelector(".users");
const profileContainer = document.querySelector(".profile-container");
const usersLink = document.querySelector(".users-link");

const USERS_API = `https://api.github.com/users`; 


async function fetchUsers(){
    let res = await fetch(USERS_API);
    let users = await res.json();
    renderUsers(users);
}

function renderUsers(users){
    users.forEach((user) => {
        usersContainer.innerHTML += `
            <div class="user flex">
                <img src="${user.avatar_url}" alt="">
                <div class="user-content">
                    <a href="#" data-name='${user.login}'>${user.login}</a>
                    <p>Troy, Mi</p>
                    <div class="tags">
                        <span>Clothes</span>
                        <span>Stem</span>
                    </div>
                </div>
            </div>
        `;
    });

    const userLinks = usersContainer.querySelectorAll(".user-content a");
    
    userLinks.forEach(userLink => {
        userLink.addEventListener("click", showUser);
    });
}

function showUser(e){
    e.preventDefault();
    let target = e.target;

    let userLogin = target.dataset.name;

    fetch(`https://api.github.com/users/${userLogin}`)
    .then(res => res.json())
    .then(user => {
        showProfile(user);
        reverseClasses(usersContainer, profileContainer);
    })
}

function showProfile(user){
    profileContainer.innerHTML = `
        <div class="profile flex">
            <img src="${user.avatar_url}" alt="">
            <div class="profile-content">
                <h3>${user.name} - <span>${user.location}</span></h3>
                <p></p>
                <div class="flex">
                    <div>
                        <span>${user.public_repos}</span>
                        <p>Public Repos</p>
                    </div>
                    <div>
                        <span>${formatFollowers(user.followers)}</span>
                        <p>Followers</p>
                    </div>
                    <div>
                        <span>${user.following}</span>
                        <p>Following</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function reverseClasses(firstElement, secondElement){
    firstElement.classList.add("hide");
    secondElement.classList.remove("hide");
}

function formatFollowers(followers){
    let followerK = 1000;
    if(followers < followerK){
        return followers;
    }
    return `${Math.floor(followers / followerK)}K`;
}


document.addEventListener("DOMContentLoaded", fetchUsers);
usersLink.addEventListener("click", (e) => {
    e.preventDefault();
    reverseClasses(profileContainer, usersContainer);
});