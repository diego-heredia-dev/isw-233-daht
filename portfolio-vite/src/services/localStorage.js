export class LocalStorage {
    constructor(key = "articles") {
        this.key = key;
    }

    save(articles) {
        const json =  JSON.stringify(articles);
        localStorage.setItem(this.key, json);
    }

    load() {
        const data = localStorage.getItem(this.key);

        if(!data) return [];

        return JSON.parse(data);
    }
}