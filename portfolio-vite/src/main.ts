import { ArticleManager } from "./services/articleManager.js";
import { Command, Commands, CommandExecutor } from "./services/command.js";

import { HomePage } from "./blocks/homepage/homePage.js";
import { HeroPage } from "./blocks/hero/hero.js";
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


document.addEventListener("DOMContentLoaded", () => {
    app.router.init();
});

