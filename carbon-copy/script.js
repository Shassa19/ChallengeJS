document.addEventListener("DOMContentLoaded", function () {
    const gallerySection = document.getElementById("images");

    gallerySection.addEventListener("click", function () {
        gallerySection.classList.toggle("row-reverse");
    });
});