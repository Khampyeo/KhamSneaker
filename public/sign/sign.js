checkCart();
if (localStorage.getItem("TOKEN") != null) {
  location.href = "../index.html";
}

let url = document.URL;
let id = url.substring(url.lastIndexOf("?") + 1);
changeForm(id);

// SEARCH
function searchItem() {
  const keyword = document.querySelector(".header-search input").value;
  console.log(keyword);
  if (keyword != "")
    location.href = `../list-item/items.html?keyword=${keyword}`;
}
// SIGNIN

function signIn() {
  let account = {
    email: document.querySelector(".sign-in-form .user input").value,
    password: document.querySelector(".sign-in-form .pass input").value,
  };
  LOGIN_Customer(account);
}

function LOGIN_Customer(_account) {
  let account = {
    email: _account.email,
    password: _account.password,
  };
  fetch("https://nike-sever-vtcoder.glitch.me/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  })
    .then((res) => {
      if ((res.status > 199) & (res.status < 300)) {
        return res.json();
      } else {
        document.querySelector(".fail-login-noti").classList.remove("hidden");
      }
    })
    .then((res) => {
      if (typeof res !== "undefined") {
        let token = res.token;
        let user = res.user;
        console.log(user);
        localStorage.setItem("TOKEN", JSON.stringify(token));
        localStorage.setItem("USER", JSON.stringify(user));
        if (localStorage.getItem("SHOE_CART") != null) {
          localStorage.removeItem("SHOE_CART");
        }
        location.href = "../index.html";
      }
    })
    .catch((err) => console.log(err));
}
//

//
// SignUp

function signUp() {
  let check = checkValidateSignUp();
  if (check == true) {
    let _name = document.querySelector(".sign-up-form .name input").value;
    let _email = document.querySelector(".sign-up-form .email input").value;
    let _password = document.querySelector(".sign-up-form .pass input").value;
    let _gender = document.querySelector(
      '.sign-up-form .gender input[name="gender"]:checked'
    ).value;
    let _dob = new Date(
      document.querySelector(".sign-up-form .dob input").value
    );
    let new_customer = new Customer(_name, _email, _password, _gender, _dob);
    console.log(new_customer);
    CREATE_Customer(new_customer);
  }
}

// SIGN IN PUT API
function CREATE_Customer(_customer) {
  let customer = {
    name: _customer.name,
    email: _customer.email,
    password: _customer.password,
    age: _customer.age,
    userType: "user",
  };
  console.log(customer);
  fetch("https://nike-sever-vtcoder.glitch.me/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  })
    .then((res) => {
      console.log(res.status);
      if (res.status > 199 && res.status < 300) {
        alert("Sign up success!");
        location.href = "./sign.html?1";
      } else {
        alert("Fail!");
      }
    })
    .catch((err) => console.log(err));
}
//
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
