export class AboutPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section class="about-me" id="about-me">
            <h2 class="about-me__title">Sobre Mí</h2>

            <div class="about-me__container">
                <div class="about-me__box">
                    <h3 class="about-me__box-title">Perfil Profesional</h3>
                    <p class="about-me__box-content">
                        Estudiante de Ingeniería de Software con interés en el desarrollo de aplicaciones y resolución de problemas mediante programación.
                        He trabajado en proyectos académicos utilizando C++, C#, Java, JavaScript y SQL.
                        Motivado por aprender buenas prácticas y fortalecer mis habilidades técnicas y de criterio.
                    </p>
                </div>
            
                <div class="about-me__box">
                    <h3 class="about-me__box-title">Educación</h3>
                    <p class="about-me__box-content">
                        Ingeniería de Software, UCB (Universidad Católica Boliviana) de Santa Cruz, 2024 - Actualidad
                    </p>
                </div>

                <div class="about-me__box">
                    <h3 class="about-me__box-title">Experiencia</h3>
                    <p class="about-me__box-content">
                        Proyectos académicos:
                        - Desarrollo de aplicaciones pequeñas como parte de cursos universitarios.
                        - Implementación de lógica de negocio en C# y Java.
                        - Uso de base de datos SQL para almacenamiento y consulta.
                    </p>
                </div>

                <div class="about-me__box">
                    <h3 class="about-me__box-title">Skills</h3>
                    <p class="about-me__box-content">
                        FrontEnd: Angular
                        BackEnd: .NET y Spring Boot
                        Base de datos MS SQL Server
                    </p>
                </div>

                <div class="about-me__box">
                    <h3 class="about-me__box-title">Hobbies</h3>
                    <p class="about-me__box-content">
                        Leer novelas ligeras y libros, jugar videojuegos, desarrollar videojuegos y ver series y películas.
                    </p>
                </div>
            </div>
        </section>
        `;
    }
}

customElements.define("about-page", AboutPage);