:hammer: Instalación del proyecto
- git clone https://github.com/dirkans/segundaPreEntrega.git
- npm i
- nodemon /src/app.js

Corre en el puerto 3000.

Se puede pasar por query params los siguientes parámetros
query=internalCode,description,price,stock y value=valor buscado (Query y value deben pasarse al mismo tiempo)
limit=X (Cantidad de productos a mostrar por página)
page=X (Numero de página)
sort=X (l, L o lower para filtro ascendente o bien, H, h o higher para filtro descendente)

En caso de no pasar ningun parámetro se muestra el listado completo de productos.

