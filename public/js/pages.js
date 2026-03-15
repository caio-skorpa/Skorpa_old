//participa de gp.js / index.html
import { fncs } from "./function.js";
const f = new fncs();

const openButton = f.$$(".openModal");
const closeButtons = f.$$(".closeModal");

openButton.forEach(e => {
    e.addEventListener("click", () => {
        const modalId = e.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        modal.showModal();
    });
});

closeButtons.forEach(e => {
    e.addEventListener("click", () => {
        const modalId = e.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        modal.close();
    });
});




const input = document.querySelector("#asset-search");
const list = document.querySelector("#options-list");
const options = list.querySelectorAll("li");

input.addEventListener("input", () => {

    const value = input.value.toLowerCase();

    if (value === "") {
        list.style.display = "none";
        return;
    }

    let visible = false;

    options.forEach(option => {

        const text = option.textContent.toLowerCase();

        option.style.display = "block";

        if (!text.includes(value)) {
            option.style.display = "none";
        } else {
            visible = true;
        }

    });

    list.style.display = visible ? "block" : "none";
});

options.forEach(option => {
    option.addEventListener("click", () => {

        input.value = option.textContent; // coloca no input
        list.style.display = "none"; // fecha a lista

    });
});