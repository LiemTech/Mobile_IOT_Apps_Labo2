window.addEventListener('load', () => {
    var a1 = document.getElementById("a1");
    var a2 = document.getElementById("a2");

    a1.classList.remove('active');
    a2.classList.add('active');

    document.body.appendChild(dataPage());
});

function dataPage() {

    const dataDiv = document.createElement('div');

    const middleDivA = document.createElement('div');
    middleDivA.classList.add('middleDivA');
    middleDivA.innerHTML = "CURRENT TEMPERATURE: <p id=\"currentT\">25</p>°C";

    const middleDivB = document.createElement('div');
    middleDivB.classList.add('middleDivB');
    middleDivB.innerHTML = "TRESHOLD TEMPERATURE: <p id=\"treshT\">30</p>°C";

    const middleDivC = document.createElement('div');
    middleDivC.classList.add('middleDivC');

    const slider = document.createElement('input');
    slider.setAttribute("type", "range");
    slider.setAttribute("min", "20");
    slider.setAttribute("max", "40");
    slider.setAttribute("value", "30");
    slider.setAttribute("id", "myRange");
    slider.classList.add('slider');

    const bottomDiv = document.createElement('div');
    bottomDiv.classList.add('bottomDiv');
    //bottomDiv.innerHTML = "DASHBOARD";

    const postButton = document.createElement('button');
    postButton.setAttribute("id", "postButton");
    postButton.innerHTML = "SUBSCRIBE";

    const enableButton = document.createElement('button');
    enableButton.setAttribute("id", "notificationsBtn");
    enableButton.innerHTML = "ENABLE NOTIFICATIONS";

    dataDiv.appendChild(middleDivA);
    dataDiv.appendChild(middleDivB);
    dataDiv.appendChild(middleDivC);
    middleDivC.appendChild(slider);
    dataDiv.appendChild(bottomDiv);
    bottomDiv.appendChild(postButton);
    bottomDiv.appendChild(enableButton);

    return dataDiv;
}