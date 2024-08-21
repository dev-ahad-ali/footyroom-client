import { Product } from './Products';

type ProductProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductProps) => {
  return (
    <div className="p-2 border border-green-300 rounded-sm">
      <div>
        <img className="w-full h-full" src={product.image} alt="" />
      </div>
      <h2>{product.name}</h2>
      <h2>Price : $ {product.price}</h2>
      <div className="flex items-center justify-between">
        <h2>Brand:{product.brand}</h2> <h2>Date: {product.createdAt.toString().split('T')[0]}</h2>
      </div>
    </div>
  );
};

export default ProductCard;
