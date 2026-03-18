const range = document.querySelectorAll(".variacaoItem")
const icon = document.querySelectorAll(".variacaoItemIcon")

range.forEach(el => {
    const value = parseFloat(el.innerText.replace(',', '.'));
    el.style.color = value > 0 ? "rgb(26, 190, 20)" : "rgb(212, 14, 14)"
});

for (let i = 0; i < range.length; i++) {
    const value = range[i].innerText.replace(",", ".").replace("%", "")
    if (value > 0) {
        icon[i].innerText = "↗"
        icon[i].style.color = "rgb(26, 190, 20)"
    } else {
        icon[i].innerText = "↘"
        icon[i].style.color = "rgb(212, 14, 14)"
    }
}