import { Brand } from './Brand.model';
import { Product } from './Product.model';

Brand.hasMany(Product, { foreignKey: 'brand_id' });
Product.belongsTo(Brand, { foreignKey: 'brand_id' });
