export class ContactPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section class="contact-me" id="contact-me">
            <h2 class="contact-me__title">Contáctame</h2>

            <div class="contact-me__container">
                <div class="contact-me__form">

                    <h3 class="contact-me__form-title">Envíame un mensaje</h3>

                    <form class="contact-me__form-body">
                        <input class="contact-me__input" type="text" placeholder="Nombre completo" required>
                        <input class="contact-me__input" type="email" placeholder="Correo electrónico" required>
                        <textarea class="contact-me__textarea" placeholder="Mensaje" rows="4" required></textarea>
                        <input class="contact-me__input" type="text" placeholder="Número de teléfono (opcional)">

                        <button class="contact-me__button" type="submit">Enviar</button>
                    </form>
                </div>

                <div class="contact-me__info">
                    <p>
                        <strong>LinkedIn:</strong><br>
                        https://linkedin.com/in/diego-andres-heredia-ticona-79b11a337/
                    </p>
                    <p>
                        <strong>Github:</strong><br>
                        https://github.com/diego-heredia-dev
                    </p>
                    <p>
                        <strong>Instagram</strong><br>
                        diego_hka
                    </p>
                </div>
            </div>
        </section>
        `;
    }
}

customElements.define("contact-page", ContactPage);