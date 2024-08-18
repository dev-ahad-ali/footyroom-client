import { Product } from './Products';

type ProductProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductProps) => {
  return (
    <div>
      <div>
        <img className="w-full h-full" src={product.image} alt="" />
      </div>
      <h2>{product.name}</h2>
    </div>
  );
};

export default ProductCard;
