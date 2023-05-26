:hammer: Instalación del proyecto
- git clone https://github.com/dirkans/segundaPreEntrega.git
- npm i
- nodemon /src/app.js

Corre en el puerto 3000.
#RUTAS
##PRODUCTOS
`GET localhost:3000/api/products`
Se puede pasar por query params los siguientes parámetros
query=internalCode,description,price,stock y value=valor buscado (Query y value deben pasarse al mismo tiempo)
limit=X (Cantidad de productos a mostrar por página)
page=X (Numero de página)
sort=X (l, L o lower para filtro ascendente o bien, H, h o higher para filtro descendente)
En caso de no pasar ningun parámetro se muestra el listado completo de productos.

##CARRITOS
`DELETE localhost:3000/api/carts/:cid/products/:pid`
Deberá eliminar del carrito el producto seleccionado



`PUT localhost:3000/api/carts/:cid`




# RUTAS
## PRODUCTOS

`/api/products (GET)`
-devuelve todos los productos

`/api/products/:id (GET)`
-devuelve un producto según su id

`/api/products (POST)` 
-recibe y agrega un producto, y lo devuelve con su id asignado.

`/api/products/:id (PUT)` 
-recibe y actualiza un producto según su id.

`/api/products/:id (DELETE)` 
-elimina un producto según su id.

## CARRITOS

`/api/cart (GET)` 
-Crea un carrito y devuelve su id.
