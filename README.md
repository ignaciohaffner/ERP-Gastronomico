# ERP Gastronomico

ERP Gastronómico Este proyecto es un Sistema de Planificación de Recursos Empresariales (ERP) orientado a la industria gastronómica. Está construido con React y utiliza Node.js, y Express para el manejo del backend.








## Características


- **Gestión de pedidos**: Los usuarios pueden hacer pedidos y obtener el precio total. Los pedidos pueden ser facturados en efectivo o a través de medios digitales.

- **Comandas en tiempo real**: Los pedidos completos pueden ser enviados a la cocina a través de comandas. La sincronización de las comandas se realiza mediante websockets.

- **Gestión de ingredientes**: Los usuarios pueden agregar nuevos ingredientes junto con sus especificaciones para el control de stock.

- **Gestión de comidas**: Los usuarios pueden crear nuevas comidas a partir de sus ingredientes especificando las cantidades de cada uno para poder calcular cuantos ingredientes se gastan por cada articulo.

- **Gestión de stock**: Se podra observar el stock en tiempo real, como asi tambien poder ver cada transaccion del mismo, pudiendo corroborar cada vez que se agrega o se gasta.


## Futuras caracteristicas

- **Gestion economica**: se tendran los valores de cada ingreso y egreso de dinero, donde podremos observar la rentabilidad de el comercio.

- **Integracion de pasarelas de pago**: se integraran pasarelas de pago para la generacion de links de cobro.

- **Facturacion digital**: se integrara el soporte a la facturacion digital en argentina mediante **AFIP**


## Instalar

Instala mi proyecto con npm

Primero se debe clonar el repositorio y dirigirse a la carpeta Client, y luego correr npm install, para correr el cliente se debe ejecutar npm run dev.
```bash
  cd client
  npm install
  npm run dev
```

Para el backend se debe dirigir a la carpeta src, volver a ejecutar npm install, y luego usar npm start para correr el servidor de express.

```bash
  cd src
  npm install
  npm start
```
    
