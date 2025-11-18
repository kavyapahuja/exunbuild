const img = document.getElementById("newsImage");
const body = document.getElementById("bnBody");
const btn = document.getElementById("nextBtn");

let step = 1;

body.classList.add("bn1"); // first background

btn.addEventListener("click", () => {

    // STEP 1 → switch to BN2
    if (step === 1) {
        img.src = "images/bn2.png";  
        body.classList.remove("bn1");
        body.classList.add("bn2");
        step = 2;
        return;
    }

    // STEP 2 → open buy-product.html
    if (step === 2) {
        window.location.href = "../buy-product/buy-product.html";
    }

});
