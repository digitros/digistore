import { Product } from 'src/modules/products/entity/product.entity';
import { User } from './user.entity';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}
