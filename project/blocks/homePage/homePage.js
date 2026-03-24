import { HeroPage } from "../hero/hero.js";

export class HomePage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <hero-page></hero-page>
        `;
    }
}

customElements.define("home-page", HomePage);