export class AboutPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        await this.render();
    }

    async render() {
        this.root.innerHTML = "";

        const template = document.getElementById("about-template");
        const content = template.content.cloneNode(true);

        const style = document.createElement("style");
        const request = await fetch("/blocks/about/about.css");
        style.textContent = await request.text();

        this.root.appendChild(style);
        this.root.appendChild(content);
    }
}

customElements.define("about-page", AboutPage);