

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


let cart = new ListItem();
if (localStorage.getItem('SHOE_CART') != null) {
  cart.replaceList(JSON.parse(localStorage.getItem('SHOE_CART')));
  if (cart.arr.length > 0) {
    renderListItem(cart.arr)
    renderSummary(cart.arr)
  }
  else {
    document.querySelector('.emty-bag').classList.remove('hidden');
    document.querySelector('.bag').classList.add('hidden');
  }
}
else {
  document.querySelector('.emty-bag').classList.remove('hidden');
  document.querySelector('.bag').classList.add('hidden');
}






// RENDER LIST ITEM
function renderListItem(listitem) {
  listitem.forEach(item => {
    renderItem(item);
  });
}
// RENDER ITEM
function renderItem(item) {
  const itemDiv = document.createElement('li');
  itemDiv.className = "item flex mt-5 border border-black";
  itemDiv.setAttribute('id', `${item.id} ${item.sizes}`)
  let content = `
                        <div class="img shrink-0 h-[200px] w-[200px] overflow-hidden">
                            <img src=${item.img} alt="">
                        </div>
                        <div class="flex flex-1 px-5 py-4">
                            <div class="info">  
                                <div class="text-[18px] text-black">${item.name}</div>
                                <div class="mt-2 text-[#757575] text-[16px]">${item.typeProduct}</div>
                                <div class="flex mt-2 text-[#757575] text-[16px]">
                                    <div class="mr-2">
                                        <p>Size <span>${item.sizes}</span></p>
                                    </div>
                                    <div class="quantity flex">
                                        <p class="mr-1">Quantity</p>
                                    </div>
                                </div>
                            </div>
                            <div class="price ml-auto">
                                <p class="text-black text-[20px ]">${numToPrice(item.price)}đ</p>
                            </div>
                        </div>
                        <div class="flex items-center flex-col">  
                            <div class="delete-item p-2" >
                                <i class="text-[30px] fa-solid fa-xmark"></i>
                            </div>
                            <div class=" px-2">
                                <i class="text-[20px] fa-regular fa-heart"></i>
                            </div>
                        </div>
  `
  itemDiv.innerHTML = content;
  document.querySelector('.item-list').appendChild(itemDiv)
  const quantity = itemDiv.querySelector('.quantity')
  quantity.appendChild(handleQuantity(item))
  const exit = itemDiv.querySelector('.delete-item');
  exit.addEventListener('click', () => {
    deleteItem(`${item.id}`, item.sizes)
  })
}
// handle quantity
function handleQuantity(item) {
  const select = document.createElement('select')
  select.className ='border border-[#757575]'
  select.innerHTML=` ${quantity(item)}`
  select.addEventListener('change',()=>{
    let cart = new ListItem();
    cart.replaceList(JSON.parse(localStorage.getItem('SHOE_CART')));
    cart.updateQuantityItem(item,Number(select.value))
    localStorage.setItem('SHOE_CART',JSON.stringify(cart.arr))
  })
  return select;
}
function quantity(item) {
  let temp = ``;
  for (var i = 1; i < 11; i++) {
    if (i == item.quantity)
      temp += `<option selected id='${i}' value="${i}">${i}</option>`
    else
      temp += `<option id='${i}' value="${i}">${i}</option>`
  }
  return temp;
}


// Sign OUT 
function signOut() {
  localStorage.removeItem("TOKEN");
  localStorage.removeItem("USER");
  localStorage.removeItem("SHOE_CART");
  location.href = '../index.html'
}
// SEARCH 
function searchItem() {
  const keyword = document.querySelector('.header-search input').value;
  console.log(keyword);
  if (keyword != '') location.href = `../list-item/items.html?keyword=${keyword}`
}

// numToPrice
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

// SUMMARY
function renderSummary(listItem) {
  document.querySelector('.subtotal').innerHTML = numToPrice(summary(listItem));
  document.querySelector('.total').innerHTML = numToPrice(summary(listItem));
}
function summary(listItem) {
  let sum = 0;
  listItem.forEach((item) => {
    sum += item.price * item.quantity
  })
  return sum
}
// 

// Delete Item
function deleteItem(id, size) {
  let cart = new ListItem();
  cart.replaceList(JSON.parse(localStorage.getItem('SHOE_CART')));
  const item = document.getElementById(`${id} ${size}`)

  item.style.animation = "0.3s ease-in scaleOut"

  setTimeout(() => {
    cart.deleteItem(id, size);
    item.remove();
    localStorage.setItem('SHOE_CART', JSON.stringify(cart.arr));
    renderSummary(cart.arr);
    if (cart.arr.length == 0) {
      document.querySelector('.emty-bag').classList.remove('hidden');
      document.querySelector('.bag').classList.add('hidden');
    }
    checkCart();
  }, 300)
}
// Check Cart
function checkCart() {
  const cartNotify = document.querySelector('.cart-notify');
  if (localStorage.getItem("SHOE_CART") != null) {
    if (localStorage.getItem("SHOE_CART").length > 2) {
      cartNotify.classList.remove('hidden')
    }
    else {
      cartNotify.classList.add('hidden')
    }
  }
}
// Add to bag 
document.querySelector('.check-out-btn').addEventListener('click', checkOut)
function checkOut() {
  let listShoe = new ListItem();
  listShoe.replaceList(JSON.parse(localStorage.getItem('SHOE_CART')));
  console.log(listShoe.arr);
  let new_listShoe = {
    "products": listShoe.arr.map(item => {
      return {
        "quantity": item.quantity,
        "name": item.name,
        "price": item.price,
        "size": item.sizes,
        "img": item.img,
        "color": `${item.color}`
      }
    })
  }
  console.log(new_listShoe);
  const token = JSON.parse(localStorage.getItem('TOKEN'))
  fetch('https://nike0403.herokuapp.com/cart/create', {
    method: "POST",
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(new_listShoe)
  })
    .then(res => {
      if (res.status > 199 & res.status < 300) {
        alert("Check out success!");
        localStorage.removeItem("SHOE_CART");
        location.href = "";
      }
      else {
        alert("Fail!");
      }
    })
    .catch(err => console.log(err))
}