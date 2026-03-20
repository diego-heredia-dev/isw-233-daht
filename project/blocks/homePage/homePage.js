import { HeroSection } from "../hero/hero.js";
import { ProjectsPage } from "../projects/projects.js";

export class HomePage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <hero-section></hero-section>
        `;
    }
}

customElements.define("home-page", HomePage);