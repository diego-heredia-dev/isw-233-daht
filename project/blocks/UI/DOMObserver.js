export function initDOMObserver() {
    const app = document.getElementById("app");

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            /*Dentro de cada cambio, existe una propiedad llamada addedNodes. 
            Esta contiene una lista de todos los elementos que fueron insertados en el HTML en ese momento específico.*/
            for (const node of mutation.addedNodes) {
                /*o todo lo que se añade al DOM es una etiqueta de HTML. 
                "Si lo que se añadió no es una etiqueta real (como un section tag), ignóralo y pasa al siguiente".*/
                if(!(node instanceof HTMLElement)) continue;

                handleNewSection(node);
            }
        }
    });

    observer.observe(app, { childList: true});
}