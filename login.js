// --------- SIMPLE LOGIN (USERNAME ONLY) ---------

function login() {
    const user = document.getElementById("username").value.trim();

    if (user === "") {
        alert("Please enter a username.");
        return;
    }

    // Save username
    localStorage.setItem("loggedInUser", user);

    alert("Welcome, " + user + "!");

    // Redirect to home page
    window.location.href = "../index.html";
}
