A continuación se describen los bloques principales del proyecto:

🔹 hero

Sección de presentación principal del portafolio.
Contiene el título, subtítulo, tarjeta descriptiva y botones de navegación.

🔹 card

Componente reutilizable utilizado para representar contenido en formato tarjeta.
Es utilizado tanto en la sección de proyectos como en artículos mediante modifiers.

Modifiers utilizados:

card--project

card--article

Este bloque permite reutilización sin duplicación de estilos.

🔹 projects

Sección que muestra los proyectos desarrollados.
Utiliza el bloque card con el modifier card--project.

🔹 articles

Sección destinada a artículos o publicaciones.
Utiliza el bloque card con el modifier card--article.

🔹 about-me

Sección que describe información personal y profesional.
Incluye elementos como título, contenedor y cajas informativas.

🔹 contact-me

Sección de contacto que incluye un formulario y enlaces a redes sociales.
Todos los elementos internos siguen la nomenclatura BEM para mantener consistencia estructural.