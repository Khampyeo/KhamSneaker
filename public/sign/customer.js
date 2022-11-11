function Customer (_name,_email,_password,_gender,_dob){
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.gender = _gender;
    this.age = new Date().getFullYear() - _dob.getFullYear();
    this.token = ''
    this.setToken = (_token)=>{
        this.token = _token;
    }
}

