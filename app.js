const button = document.querySelector('#btn');
const list = document.querySelector('#list');

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then((registration) => console.log('[Service Worker] Registered', registration.scope));
    
};

let getData = () => {

    let user = document.querySelector('#userName').value;
    console.log(user);

    fetch(`https://api.github.com/users/${user}/followers`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // console.log(data);
        
        return list.innerHTML = data.map((users) => {
            return `<li id='list__style'>User: ${users.login} Link: <a href='${users.url}'>${users.url}</a></li>`;
        });
    })
    .catch((error) => {
        return list.innerHTML = 'Error! 404(Not Found)';
    })
}

button.addEventListener('click', getData);