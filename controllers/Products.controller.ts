import { Request, Response } from 'express';
import { Product } from '../models';

export class ProductsController {
  async getAllProducts(_: Request, res: Response) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(404).json({ message: 'An error occurred when fetch products.' });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const products = await Product.create({ name });
      res.status(201).json(products);
    } catch (error) {
      res.status(404).json({ message: 'An error occurred.' });
    }
  }
}
