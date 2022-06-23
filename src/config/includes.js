function createComponent(name) {
    const findDocument = document.querySelector(`Component[name=${name}]`)
    const newDocument = document.createElement(`x-${name.toLowerCase()}`);
    findDocument.prepend(newDocument);
}

defineComponents();
insertAxios();
window.onload = () => {
    defineTitle();
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
            this.innerHTML = `<div style='display: ${item.getAttribute('block') != null ? 'block' : 'inline'}'>${eval(name)()}</div>`;
        }
    
    
        customElements.define(`x-${name.toLowerCase()}`, Element);
    })
}

function defineTitle() {
    const titleRegex = new RegExp('#.*');
    const title = document.body.innerHTML.match(titleRegex)[0]
    document.title = title.replace('#', '');
    document.body.innerHTML = document.body.innerHTML.replace(title, '')
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
