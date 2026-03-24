export class ProjectsPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        await this.render();
    }

    async render() {
        this.root.innerHTML = "";

        const template = document.getElementById("projects-template");
        const content = template.content.cloneNode(true);

        const style = document.createElement("style");
        const projectsCSS = await fetch("/blocks/projects/projects.css");
        const cardCSS = await fetch("/blocks/card/card.css");

        style.textContent = await projectsCSS.text() + await cardCSS.text();

        this.root.appendChild(style);
        this.root.appendChild(content);
    }
}

customElements.define("projects-page", ProjectsPage);