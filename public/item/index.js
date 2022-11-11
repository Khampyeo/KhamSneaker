
checkCart();
if (localStorage.getItem("TOKEN") != null) {
  // web
  const user = JSON.parse(localStorage.getItem('USER'));
  document.querySelector('.form-account p').innerHTML = `${user.name}`
  document.querySelector('.form-sign').classList.add('hidden')

  const account = document.querySelector('.form-account')
  account.classList.remove('hidden')
  account.classList.add('flex')
  // mobile
  document.querySelector('.mobile-account .user-name').innerHTML = `${user.name}`
  document.querySelector('.mobile-sign').classList.add('hidden')

  document.querySelector('.mobile-account').classList.remove('hidden')
}
let shoeList = new ListItem();
let url = document.URL;
let id = url.substring(url.lastIndexOf('?') + 1)

fetch(`https://nike0403.herokuapp.com/product/${id}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    renderItem(data);
    return data;
  })
  .then(data => {
    const addBtn = document.querySelector('.add-to-bag-btn')
    addBtn.addEventListener('click', () => {
      addShoeCart(data);
      // addSuccess()
    })

  })

function renderItem(item) {
  let content = `
  <div class="main-section flex mt-20">
            <div class="grid grid-cols-2 auto-rows-min gap-3 mr-10">
                ${renderImgItem(item)}
            </div>
            <div class="shrink-0 item-info w-[360px]">
                <div class="">
                    <h1 class="text-[28px]">${item.name}</h1>
                    <p class="text-[16px]">${item.message}</p>
                    <p class="text-[16px] py-5">${numToPrice(item.price)}₫</p>
                </div>
                <div class="select-size">
                    <p class="text-[16px] font-semibold">Select Size</p>
                    <div class="select-size-group grid grid-cols-3 gap-2 mt-3">
                        ${renderSiseBtn(item)}
                    </div>
                    <p class="valid-size-btn text-red-600 text-[12px] pl-5 hidden">You must choose size</p>
                    <button class="add-to-bag-btn w-full p-4 bg-[#111] mt-5 text-white rounded-full transition-all">Add to Bag</button>
                    <button class="favorite-btn w-full p-4 bg-white border border-[#757575] mt-5 rounded-full">Favorite</button>
                    <p class="mt-10 text-[16px]">${item.description}</p>
                    <ul class="list-disc">
                        <li class="text-[16px] ml-[16px] mt-2">Colour Shown: Pink Oxford/Rose Whisper/Summit White/Pink Oxford</li>
                        <li class="text-[16px] ml-[16px] mt-2">Style: DM7604-600</li>
                    </ul> 
                    <a class="inline-block border-b border-[#111] mt-5 hover:opacity-75" href="">View Product Details</a>   
                    <h1 class="text-[22px] border-t border-b py-5 mt-10">Free Delivery and Returns</h1>
                    <h1 class="text-[22px] border-b py-5">Reviews</h1>
                </div>
            </div>
        </div>
  `
  document.querySelector('.main').innerHTML = content

}

// SEARCH 
function searchItem() {
  const keyword = document.querySelector('.header-search input').value;
  console.log(keyword);
  if (keyword != '') location.href = `../list-item/items.html?keyword=${keyword}`
}
// RENDER IMG ITEM 
function renderImgItem(item) {
  let content = ''
  if (item.imgDetails.length > 0) {

    item.imgDetails[0].imgs.forEach((item, index) => {
      content += `
      <img class='' src=${item.img} alt="">
      `
    });
  }
  else {
    content = `<img class='' src=${item.img} alt="">    `
  }
  return content;
}
function renderSiseBtn(item) {
  let content = ''
  item.sizes.forEach((item, index) => {
    content += `
    <button id="size-btn-${index}" class="size-btn border py-2 text-[16px]" onclick='SizeSelect("size-btn-${index}")'>${item.size}</button>
    `
  });
  return content;
}


//Number to  Price
function numToPrice(num) {
  let str = String(num);
  let len = str.length;
  if (len < 3) return str
  else if (len < 7) {
    str = str.slice(0, -3) + ',' + str.slice(-3)
    return str
  }
  else {
    str = str.slice(0, -6) + ',' + str.slice(-6, -3) + ',' + str.slice(-3)
    return str
  };
}


// Sign OUT 
function signOut() {
  localStorage.removeItem("TOKEN");
  localStorage.removeItem("USER");
  localStorage.removeItem("SHOE_CART");
  location.href = '../index.html'
}
// 
// SIZE SELECTION
function SizeSelect(id) {
  const btn = document.getElementById(id)
  const btnList = document.querySelectorAll('.size-btn')
  btnList.forEach(item => item.classList.remove('primary-btn'))
  btn.classList.add('primary-btn')
  document.querySelector('.select-size-group').style.border = "none";
    document.querySelector('.valid-size-btn').classList.add('hidden')
}

// Add Shoe into local store
function addShoeCart(shoe) {

  const size = document.querySelector('.primary-btn')

  let new_shoe
  if (size == null) {
    document.querySelector('.valid-size-btn').classList.remove('hidden')
    document.querySelector('.select-size-group').style.border = "1px solid red";
  }
  else {
    new_shoe = new Item(shoe._id, shoe.name, shoe.gender, shoe.typeProduct, 1, shoe.color, shoe.price, shoe.img, size.innerHTML);
    if(localStorage.getItem('SHOE_CART') != null){
      shoeList.replaceList(JSON.parse(localStorage.getItem('SHOE_CART')));
      if(shoeList.checkDuplicateItem(new_shoe)){
        console.log(shoeList.arr);
        const quantity = shoeList.getQuantityItem(new_shoe)
        shoeList.updateQuantityItem(new_shoe,quantity+1);
      }
      else{
        console.log('add');
        shoeList.addItem(new_shoe)
      }
      localStorage.setItem('SHOE_CART',JSON.stringify(shoeList.arr))

    }
    else {
      shoeList.clearArr();
      shoeList.addItem(new_shoe);
      localStorage.setItem('SHOE_CART',JSON.stringify(shoeList.arr))
    }
    addSuccess(new_shoe)
  }
  checkCart()
}

function checkCart(){
  let cartNotify = document.querySelector('.cart-notify');
  if(localStorage.getItem("SHOE_CART")!=null){
    if(localStorage.getItem("SHOE_CART").length >2){
      cartNotify.classList.remove('hidden')
    }
    else{
      cartNotify.classList.add('hidden')
    }
  }
}

// Message
function addSuccess(item) {
  window.scrollTo({top: 0, behavior: 'smooth'});
  const addMessage = document.querySelector('.added-message');
  addMessage.classList.remove('hidden')
  const toast = document.createElement('div');
  toast.setAttribute('id','toast-msg')
  content = `
                    <div class="flex items-center mt-2">
                          <div class="rounded-full bg-green-600 flex items-center justify-center h-[14px] w-[14px]">
                            <i class="text-white text-[8px] fa-solid fa-check"></i>
                          </div>
                          <p class="ml-2 whitespace-nowrap">Added to bag</p>
                    </div>
                    <div class="flex mt-2 items-center">
                        <div class=" h-[60px] w-[60px]">
                          <img src=${item.img} alt="">
                        </div>
                        <div class="ml-2">
                            <p class="text-[16px]">${item.name}</p>
                            <p class="text-[14px] text-gray-700">${item.sizes}</p>
                            <p class="text-[14px]">${numToPrice(item.price)}đ</p>
                        </div>
  `
  toast.innerHTML = content;
  addMessage.appendChild(toast);
  const modal = document.querySelector('.modal-message');
  modal.classList.remove('hidden');
  const autoRemove = setTimeout(()=>{
    modal.classList.add('hidden');
    addMessage.classList.add('hidden')
    addMessage.removeChild(toast)
  },3000)

  modal.onclick = ()=>{
    if(addMessage.hasChildNodes()){
      clearTimeout(autoRemove);
      modal.classList.add('hidden');
      addMessage.classList.add('hidden')
      addMessage.removeChild(toast)
    }
  }
} 