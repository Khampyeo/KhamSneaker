function checkValidateSignUp() {
    let sum = checkEmail() + checkPass() + checkName() + checkDob() + checkGender() + checkTerm()
    if (sum == 6) {
        return 1;
    }
    else {
        return 0;
    }
}

function checkValidateSignIn() {
    let sum = checkEmail() + checkPass() + checkName() + checkDob() + checkGender() + checkTerm()
    if (sum == 6) {
        return 1;
    }
    else {
        return 0;
    }
}


function checkEmail() {
    const email = document.querySelector('.sign-up-form .email input').value;
    const tb = document.querySelector('.valid-email')
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email == '') {
        tb.style.display = 'block';
        tb.innerHTML = 'Không được để trống';
        return 0;
    }
    else if (regex.test(email) == false) {
        tb.style.display = 'block';
        tb.innerHTML = 'Email không hợp lệ';
        return 0;
    }
    else {
        tb.style.display = 'none';
        return 1;
    }
}
function checkPass() {
    const password = document.querySelector('.sign-up-form .pass input').value;
    const tb = document.querySelector('.valid-pass');
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (password == '') {
        tb.style.display = 'block';
        tb.innerHTML = 'Không được để trống';
        return 0;
    }
    else if (regex.test(password) == false) {
        tb.style.display = 'block';
        tb.innerHTML = 'Mật khẩu phái chứa ít nhất 1 ký tự hoặc số, độ dài tối thiểu 8 ký tự';
        return 0;
    }
    else {
        tb.style.display = 'none';
        return 1;
    }
}
function checkName() {
    const name = document.querySelector('.sign-up-form .name input').value;
    const tb = document.querySelector('.valid-name');
    if (name == '') {
        tb.style.display = 'block';
        tb.innerHTML = 'Không được để trống';
        return 0;
    }
    else {
        tb.style.display = 'none';
        return 1;
    }
}
function checkDob() {
    const dob = document.querySelector('.sign-up-form .dob input').value;
    const tb = document.querySelector('.valid-dob');
    if (dob == '') {
        tb.style.display = 'block';
        tb.innerHTML = 'Không được để trống';
        return 0;
    }
    else {
        tb.style.display = 'none';
        return 1;
    }
}
function checkGender() {
    let gender = [false, false]
    gender[0] = document.querySelectorAll('.sign-up-form .gender input')[0].checked;
    gender[1] = document.querySelectorAll('.sign-up-form .gender input')[1].checked;
    const tb = document.querySelector('.valid-gender');
    if (gender[0] == false && gender[1] == false) {
        tb.style.display = 'block';
        tb.innerHTML = 'Bạn chưa chọn giới tính';
        return 0;
    }
    else {
        tb.style.display = 'none';
        return 1;
    }
}
function checkTerm() {
    const term = document.querySelector('.sign-up-form .term input').checked;
    const tb = document.querySelector('.valid-term');
    if (term == false) {
        tb.style.display = 'block';
        tb.innerHTML = 'Bạn phải xác nhận';
        return 0;
    }
    else {
        tb.style.display = 'none';
        return 1;
    }
}







