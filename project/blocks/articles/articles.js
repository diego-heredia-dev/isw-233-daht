import { ArticleManager } from "../../services/articleManager.js";
import { Command, CommandExecutor, Commands } from "../../services/command.js";

export class ArticlesPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section class="articles" id="articles">
            <h2 class="articles__title">Mis Artículos</h2>

            <form class="articles__editor" id="article-form">
                <input id="article-title-input" placeholder="Titulo" required>
                <textarea id="article-content-input" placeholder="Contenido" required></textarea>
                <button type="submit">Publicar</button>
            </form>

            <div class="articles__container" id="articles-container"></div>
                <template class="article__template" id="article-template">
                    <div class="card card--article" data-id="">
                        <div class="card__content">
                            <h3 class="card__title"></h3>
                            <p class="card__description"></p>

                            <div class="card__actions">
                                <button class="favorite-btn">☆</button>
                                <button class="delete-btn">Delete</button>
                            </div>
                        </div>
                    </div>
                </template>
        </section>
        `;
        //setup is called just one time when <articles-page> is inserted in the DOM
        this.setup();

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

        //whereas renderArticles() is also execute one time when <articles-pages> is inserted
        //But it is also called several times due to Observer.
        this.renderArticles();
    }

    disconnectedCallback() {
        this.manager.removeObserver(this.renderCallback);
    }

    setup() {
        this.container = this.querySelector("#articles-container");
        this.template = this.querySelector("#article-template");
        
        this.form = this.querySelector("#article-form");
        this.titleInput = this.querySelector("#article-title-input");
        this.contentInput = this.querySelector("#article-content-input");
    }

    renderArticles() {
        this.container.innerHTML = "";

        this.manager.articles.forEach((article) => {
            console.log(article);
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
}

customElements.define("articles-page", ArticlesPage);