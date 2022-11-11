
// HEADER
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector("header").style.top = "0";
  } else {
    document.querySelector("header").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
}

var search = document.querySelector('.header-search');
const searchWidth = search.offsetWidth;
search.addEventListener('click', function () {
  if (search.offsetWidth <= 200) {
    document.querySelector('.header-navbar').style.display = 'none';
    document.querySelector('.search-exit').style.display = 'flex';
    document.querySelector('.form-sign').style.display = 'none';
    document.querySelector('.header-cart').style.display = 'none';
    document.querySelector('.form-account').style.display = 'none';

    search.style.width = '600px'
    document.querySelector('.search-modal').style.display = 'block';
    document.querySelector('.main').style.filter = 'blur(4px)';
  }
})

var exit = document.querySelector('.search-exit');
exit.addEventListener('click',displayHeader)

var searchModal = document.querySelector('.search-modal');
searchModal.addEventListener('click',displayHeader)

function displayHeader() {
  document.querySelector('.search-exit').style.display = 'none';
  document.querySelector('.header-cart').style.display = 'flex';
  search.style.width = `${searchWidth}px`
  document.querySelector('.search-modal').style.display = 'none';
  document.querySelector('.main').style.filter = 'blur(0)';
  setTimeout(() => {
    document.querySelector('.header-navbar').style.display = 'flex';
    if (localStorage.getItem('TOKEN') != null) {
      document.querySelector('.form-account').style.display = 'flex';
    }
    else {
      document.querySelector('.form-sign').style.display = 'flex';
    }
  }, 50)
}

var x = window.matchMedia("(max-width: 900px)")
mobileHeader(x); // Call listener function at run time
x.addEventListener('change',()=>{mobileHeader(x)})

function mobileHeader() {
  console.log(x.matches);
  if (x.matches) {
    document.querySelector('.header-navbar').style.display = 'none';
    if (localStorage.getItem('TOKEN') != null) {
      document.querySelector('.form-account').style.display = 'none';
    }
    else {
      document.querySelector('.form-sign').style.display = 'none';
    }

    var exit = document.querySelector('.search-exit');
    exit.removeEventListener('click',displayHeader,false)
    
    var searchModal = document.querySelector('.search-modal');
    searchModal.removeEventListener('click',displayHeader,false)

    exit.addEventListener('click',displayHeaderMobile)
    searchModal.addEventListener('click',displayHeaderMobile)
    function displayHeaderMobile() {
      document.querySelector('.search-exit').style.display = 'none';
      document.querySelector('.header-cart').style.display = 'flex';
      search.style.width = `150px`
      document.querySelector('.search-modal').style.display = 'none';
      document.querySelector('.main').style.filter = 'blur(0)';
      
    }
  }
  else{
    document.querySelector('.header-navbar').style.display = 'flex';
    if (localStorage.getItem('TOKEN') != null) {
      document.querySelector('.form-account').style.display = 'flex';
    }
    else {
      document.querySelector('.form-sign').style.display = 'flex';
    }

    var exit = document.querySelector('.search-exit');
    exit.addEventListener('click',displayHeader)
    exit.removeEventListener('click',displayHeaderMobile,false)

    var searchModal = document.querySelector('.search-modal');
    searchModal.addEventListener('click',displayHeader)
    searchModal.removeEventListener('click',displayHeaderMobile,false)

  }

}

// Enter event

var input = document.querySelector(".header-search input");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.querySelector(".header-search div").click();
  }
});
// 


// handle menu-bar

document.querySelector('.menu-bar-icon').addEventListener('click',()=>{
  const menu = document.querySelector('.menu-bar-main')
  const overlay = document.querySelector('.overlay')
  overlay.classList.remove('hidden')
  menu.style.right = 0;
})
document.querySelector('.menu-bar-exit').addEventListener('click',()=>{
  const menu = document.querySelector('.menu-bar-main')
  menu.style.right = "-500px"
  const overlay = document.querySelector('.overlay')
  overlay.classList.add('hidden')

})
// 
// 
// CHANGE FORM BETWEEN SIGN IN AND SIGN UP
function changeForm(id) {
  var signIn = document.querySelector('.sign-in-form');
  var signUp = document.querySelector('.sign-up-form');

  if (id == 1) {
    signIn.classList.remove('hidden')
    signUp.classList.add('hidden')

  }
  else {
    signIn.classList.add('hidden')
    signUp.classList.remove('hidden')
  }
}

// 
