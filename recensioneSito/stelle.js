const labels = document.querySelectorAll(".star-rating label");
    labels.forEach(label => {
        label.addEventListener("click", () => {
            labels.forEach(l => l.classList.remove("checked"));
            label.classList.add("checked");
        });
});