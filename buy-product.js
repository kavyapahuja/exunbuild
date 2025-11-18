// ADD TO CART FUNCTIONALITY
document.addEventListener("DOMContentLoaded", () => {
    const addButtons = document.querySelectorAll(".add-btn");

    addButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const name = btn.dataset.name;
            const price = parseInt(btn.dataset.price);

            // Get image from the same product card
            const card = btn.closest(".product-card");
            const image = card.querySelector(".product-img").src;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Check if item exists in cart
            const existing = cart.find(item => item.name === name);
            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({ name, price, qty: 1, image }); // include image
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(name + " added to cart!");
        });
    });

    // SHRINK DEMO
    const slider = document.getElementById("shrinkSlider");
    const demoImg = document.getElementById("demoImg");

    if (slider && demoImg) {
        slider.addEventListener("input", () => {
            const scaleValue = slider.value / 100;
            demoImg.style.transform = `scale(${scaleValue})`;
        });
    }
});
