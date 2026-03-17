import { fncs } from "./function.js";

const openButton = fncs.$$("#openModal");
openButton.forEach(e => {
    e.addEventListener("click", () => {
        const modalId = e.getAttribute("data-modal")
        const modal = document.getElementById(modalId)
        modal.showModal()
    })
})

const closeButtons = fncs.$$("#closeModal");

closeButtons.forEach(e => {
    e.addEventListener("click", () => {
        const modalId = e.getAttribute("data-modal")
        const modal = document.getElementById(modalId)
        modal.close()
    })
})