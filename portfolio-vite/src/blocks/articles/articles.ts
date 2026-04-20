import { Article } from "../../services/article.js";
import { ArticleManager } from "../../services/articleManager.js";
import { Command, CommandExecutor, Commands } from "../../services/command.js";

export class ArticlesPage extends HTMLElement {
    root:ShadowRoot;
    visibleCount: number;
    batchSize: number;
    isLoading: boolean;
    
    //! dice: “sí, no lo inicializo en el constructor, pero va a existir”
    form!: HTMLFormElement;
    titleInput!: HTMLInputElement;
    contentInput!: HTMLTextAreaElement;
    container!: HTMLElement;
    template!: HTMLTemplateElement;
    sentinel!: HTMLElement;
    
    manager!: ArticleManager;
    observer!: IntersectionObserver;
    renderCallback!: () => void;

    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open"});
        this.visibleCount = 0;
        this.batchSize = 3;
        this.isLoading = false;
    }

    async connectedCallback() {
        await this.render();
        //setup is called just one time when <articles-page> is inserted in the DOM
        
        this.setup();

        this.form.addEventListener("submit", (event: SubmitEvent) => {
            event.preventDefault();

            const title = this.titleInput.value.trim();
            const content = this.contentInput.value.trim();

            if(!title || !content) return;

            const cmd = new Command(Commands.CREATE, [title, content]);
            CommandExecutor.execute(cmd);

            this.form.reset();
        });

        this.container.addEventListener("click", (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const card = target.closest(".card") as HTMLElement;

            if (!card) return;

            const id = card.dataset.id;
            if (!id) return;

            if(target.classList.contains("card__btn--delete")) {
                const cmd = new Command(Commands.DELETE, [id]);
                CommandExecutor.execute(cmd);
            }

            if(target.classList.contains("card__btn--favorite")) {
                const cmd = new Command(Commands.TOGGLE_FAVORITE, [id]);
                CommandExecutor.execute(cmd);
            }
        });

        this.manager = ArticleManager.getInstance();

        //It "locks" the meaning of this. . It ensures that even if another part of the program triggers the function, it still knows exactly which component it belongs to.
        this.renderCallback = () => this.renderInitialArticles();
        this.manager.addObserver(this.renderCallback);

        this.setupObserver();
        this.renderInitialArticles();
    }

    async render() {
        this.root.innerHTML = "";

        const template = document.getElementById("articles-template") as HTMLTemplateElement;
        const content = template.content.cloneNode(true);

        const style = document.createElement("style");
        const articlesCSS = await fetch("/src/blocks/articles/articles.css");
        const cardCSS = await fetch("/src/blocks/card/card.css");

        style.textContent = await articlesCSS.text() + await cardCSS.text();

        this.root.appendChild(style);
        this.root.appendChild(content);
    }  

    disconnectedCallback() {
        this.manager.removeObserver(this.renderCallback);

        if(this.observer) this.observer.disconnect();
    }

    setup() {
        this.sentinel = this.root.querySelector("#sentinel") as HTMLElement;
        this.container = this.root.querySelector("#articles-container") as HTMLElement;
        this.template = this.root.querySelector("#article-template") as HTMLTemplateElement;
        
        this.form = this.root.querySelector("#article-form") as HTMLFormElement;
        this.titleInput = this.root.querySelector("#article-title-input") as HTMLInputElement;
        this.contentInput = this.root.querySelector("#article-content-input")as HTMLTextAreaElement;
    }

    setupObserver() {
        //IntersectionObserver fires every time the intersection state changes or is re-evaluated
        //so we must use asycn and isLoading in order to avoid executing the callback several times in just one scroll
        this.observer = new IntersectionObserver(async (entries) => {
            const entry = entries[0];

            if(!entry.isIntersecting) return;
            if(this.isLoading) return;

            this.isLoading = true;

            this.appendArticles();

            this.isLoading = false;

        }, {
            threshold: 0
        });

        this.observer.observe(this.sentinel);
    }

    renderInitialArticles() {
        this.container.innerHTML = "";
        this.visibleCount = 0;

        this.appendArticles();

        if (this.observer) {
            this.observer.observe(this.sentinel);
        }
    }

    appendArticles() {
        const articles = this.manager.articles;

        const next = articles.slice(
            this.visibleCount,
            this.visibleCount + this.batchSize
        )

        next.forEach((article: Article) => {
            const clone = this.template.content.cloneNode(true) as DocumentFragment;
            const card = clone.firstElementChild as HTMLElement;

            const cardTitle = card.querySelector(".card__title") as HTMLElement;
            const cardContent = card.querySelector(".card__description") as HTMLElement;
            const favoriteBtn = card.querySelector(".card__btn--favorite") as HTMLElement;

            cardTitle.textContent = article.title;
            cardContent.textContent = article.content;
            favoriteBtn.textContent = article.favorite ? "★" : "☆";

            card.dataset.id = article.id;

            this.container.appendChild(card);
        });

        this.visibleCount += next.length;

        if (this.visibleCount >= articles.length) {
            this.observer.unobserve(this.sentinel);
        }
    }
}

customElements.define("articles-page", ArticlesPage);