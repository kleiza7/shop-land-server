import dotenv from 'dotenv';
import express, { Application } from 'express';
import { ProductsController } from './controllers/Products.controller';
import { ProductsRouter } from './routers/Products.router';
import { sequelize } from './config/database';
import cors from 'cors';
import './models/index';
import { BrandsRouter } from './routers/Brands.router';
import { BrandsController } from './controllers/Brands.controller';

dotenv.config();

class Server {
  constructor(private productsRouter: ProductsRouter, private brandsRouter: BrandsRouter) {
    this.startServer();
  }

  startServer() {
    const app: Application = express();

    const port = process.env.PORT || 5000;

    app.use(express.json());
    app.use(cors());

    app.use('/products', this.productsRouter.getRouter());
    app.use('/brands', this.brandsRouter.getRouter());

    sequelize
      .sync()
      .then(() =>
        app.listen(port, () => {
          console.log(`Server is Fire at http://localhost:${port}`);
        }),
      )
      .catch((_) => console.log('Can not connected db'));
  }
}


const productsController = new ProductsController();
const brandsController = new BrandsController();

const productsRouter = new ProductsRouter(express.Router(), productsController);
const brandsRouter = new BrandsRouter(express.Router(), brandsController);

new Server(productsRouter, brandsRouter);
