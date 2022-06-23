function createComponent(name) {
    document.querySelector(`Component[name=${name}]`).prepend(document.createElement(`x-${name.toLowerCase()}`))
}

defineComponents();
window.onload = () => {
    insertAxios();
    const components = Array.from(document.querySelectorAll('Component'));
    components.map(item => {
        const name = item.getAttribute('name')
        
        createComponent(name);
    
        var Element = JSON.parse(JSON.stringify(name));
        Element = function () {
            return Reflect.construct(HTMLElement, [], Element)
        }
        Element.prototype = Object.create(HTMLElement.prototype)
    
        Element.prototype.connectedCallback = function () {
            this.innerHTML = eval(name)();
        }
    
    
        customElements.define(`x-${name.toLowerCase()}`, Element);
    })
}

function defineComponents() {
    const imports = document.createElement('script');
    imports.src = 'src/components.js'
    document.head.prepend(imports);
}


function insertAxios() {
    // insert axios
    const axios = document.createElement('script');
    axios.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
    document.head.prepend(axios);
}
