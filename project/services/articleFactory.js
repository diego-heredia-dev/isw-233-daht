import { Article } from "./article.js";

export class ArticleFactory {
    static createArticle(title, content) {
        const id = this.generateId();
        console.log(id);
        const date = new Date();

        return new Article(id, title, content, date, false);

    }

    static fromStorage(data) {
        return new Article(
            data.id,
            data.title,
            data.content,
            new Date(data.date),
            data.favorite
        )
    }

    static generateId() {
        return crypto.randomUUID();
    }
}