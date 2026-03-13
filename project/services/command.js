import { ArticleManager } from "./articleManager.js";

export class Command {
    name;
    args;

    constructor(name, args) {
        this.name = name;
        this.args = args;
    }

}

export const Commands = {
    CREATE: "create",
    EDIT: "edit",
    DELETE: "delete",
    TOGGLE_FAVORITE: "toggle_favorite"
};

export const CommandExecutor = {
    execute(command) {
        const manager = ArticleManager.getInstance();

        switch(command.name) {
            case Commands.CREATE:
                const [title, content] = command.args;
                manager.add(title, content);
                break;
            case Commands.EDIT:
                const [newId, newTitle, newContent] = command.args;
                manager.edit(newId, newTitle, newContent);
                break;
            case Commands.DELETE:
                const [id] = command.args;
                manager.delete(id);
                break;
            case Commands.TOGGLE_FAVORITE:
                const[favId] = command.args;
                manager.toggleFavorite(favId);
                break;
        }
    }
}