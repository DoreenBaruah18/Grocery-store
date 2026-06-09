let total = 0;
let items = [];

/* Hide all pages */

function hideAllPages() {
    document.getElementById("registerBox").style.display = "none";
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("homePage").style.display = "none";
    document.getElementById("cartPage").style.display = "none";
    document.getElementById("addressPage").style.display = "none";
    document.getElementById("paymentPage").style.display = "none";
    document.getElementById("successPage").style.display = "none";
}

/* Show Register */

function showRegister() {
    hideAllPages();
    document.getElementById("registerBox").style.display = "block";
}

/* Show Login */

function showLogin() {
    hideAllPages();
    document.getElementById("loginBox").style.display = "block";
}

/* Register */

function registerUser() {
    let name = document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    if(name === "" || email === "" || password === "") {
        alert("Please Fill All Details");
    }
    else {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        alert("Registration Successful");
        showLogin();
    }
}

/* Login */

function loginUser() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let storedEmail = localStorage.getItem("email");
    let storedPassword = localStorage.getItem("password");

    if(email === storedEmail && password === storedPassword) {
        alert("Login Successful");
        showHome();
    }
    else {
        alert("Invalid Email or Password");
    }
}

/* Show Home */

function showHome() {
    hideAllPages();
    document.getElementById("homePage").style.display = "block";
}

/* Show Products */

function showProducts() {
    document.getElementById("products").scrollIntoView();
}

/* Search Product */

function searchProduct() {
    let input = document.getElementById("searchInput").value.toLowerCase();

    let products = document.querySelectorAll(".product");

    products.forEach(function(product) {
        let name = product.getAttribute("data-name").toLowerCase();

        if(name.includes(input)) {
            product.style.display = "block";
        }
        else {
            product.style.display = "none";
        }
    });
}
/* category */
function filterCategory(category) {
    let products = document.querySelectorAll(".product");

    products.forEach(function(product) {
        let type = product.getAttribute("data-category");

        if (category === "all") {
            product.style.display = "block";
        } 
        else if (type === category) {
            product.style.display = "block";
        } 
        else {
            product.style.display = "none";
        }
    });
}

/* Buy Product */

function buyProduct(name, price) {
    items.push(name);
    total = total + price;

    document.getElementById("cartItems").innerHTML = items.join(", ");
    document.getElementById("total").innerHTML = "Total: Rs " + total;

    alert(name + " Added To Cart");
}

/* Cart Page */

function showCartPage() {
    hideAllPages();
    document.getElementById("cartPage").style.display = "block";
}

/* Address Page */

function goToAddress() {
    if(total === 0) {
        alert("Please Add Product First");
    }
    else {
        showAddressPage();
    }
}

function showAddressPage() {
    hideAllPages();
    document.getElementById("addressPage").style.display = "block";
}

/* Payment Page */

function goToPayment() {
    let fullName = document.getElementById("fullName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let phone = document.getElementById("phone").value;

    if(fullName === "" || address === "" || city === "" || phone === "") {
        alert("Please Fill Delivery Address");
    }
    else {
        hideAllPages();
        document.getElementById("paymentPage").style.display = "block";
    }
}

/* Payment */

function makePayment() {
    let fullName = document.getElementById("fullName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let phone = document.getElementById("phone").value;

    let cardName = document.getElementById("cardName").value;
    let cardNumber = document.getElementById("cardNumber").value;
    let expiry = document.getElementById("expiry").value;
    let cvv = document.getElementById("cvv").value;

    if(cardName === "" || cardNumber === "" || expiry === "" || cvv === "") {
        alert("Please Fill Payment Details");
    }
    else {
        hideAllPages();

        document.getElementById("successPage").style.display = "block";

        document.getElementById("successMessage").innerHTML =
        "Customer: " + fullName + "<br>" +
        "Address: " + address + ", " + city + "<br>" +
        "Phone: " + phone + "<br>" +
        "Products: " + items.join(", ") + "<br>" +
        "Total Amount: Rs " + total;

        items = [];
        total = 0;

        document.getElementById("cartItems").innerHTML = "No Product Ordered";
        document.getElementById("total").innerHTML = "Total: Rs 0";
    }
}
