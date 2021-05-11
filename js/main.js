(function($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function() {
        $(this).on('blur', function() {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            } else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function() {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function() {
        $(this).focus(function() {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }



})(jQuery);

var signUpName = document.getElementById('Name')
var signUpEmail = document.getElementById('nemail')
var signUpPass = document.getElementById('npass')
var loginEmail = document.getElementById('email');
var loginPass = document.getElementById('pass');
var signup = document.getElementById('signup')
var login = document.getElementById('login')
var logout = document.getElementById('logout')
var thename = document.getElementById('thename')
var db = []

if (logout != null) {

    logout.addEventListener('click', function() {
        open("index.html", "_self");
    })
}

if (login != null) {
    login.addEventListener("click", function() {
        checkStorage()
        var errorMessage = validateInputRegEx()
        if (errorMessage = " ") {
            loginWith(loginEmail.value, loginPass.value)
        } else {
            alert(errorMessage)
        }
    })

}

if (signup != null) {
    signup.addEventListener('click', function() {
        checkStorage()
        signUpName = signUpName.value
        signUpEmail = signUpEmail.value
        signUpPass = signUpPass.value
        if (existed(signUpEmail)) {
            alert('you have registed with this email before')
            return;
        }
        if (validateEmail(signUpEmail) && validatePass(signUpPass)) {
            var profile = {
                name: signUpName,
                email: signUpEmail,
                pass: signUpPass,
                validate: 0
            }
            db.push(profile)
            localStorage.setItem('profile', JSON.stringify(db))
            open("index.html", "_self");
        } else {
            if (!validateEmail(signUpEmail)) {
                alert("plaese enter validate email");
            } else {
                alert("plaese enter validate password");
            }
        }
    })
}

if (thename != null) {
    db = JSON.parse(localStorage.getItem('profile'))
    for (var index = 0; index < db.length; index++) {
        if (db[index].validate == 1)
            thename.innerHTML = db[index].name
    }
}

function loginWith(email, pass) {
    isUserExist(email, pass) ? open("home.html", "_self") : alert("email or password not correct")
}

function isUserExist(email, pass) {
    db = JSON.parse(localStorage.getItem('profile'))
    for (var index = 0; index < db.length; index++) {
        if (db[index].email == email && db[index].pass == pass) {
            db[index].validate = 1
            localStorage.setItem('profile', JSON.stringify(db))
            return true
        }
    }
    return false
}

function validateInputRegEx() {
    if (!validateEmail(email)) {
        return "plaese enter validate email"
    } else if (!validatePass(pass))
        return "plaese enter validate password"
    else {
        return " ";
    }
}

function checkStorage() {
    if (localStorage.getItem("profile") === null) {
        db = []
        localStorage.setItem('profile', JSON.stringify(db))
    }
}

function existed(Email) {
    db = JSON.parse(localStorage.getItem('profile'))
    for (var index = 0; index < db.length; index++) {
        if (db[index].email == Email) {
            return true;
        }
    }
    return false;
}

function clear() {
    document.getElementById('Name').value = ""
    document.getElementById('nemail').value = ""
    document.getElementById('npass').value = ""
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePass(pass) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(String(pass));
}