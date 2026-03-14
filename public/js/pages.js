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