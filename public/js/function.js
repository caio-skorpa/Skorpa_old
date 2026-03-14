class fncs {
    constructor(parameters) {

    }
    $(selector) {
        return document.querySelector(selector);
    }
    $$(selector) {
        return document.querySelectorAll(selector);
    }
}

export { fncs };