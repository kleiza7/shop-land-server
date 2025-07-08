import { Request, Response } from 'express';
import { Product } from '../models/Product.model';

export class ProductsController {
  async getAllProducts(_: Request, res: Response) {
    try {
      const products = await Product.findAll({
        attributes: ['id', 'name', 'description', 'price'],
      });

      res.status(200).json(products);
    } catch (error) {
      res.status(404).json({ message: 'An error occurred when fetch products.' });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) {
        res.status(404).json({ message: 'Product not found.' });
        return;
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ message: 'An error occurred when fetch product.' });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const { name, description, price } = req.body;

      const product = await Product.create({ name, description, price });

      res.status(201).json(product);
    } catch (error) {
      res.status(404).json({ message: 'An error occurred.' });
    }
  }
}
