import { ArticleManager } from "../../services/articleManager.js";
import { Command, CommandExecutor, Commands } from "../../services/command.js";

export class ArticlesPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open"});
    }

    async connectedCallback() {
        await this.render();
        //setup is called just one time when <articles-page> is inserted in the DOM
        
        this.setup();

        this.manager = ArticleManager.getInstance();

        //It "locks" the meaning of this. It ensures that even if another part of the program triggers the function, it still knows exactly which component it belongs to.
        this.renderCallback = () => this.renderArticles();
        this.manager.addObserver(this.renderCallback);

        /*
        this.manager = ArticleManager.getInstance();
        //() => this.renderArticles(): "Guarda esta nota: CUANDO TE AVISE, dibuja los artículos".
        //Si no usamos () => ... manager tendra un error, por que en js this. es dinamico y se olvidaria de ArticlesPage

        this.renderCallback = () => this.renderArticles();
        this.manager.addObserver(this.renderCallback);

        this.form.addEventListener("submit", (event) => {
            event.preventDefault();

            const title = this.titleInput.value.trim();
            const content = this.contentInput.value.trim();

            if(!title || !content) return;

            const cmd = new Command(Commands.CREATE, [title, content]);
            CommandExecutor.execute(cmd);

            this.form.reset();
        });

        this.container.addEventListener("click", (event) => {
            const card = event.target.closest(".card");
            if(!card) return;

            const id = card.dataset.id;

            if(event.target.classList.contains("delete-btn")) {
                const cmd = new Command(Commands.DELETE, [id]);
                CommandExecutor.execute(cmd);
            }

            if(event.target.classList.contains("favorite-btn")) {
                const cmd = new Command(Commands.TOGGLE_FAVORITE, [id]);
                CommandExecutor.execute(cmd);
            }
        });

        this.visibleCount = 5;
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    this.loadMore();
                }
            });
        });

        this.sentinel = this.querySelector("#sentinel");
        this.observer.observe(this.sentinel);

        //whereas renderArticles() is also execute one time when <articles-pages> is inserted
        //But it is also called several times due to Observer.
        this.renderArticles();
        */

        this.renderArticles();
    }

    disconnectedCallback() {
        this.manager.removeObserver(this.renderCallback);

        if(this.observer) this.observer.disconnect();
    }

    setup() {
        this.container = this.root.querySelector("#articles-container");
        this.template = this.root.querySelector("#article-template");
        
        this.form = this.root.querySelector("#article-form");
        this.titleInput = this.root.querySelector("#article-title-input");
        this.contentInput = this.root.querySelector("#article-content-input");
    }

    async render() {
        this.root.innerHTML = "";

        const template = document.getElementById("articles-template");
        const content = template.content.cloneNode(true);

        const style = document.createElement("style");
        const articlesCSS = await fetch("/blocks/articles/articles.css");
        const cardCSS = await fetch("/blocks/card/card.css");

        style.textContent = await articlesCSS.text() + await cardCSS.text();

        this.root.appendChild(style);
        this.root.appendChild(content);
    }   
    
    renderArticles() {
        this.container.innerHTML = "";

        this.manager.articles.forEach((article) => {
            const card = this.template.content.cloneNode(true).firstElementChild;

            const titleEl = card.querySelector(".card__title");
            const contentEl = card.querySelector(".card__description");
            const favoriteBtn = card.querySelector(".favorite-btn");
        
            titleEl.textContent = article.title;
            contentEl.textContent = article.content;
            favoriteBtn.textContent = article.favorite ? "★" : "☆";

            card.dataset.id = article.id;

            this.container.appendChild(card);
        })
    }

    loadMore() {
        if(this.loading) return;

        if(this.visibleCount >= this.manager.articles.length) return;

        this.loading = true;

        this.visibleCount += 3;
        this.renderArticles();

        this.loading = false;
    }

}

customElements.define("articles-page", ArticlesPage);