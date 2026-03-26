//participa de gp.js / index.html
import { fncs } from "./function.js";

const openButton = fncs.$$(".openModal");
const closeButtons = fncs.$$(".closeModal");

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

const input = fncs.$("#asset-search");
const list = fncs.$("#options-list");
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


const botao = fncs.$(".send-assets");
const divContentSelected = fncs.$(".inside-modal-content-selected-assets");

function addSelectedAssets() {
    const div = document.createElement("div");
    div.className = "selected-assets-content";
    const img = document.createElement("img");
    img.src = "/image/company logos/WEGE3.png";
    img.alt = "wege3";
    img.className = "selected-assets-logo";
    const span = document.createElement("span");
    span.className = "selected-assets-span";
    span.textContent = "WEGE3";
    div.appendChild(img);
    div.appendChild(span);
    return div;
}

fncs.click(botao, () => {
    botao.classList.add("active-green");
    divContentSelected.appendChild(addSelectedAssets());
    setTimeout(() => {
        botao.classList.remove("active-green");
    }, 500);
});
