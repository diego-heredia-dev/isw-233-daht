import { ArticleManager } from "./services/articleManager.js";
import { Command, Commands, CommandExecutor } from "./services/command.js";

import { HomePage } from "./blocks/homepage/homePage.js";
import { ProjectsPage } from "./blocks/projects/projects.js";
import { ArticlesPage } from "./blocks/articles/articles.js";
import { AboutPage } from "./blocks/about/about.js";
import { ContactPage } from "./blocks/contact/contact.js";

import Router from "./services/router.js";

globalThis.DOM = {};
globalThis.app = {};

const DOM = globalThis.DOM;
app.router = Router;

const manager = ArticleManager.getInstance();

/*
function renderArticles() {
    DOM.articlesContainer.innerHTML = "";

    manager.articles.forEach((article) => {
        console.log(article);
        const articleCard = DOM.articleTemplate.content.cloneNode(true).firstElementChild;

        const cardTitle = articleCard.querySelector(".card__title");
        const cardContent = articleCard.querySelector(".card__description");

        cardTitle.textContent = article.title;
        cardContent.textContent = article.content;

        const favoriteBtn = articleCard.querySelector(".favorite-btn");
        
        favoriteBtn.textContent = article.favorite ? "★" : "☆";
        console.log(article.id);
        articleCard.dataset.id = article.id;
        
        DOM.articlesContainer.appendChild(articleCard);

        
    });

}
*/

document.addEventListener("DOMContentLoaded", () => {
    /*
    DOM.articlesContainer = document.getElementById("articles-container");
    DOM.articleTemplate = document.getElementById("article-template");
    DOM.articleForm = document.getElementById("article-form");
    DOM.titleInput = document.getElementById("article-title-input");
    DOM.contentInput = document.getElementById("article-content-input");
    */

    //manager.addObserver(renderArticles);
    app.router.init();

    /*
    DOM.articlesContainer.addEventListener("click", (event) => {
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
    
    DOM.articleForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = DOM.titleInput.value.trim();
        const content = DOM.contentInput.value.trim();

        if(title === "" || content === "") return;

        const cmd = new Command(Commands.CREATE, [title, content]);
        CommandExecutor.execute(cmd);

        DOM.articleForm.reset();
    })

    renderArticles()
    */
});

