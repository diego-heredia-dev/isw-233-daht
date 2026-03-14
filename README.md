A continuación se describen los patrones usandos

🔹 Singleton

Usado en articleManager.js para centralizar los articulos en un solo array.  
De este modo solo una clase se encarga de agregar, editar, eliminar y cambiar el estado de favoritos de los articulos.  
De lo contrario, podriamos tener multiples instancias de articulos, lo cual resultaria en codigo repetido en diferentes .js.  
Esto dificultaria el agregar nuevas funciones, por que se tendria que agregar en diferentes partes del codigo.

🔹 Factory Method

Usado en articleFactory.js  
Separa la logica de creacion de articulos en una sola clase, de tal manera que no debemos repetir la misma logica en diferentes partes del codigo.  
Ademas, así dispensamos de repetir codigo como la creacion de id y fecha, y lo centralizamos en una sola clase: ArticleFactory.

🔹 Observer

Usado en mixin.js.  
Separa la logica de negocio del renderizado de UI.  
Ademas, evita actualizar el DOM sin control, solo actualiza el DOM cuando se realiza un cambio en el array articles al notificar los cambios

🔹 Mixin

Usado en mixin.js.
Basicamente evita el uso de herencia para compartir funciones.  
En mi codigo se usa para compartir funciones entre articleManager.js y mixin.js

🔹 Command

Usado en command.js.
Cada operacion del usuario afecta al UI, si la UI llamara a ArticleManager quien tiene el CRUD de articles, entonces la interfaz quedaria acoplada a la logica de negocio.  
Es por eso que debemos encapsular cada accion CRUD en comandos.