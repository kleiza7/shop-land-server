import { Router } from 'express';
import { ProductsController } from '../controllers/Products.controller';

export class ProductsRouter {
  constructor(private router: Router, private productsController: ProductsController) {}

  getRouter() {
    this.router.get('/get-all', this.productsController.getAllProducts);

    this.router.get('/get-by-id/:id', this.productsController.getProductById);

    this.router.post('/create', this.productsController.createProduct);

    return this.router;
  }
}
