export class ProjectsPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section class="projects" id="projects">
            <h2 class="projects__title">Mis proyectos</h2>

            <div class="projects__container">

                <a href="https://github.com/diego-heredia-dev/DB2-TiendaManga"
                target="_blank"
                class="card card--project">
                    <div class="card__image">
                        <img src="https://shorturl.at/oTaQq" alt="Mangas">
                    </div>

                    <div class="card__content">
                        <p class="card__date">11 de abril de 2025</p>
                        <h3 class="card__title">Tienda de mangas (cómics japoneses)</h3>
                        <p class="card__description">
                            Una app para la gestión de una tienda de mangas, hecha con Tkinter y MS SQL Server.
                            Un CRUD para los mangas, además de la separación de roles y métricas.
                        </p>
                    </div>
                </a>

                <a href="https://github.com/diego-heredia-dev/Examen-Final-Programacion-II"
                target="_blank"
                class="card card--project">
                    <div class="card__image">
                        <img src="https://shorturl.at/TdrhQ" alt="biblioteca">
                    </div>

                    <div class="card__content">
                        <p class="card__date">21 de junio de 2025</p>
                        <h3 class="card__title">Reserva de libros para un biblioteca</h3>
                        <p class="card__description">
                            Una app que permite al usuario buscar y reservar libros.
                            El frontend fue hecho con Angular y el backend con .NET; para la base de datos se usó MS SQL Server.
                        </p>
                    </div>
                </a>

                <a href="https://github.com/linuxenthusiastic/Reserva-Estacionamiento"
                target="_blank"
                class="card card--project">
                    <div class="card__image">
                        <img src="https://shorturl.at/Awsxw" alt="Estacinamientos">
                    </div>
                    <div class="card__content">
                        <p class="card__date">17 de diciembre de 2025</p>
                        <h3 class="card__title">Reserva de estacionamientos</h3>
                        <p class="card__description">
                            Una app web donde el usuario puede reservar espacios de diferente tipo y para diferentes tipos de vehículos. 
                            También se implementó un CRUD para los roles con mayor control. Frontend: React, Backend: Spring Boot.
                        </p>
                    </div>
                </a>
            </div>
        </section>
        `;
    }
}

customElements.define("projects-page", ProjectsPage);