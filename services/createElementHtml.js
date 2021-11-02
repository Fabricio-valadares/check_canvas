class CreateElements {
    static createInput(count, itemAdmin) {
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", `${count++}`);
        input.style.order = "-1"
        input.style.marginRight = "5px"
        input.classList.add("checkbox");
        itemAdmin.appendChild(input);
    }
}