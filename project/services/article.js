export class Article {
    #id;
    #title;
    #content;
    #date;
    #favorite;

    constructor(id, title, content, date, favorite = false) {
        this.#id = id;
        this.#title = title;
        this.#content = content;
        this.#date = date;
        this.#favorite = favorite;
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get content() {
        return this.#content;
    }

    get date() {
        return this.#date;
    }

    get favorite() {
        return this.#favorite;
    }

    toggleFavorite() {
        this.#favorite = !this.#favorite;
    }

    update(title, content) {
        this.#title = title;
        this.#content = content;
    }
}