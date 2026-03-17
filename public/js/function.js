const fncs = {
    $(selector) {
        return document.querySelector(selector);
    },
    $$(selector) {
        return document.querySelectorAll(selector);
    },
    click(element, action) {
        element.addEventListener("click", () => {
            action()
        });
    }
}


export { fncs };