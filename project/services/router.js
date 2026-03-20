const Router = {
    routes: {
        "/": "home-page",
        "/projects": "projects-page",
        "/articles": "articles-page",
        "/about" : "about-page",
        "/contact": "contact-page",
    },

    go(route, addToHistory = true) {
        console.log("navigating to:", route);
        if(addToHistory) {
            //using {} makes route an object
            /*
            Example:
            const datosParaElFuturo = { id: 42, tema: 'oscuro' };
            const tituloIgnorado = "";
            const nuevaUrl = "/proyectos/mi-app";

            history.pushState(datosParaElFuturo, tituloIgnorado, nuevaUrl);
            */
            history.pushState({route}, "", route);
        }

        const app = document.getElementById("app");
        const tag = this.routes[route];

        if(!tag) {
            app.innerHTML = "<h1>Page not found</h1>";
            return;
        }

        app.innerHTML = "";
        app.appendChild(document.createElement(tag));
    },

    init() {
        let path = location.pathname;
        if(path === "/index.html") path = "/";
        //location is the url and pathname is path XD
        /*
        location.host: diego.dev (El nombre de la web).
        location.protocol: https: (La seguridad).
        location.pathname: /projects/mi-app (La "ruta" o camino interno).
        */
        window.addEventListener("popstate", (event) => {
            this.go(location.pathname, false);
        });

        document.addEventListener("click", (event) => {
            const link = event.target.closest("a");
            if(!link) return;
            
            const href = link.getAttribute("href");
            if(href.startsWith("http")) return;
            
            event.preventDefault();
            this.go(href);
        });
        //we have to call go so the page is not blank
        this.go(path);
    },
};

export default Router;