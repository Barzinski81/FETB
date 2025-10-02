function toggle() {

    let paragraph = document.getElementById("extra");
    let button = document.getElementsByClassName("button")[0];

    if (button.textContent === "More") {

        paragraph.style.display = "block";
        button.textContent = "Less";
        
    } else {

        paragraph.style.display = "none";
        button.textContent = "More";

    }
}