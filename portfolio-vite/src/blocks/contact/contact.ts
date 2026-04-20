export class ContactPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open"});
    }
    
    async connectedCallback() {
        await this.render();
    }

    async render() {
        const template = document.getElementById("contact-template");
        const content = template.content.cloneNode(true);

        const style = document.createElement("style");
        const contactCSS = await fetch("/blocks/contact/contact.css");
        
        style.textContent = await contactCSS.text();

        this.root.appendChild(style);
        this.root.appendChild(content)
    }
}

customElements.define("contact-page", ContactPage);