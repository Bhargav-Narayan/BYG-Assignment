// Handle signup click event. 
$('#submitSignup').on('click', function() {
    var email = $('#signupEmail').val();
    var password = $('#signupPassword').val();
    var user_name = $('#signupName').val();
    var signupData = {}

    // Validation on signup fields
    if (email && password && user_name) {
        if (validateEmail(email)) {
            signupData.email = email
        } else {
            alert("Please enter a valid email ID")
        }

        if (validateFullName(user_name)) {
            signupData.user_name = user_name
        } else {
            alert("Please enter a valid user_name. Contains only alphabets and space")
        }

        signupData.password = password;
    } else {
        alert("Please enter values in all the fields")
    }

    // if all fields are validated then handle signup logic
    if (signupData.email && signupData.password && signupData.user_name) {
        $.ajax({
            type: 'POST',
            url: '/login/handle_signup',
            data: signupData,
            async: true,
            success: function(data) {
                if (data && data === "Email Exists") {
                    console.log(data)
                    alert("Email already exists. Pls login to your profile")
                } else {
                    // alert("Successfully signed up")
                    document.location.href = "/dashboard/showcase" // Redirect to dashboard once signed up
                }
            },
            error: function(errData) {
                console.log(errData)
                alert("Something went wrong")
            }
        })
    } else {
        console.log("Something is missing in data")
    }

})

// Functio to validate email address
function validateEmail(email) {
    var emailValidate = new RegExp(/^[a-z0-9_\-\.]{2,}@[a-z0-9_\-\.]{2,}\.[a-z]{2,}$/i) // Regular Expression to validate email address
    if (emailValidate.test(email)) {
        return true;
    } else {
        return false;
    }
}

// Function to validate User name
function validateFullName(user_name) {
    var fullNameRegExp = new RegExp(/^[A-Za-z ]{1,30}$/); // Regular expression to validate user name
    if (fullNameRegExp.test(user_name)) {
        return true;
    } else {
        return false;
    }
}

// Handle back button in signup page.
// Redirect to login page if login button is clicked.
$('#backToLogin').on('click', function() {
    document.location.href = "/";
})

// Handle Login click event.
$('#submitLogin').on('click', function() {
    var email = $('#loginEmail').val();
    var password = $('#loginPassword').val();
    var loginData = {};
    // Validation on login fields
    if (email && password) {
        if (validateEmail(email)) {
            loginData.email = email;
        } else {
            alert("please enter a valid email")
        }
        loginData.password = password;
    } else {
        alert("Please enter email and password")
    }

    // If all fields are validated then handle Login logic
    if (loginData.email && loginData.password) {
        $.ajax({
            type: 'POST',
            url: '/login/handle_login',
            data: loginData,
            async: true,
            success: function(data) {
                console.log(data);
                if (data != "") {
                    document.location.href = "/dashboard/showcase" // Redirect to dashboard on successfull logic.
                } else if (data == "") {
                    $('#loginMsg').text("Email or password mismatch.") // Show login credential mismatch message.
                    $('#loginMsg').css('display', 'block')
                }
            },
            error: function(errObj) {
                alert("Something went wrong while fetching loginData")
            }
        })
    }

})
