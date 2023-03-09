checkCart();
if (localStorage.getItem("TOKEN") != null) {
  // web
  const user = JSON.parse(localStorage.getItem("USER"));
  document.querySelector(".form-account p").innerHTML = `${user.name}`;
  document.querySelector(".form-sign").classList.add("hidden");

  const account = document.querySelector(".form-account");
  account.classList.remove("hidden");
  account.classList.add("flex");
  // mobile
  document.querySelector(
    ".mobile-account .user-name"
  ).innerHTML = `${user.name}`;
  document.querySelector(".mobile-sign").classList.add("hidden");

  document.querySelector(".mobile-account").classList.remove("hidden");
}
let listItem = new ListItem();
let newListItem = [];
fetch("https://nike-sever-vtcoder.glitch.me/product")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      listItem.addItem(item);
    });
    return listItem;
  })
  .then((_listItem) => {
    const url = document.URL;
    let pageNum = 0;
    if (url.indexOf("?") >= 0) {
      const filterInfo = handleURL(url);
      _listItem = _listItem.findListItemByInfo(filterInfo);
      pageNum = Math.ceil(_listItem.length / 30);
      newListItem = convertList(_listItem, pageNum, 30);
    } else {
      pageNum = Math.ceil(_listItem.arr.length / 30);
      newListItem = convertList(_listItem.arr, pageNum, 30);
      _listItem = _listItem.arr;
    }
    if (newListItem.length > 0) {
      renderListItem(newListItem[0]);
      setPage(pageNum);
    } else {
      document.querySelector(
        ".emty-item"
      ).innerHTML = `We could not find anything for "${handleURL(url).value}"`;
      document.querySelector(".emty-item").classList.remove("hidden");
    }

    return _listItem;
  })
  .then((listSort) => {
    document.querySelector(".low-to-high").addEventListener("click", () => {
      let temp_list = new ListItem();
      temp_list.replaceList(listSort);
      temp_list.sortLowToHighPrice();
      console.log(temp_list.arr);
      let pageNum = Math.ceil(temp_list.arr.length / 30);
      newListItem = convertList(temp_list.arr, pageNum, 30);
      renderListItem(newListItem[0]);
      setPage(pageNum);
    });
    document.querySelector(".high-to-low").addEventListener("click", () => {
      let temp_list = new ListItem();
      temp_list.replaceList(listSort);
      temp_list.sortHighToLowPrice();
      console.log(temp_list.arr);
      let pageNum = Math.ceil(temp_list.arr.length / 30);
      newListItem = convertList(temp_list.arr, pageNum, 30);
      renderListItem(newListItem[0]);
      setPage(pageNum);
    });
  });
// handle url
function handleURL(url) {
  var temp = url.substring(url.lastIndexOf("?") + 1);
  temp = temp.replace(/%20/g, " ");
  var info = {
    key: temp.substring(0, temp.lastIndexOf("=")),
    value: temp.substring(temp.lastIndexOf("=") + 1),
  };
  return info;
}

//RENDER

function renderItem(item) {
  const contentDiv = document.querySelector(".content");
  const itemDiv = document.createElement("a");
  itemDiv.classList.add("item");
  itemDiv.href = `/public/item/item.html?${item._id}`;
  itemDiv.setAttribute("id", `${item._id}`);
  itemDiv.innerHTML = `
      <div class="">
          <img class="h-[280px] w-[280px]" src="${item.img}"
              alt="">
      </div>
      <div class="">
          <h1>${item.name}</h1>
          <p class='text-[#757575] text-[14px]' >${item.message}</p>
          <p class='mt-1'>${item.color} Color</p>
          <p class="mt-4" >${numToPrice(item.price)}đ</p>
      </div>
    `;
  contentDiv.appendChild(itemDiv);
}
function renderListItem(list) {
  console.log(newListItem);
  document.querySelector(".content").innerHTML = "";
  list.forEach((item) => {
    renderItem(item);
  });
}
//Number to  Price
function numToPrice(num) {
  let str = String(num);
  let len = str.length;
  if (len < 3) return str;
  else if (len < 7) {
    str = str.slice(0, -3) + "," + str.slice(-3);
    return str;
  } else {
    str = str.slice(0, -6) + "," + str.slice(-6, -3) + "," + str.slice(-3);
    return str;
  }
}

// Convert List
function convertList(list, num, numItems) {
  let new_list = [];
  for (let i = 0; i < num; i++) {
    let arr = [];
    new_list.push(arr);
  }
  list.forEach((item, index) => {
    for (let i = 0; i < num; i++) {
      if (index < numItems * (i + 1)) {
        new_list[i].push(item);
        break;
      }
    }
  });
  return new_list;
}

// Set Page
function setPage(pageNum) {
  const pageNumDiv = document.querySelector(".page-num");
  let content = "";
  for (let i = 1; i < pageNum + 1; i++) {
    content += `
    <div class="page w-[30px] h-[30px] border flex justify-center items-center mx-2 p-1 cursor-pointer" id = 'page-num-${i}' onclick = "numPageClick(${i})">${i}</div>
    `;
  }
  pageNumDiv.innerHTML = content;
  document.getElementById("page-num-1").classList.add("primary-page");
}

// Click Num Page
function numPageClick(id) {
  const page = document.querySelectorAll(".page");
  page.forEach((divItem) => {
    divItem.classList.remove("primary-page");
  });
  document.getElementById(`page-num-${id}`).classList.add("primary-page");
  renderListItem(newListItem[id - 1]);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// SEARCH
function searchItem() {
  const keyword = document.querySelector(".header-search input").value;
  if (keyword != "") location.href = `./items.html?keyword=${keyword}`;
}

// Sign OUT
function signOut() {
  localStorage.removeItem("TOKEN");
  localStorage.removeItem("USER");
  location.href = "../index.html";
}
function checkCart() {
  const cartNotify = document.querySelector(".cart-notify");
  if (localStorage.getItem("SHOE_CART") != null) {
    if (localStorage.getItem("SHOE_CART").length > 2) {
      cartNotify.classList.remove("hidden");
    } else {
      cartNotify.classList.add("hidden");
    }
  }
}
