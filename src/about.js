window.addEventListener('load', () => {
    var a1 = document.getElementById("a1");
    var a3 = document.getElementById("a3");

    a1.classList.remove('active');
    a3.classList.add('active');

    document.body.appendChild(aboutPage());
});

function aboutPage() {

    const aboutDiv = document.createElement('div');

    const middleDiv = document.createElement('div');
    middleDiv.classList.add('middleDivD');
    middleDiv.innerHTML = "MOBILE IOT APPS - LABO 1";


    const bottomDiv = document.createElement('div');
    bottomDiv.classList.add('bottomDiv');
    bottomDiv.innerHTML = "LIEM NGUYEN - IWT 3IC";

    aboutDiv.appendChild(middleDiv);
    aboutDiv.appendChild(bottomDiv);

    return aboutDiv;
}