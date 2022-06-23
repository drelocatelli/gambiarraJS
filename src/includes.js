function createComponent(name) {
    document.querySelector(name).append(document.createElement(`x-${name.toLowerCase()}`))
}

function defineComponent(component) {
    component.map(item => {
        createComponent(item);

        var Element = JSON.parse(JSON.stringify(item));
        Element = function () {
            return Reflect.construct(HTMLElement, [], Element)
        }
        Element.prototype = Object.create(HTMLElement.prototype)

        Element.prototype.connectedCallback = function () {
            this.innerHTML = eval(item)();
        }


        customElements.define(`x-${item.toLowerCase()}`, Element);
    })

}