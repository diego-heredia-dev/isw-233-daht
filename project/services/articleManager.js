import { ArticleFactory } from "./articleFactory.js";
import { LocalStorage } from "./localStorage.js";
import { observerMixin } from "./mixins.js";

export class ArticleManager {
    #articles = [];
    storage = new LocalStorage();
    static instance = null;

    static {
        this.instance = new ArticleManager();
    }

    static getInstance() {
        return this.instance;
    }

    constructor() {
        if(ArticleManager.instance) {
            throw new Error("Use getInstance()");
            
        }

        const data = this.storage.load();
        this.#articles = data.map(a => ArticleFactory.fromStorage(a));
    }

    get articles() {
        return this.#articles;
    }

    add(title, content) {
        const article = ArticleFactory.createArticle(title, content);
        this.#articles.push(article);

        this.storage.save(this.#articles);
        this.notify()
    }

    edit(id, title, content) {
        const article = this.#articles.find(a => a.id === id);
        if(!article) return;

        article.update(title.content);
        this.storage.save(this.#articles);
        this.notify();
    }

    delete(id) {
        this.#articles = this.#articles.filter(a => a.id !== id);

        this.storage.save(this.#articles);
        this.notify();
    }

    toggleFavorite(id) {
        const article = this.#articles.find(a => String(a.id) === String(id));
        if(!article) return;

        article.toggleFavorite();
        this.storage.save(this.#articles);
        this.notify();
    }
}

Object.assign(ArticleManager.prototype, observerMixin);