import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  category: string;
}

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 9;
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/product/get-product?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data[0]);
        setProductCount(data.data[1]);
      })
      .catch((err) => console.log('Error while fetching the products', err));
  }, [page, limit]);

  const pages = Math.ceil(productCount / limit);

  const pageNumbers = [...Array(pages).keys()];

  const handleNext = () => {
    if (page < pageNumbers.length) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <div className="grid place-items-center mt-12">
        <label className="input input-bordered flex items-center gap-2 w-3/5">
          <input type="text" className="grow" placeholder="Search" />
          <button className="btn btn-sm btn-success text-white">Search</button>
        </label>
      </div>
      <div className="max-w-[1440px] px-4 flex gap-4 mx-auto mt-12">
        <div>
          <div className="grid grid-cols-3 gap-2 flex-1">
            {products?.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="mt-8 px-10 flex justify-between">
            <button onClick={handlePrevious} className="btn  btn-outline btn-success text-white">
              «
            </button>
            <div className="flex items-center gap-3">
              {pageNumbers?.map((pageNum) => {
                const buttonNum = pageNum + 1;
                return (
                  <button
                    key={pageNum}
                    className={`btn btn-circle  ${page === buttonNum && 'btn-success text-white'}`}
                  >
                    {buttonNum}
                  </button>
                );
              })}
            </div>
            <button onClick={handleNext} className="btn btn-outline btn-success text-white">
              »
            </button>
          </div>
        </div>
        <div className="w-72">
          <div className="sticky top-0">
            <h2 className="text-center text-3xl font-bold mt-3">Filters</h2>
            <div>
              <select className="select w-full max-w-xs">
                <option disabled selected>
                  Pick your favorite Simpson
                </option>
                <option>Homer</option>
                <option>Marge</option>
                <option>Bart</option>
                <option>Lisa</option>
                <option>Maggie</option>
              </select>
              <select className="select w-full max-w-xs">
                <option disabled selected>
                  Pick your favorite Simpson
                </option>
                <option>Homer</option>
                <option>Marge</option>
                <option>Bart</option>
                <option>Lisa</option>
                <option>Maggie</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
