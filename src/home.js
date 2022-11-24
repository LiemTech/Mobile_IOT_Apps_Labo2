import Banner from './home.jpg';

window.addEventListener('load', () => {
    document.body.appendChild(homePage());
  });

function homePage() {

    const homeDiv = document.createElement('div');

    const homeImage = new Image();
    homeImage.src = Banner;
    homeImage.setAttribute("id", "homeImage");

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('bottomDiv');
    titleDiv.innerHTML = "AQUARIUM HEATH ALARM";

    homeDiv.appendChild(homeImage);
    homeDiv.appendChild(titleDiv);

    return homeDiv;
}