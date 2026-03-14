import { fncs } from "./function.js";
const f = new fncs();

const openButton = f.$$("#openModal");
openButton.forEach(e => {
    e.addEventListener("click", () => {
        const modalId = e.getAttribute("data-modal")
        const modal = document.getElementById(modalId)
        modal.showModal()
    })
})

const closeButtons = $$("#closeModal");

closeButtons.forEach(e => {
    e.addEventListener("click", () => {
        const modalId = e.getAttribute("data-modal")
        const modal = document.getElementById(modalId)
        modal.close()
    })
})