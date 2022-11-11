
// Hide Filter
const hideFilter = document.querySelector('.hide-filter')
hideFilter.addEventListener('click', hideShowFilter)
// 
function hideShowFilter(){
  const filterMenu = document.querySelector('.filter-menu');
  const content = document.querySelector('.content');
  if (filterMenu.offsetHeight > 0) {
    filterMenu.style.display = 'none';
    content.style.width = '100%'
    content.classList.remove('grid-cols-3');
    content.classList.add('grid-cols-4');
    hideFilter.innerHTML = 'Show Filters'

  }
  else {
    content.classList.add('grid-cols-3');
    content.classList.remove('grid-cols-4');
    filterMenu.style.display = 'block';
    hideFilter.innerHTML = 'Hide Filters'
  }
}
// SORT
var sort = document.querySelector('.sort-by');
sort.addEventListener('click', () => {
  var navSort = document.querySelector('.nav-sort');
  if (navSort.offsetHeight > 0) {
    navSort.classList.add('hidden')
  }
  else {
    navSort.classList.remove('hidden')
  }
})
// 

// HEADER
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    var header = document.querySelector("header")
    header.style.top = "0";
    document.querySelector(".nav-filter").style.top = header.offsetHeight + 'px';
  } else {
    document.querySelector("header").style.top = "-100px";
    document.querySelector(".nav-filter").style.top = 0;
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
    document.querySelector('.menu-bar').style.display = 'none';

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
      document.querySelector('.menu-bar').style.display = 'flex';
      
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
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.querySelector(".header-search div").click();
  }
});
// 
// Check box
$('.gender input').on('change', function() {
  // if(this.checked == true){
  //   location.href = `items.html?gender=${this.value}`
  // }
  // else location.href = `items.html`
  $('input[name="gender"]').not(this).prop('checked', false);
}); 


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

// handle filter menu
var y = window.matchMedia("(max-width: 900px)")
mobileFilter(y); // Call listener function at run time
y.addEventListener('change',()=>{mobileFilter(y)})

function mobileFilter() {
  if (y.matches) {
    const filterMenu = document.querySelector('.filter-menu');
    if(filterMenu.offsetHeight>0){
      hideShowFilter()
    }

  }
  else{
    const filterMenu = document.querySelector('.filter-menu');
    if(filterMenu.offsetHeight < 1){
      hideShowFilter()
    }
  }

}
