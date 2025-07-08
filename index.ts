import dotenv from 'dotenv';
import express, { Application } from 'express';
import { ProductsController } from './controllers/Products.controller';
import { ProductsRouter } from './routers/Products.router';
import { sequelize } from './config/database';
import cors from 'cors';

dotenv.config();

class Server {
  constructor(private productsRouter: ProductsRouter) {
    this.startServer();
  }

  startServer() {
    const app: Application = express();

    const port = process.env.PORT || 5000;

    app.use(express.json());
    app.use(cors());

    app.use('/products', this.productsRouter.getRouter());

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

const router = express.Router();

const productsController = new ProductsController();

const productsRouter = new ProductsRouter(router, productsController);

new Server(productsRouter);
