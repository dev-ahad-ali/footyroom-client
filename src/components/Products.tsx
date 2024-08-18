import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { url } from '../utils/Url';

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
  const [search, setSearch] = useState('');
  const limit = 9;
  const [productCount, setProductCount] = useState(0);
  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState('');

  useEffect(() => {
    fetch(
      `${url}/product/get-product?page=${page}&limit=${limit}&search=${search}&brand=${brandName}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data[0]);
        setProductCount(data.data[1]);
      })
      .catch((err) => console.log('Error while fetching the products', err));
  }, [page, limit, search, brandName]);

  useEffect(() => {
    fetch(`${url}/product/get-brands`)
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.log('error while fetching brand name', err));
  }, []);

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
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
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
              <select
                onChange={(e) => setBrandName(e.target.value)}
                className="select w-full max-w-xs"
              >
                <option value={''}>All Brands</option>
                {brands?.map((brand) => (
                  <option value={brand} key={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <select className="select w-full max-w-xs">
                <option>Pick your favorite Simpson</option>
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
