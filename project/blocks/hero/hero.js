export class HeroSection extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section class="hero">
            <h1 class="hero__title">Estudiante de Ingeniería de Software</h1>
            <p class="hero__subtitle">Ubicación: Santa Cruz de la Sierra, Bolivia</p>

            <div class="hero__card">
                <div class="hero__text">
                    <p>Mi nombre es Diego Heredia, estudiante de 3 año de ingenieria de software.</p>
                    <p>Me gusta aprender cosas nueva, siempre dispuesto a ayudar y curioso con el por que de las cosas.</p>
                    <p>Mis hobbies son jugar video juegos, leer libros y novelas ligeras, y desarrollar video juegos.</p>
                </div>
                <div class="hero__image">
                    <img src="https://shorturl.at/Nxwrh" alt="Mudkip-Foto-Mia">
                </div>
            </div>

            <nav class="hero__buttons">
                <a href="/projects">Project</a>
                <a href="/articles">Articles</a>
                <a href="/about">About Me</a>
                <a href="/contact">Contact Me</a>
            </nav>
        </section>
        `;
    }
}

customElements.define("hero-section", HeroSection);