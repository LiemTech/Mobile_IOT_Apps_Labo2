import './style.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

window.addEventListener('load', () => {
  document.body.appendChild(navBar());
});

function navBar() {

  var div1 = document.createElement('div');
  div1.classList.add('topnav');
  div1.setAttribute("id", "myTopnav");

  var a1 = document.createElement('a');
  a1.classList.add('active');
  a1.setAttribute("href", "index.html");
  a1.setAttribute("id", "a1");
  a1.innerHTML = 'HOME';

  var a2 = document.createElement('a');
  a2.setAttribute("href", "data.html");
  a2.setAttribute("id", "a2");
  a2.innerHTML = 'DASHBOARD';

  var a3 = document.createElement('a');
  a3.setAttribute("href", "about.html");
  a3.setAttribute("id", "a3");
  a3.innerHTML = 'ABOUT';

  var a4 = document.createElement('a');
  a4.classList.add('icon');
  a4.setAttribute("href", "javascript:void(0)");
  a4.setAttribute("onclick", "makeNavBarResponsive()");

  var i1 = document.createElement('i');
  i1.classList.add('fa');
  i1.classList.add('fa-bars');

  div1.appendChild(a1);
  div1.appendChild(a2);
  div1.appendChild(a3);
  div1.appendChild(a4);
  a4.appendChild(i1);

  return div1;
}