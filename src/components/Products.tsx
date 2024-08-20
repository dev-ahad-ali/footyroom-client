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
  createdAt: Date;
  updatedAt: Date;
}

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 9;
  const [productCount, setProductCount] = useState(0);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brandName, setBrandName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${url}/product/get-product?page=${page}&limit=${limit}&search=${search}&brand=${brandName}&category=${categoryName}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data[0]);
        setProductCount(data.data[1]);
        setLoading(false);
      })
      .catch((err) => console.log('Error while fetching the products', err));
  }, [page, limit, search, brandName, categoryName, minPrice, maxPrice, sort]);

  useEffect(() => {
    fetch(`${url}/product/get-brands`)
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.log('error while fetching brand name', err));
  }, []);

  useEffect(() => {
    fetch(`${url}/product/get-categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log('error while fetching Categories name', err));
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
      <div className="grid sticky bg-white py-4 top-0 place-items-center mt-12">
        <label className="input input-bordered flex items-center gap-2 w-3/5">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
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
      <div className="max-w-[1440px] px-4 block md:flex gap-4 mx-auto mt-12">
        <div className="md:flex-1">
          <div className="md:flex-1">
            {loading ? (
              <div className="md:flex-1 min-h-screen grid place-items-center ">
                <span className="loading loading-lg loading-spinner text-success"></span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:flex-1">
                {products?.map((product: Product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
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
          <div className="sticky top-3">
            <h2 className="text-center text-3xl font-bold">Filters</h2>
            <div className="space-y-2">
              <select
                onChange={(e) => {
                  setBrandName(e.target.value);
                  setPage(1);
                }}
                className="select w-full max-w-xs"
              >
                <option value={''}>All Brands</option>
                {brands?.map((brand) => (
                  <option value={brand} key={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => {
                  setCategoryName(e.target.value);
                  setPage(1);
                }}
                className="select w-full max-w-xs"
              >
                <option value={''}>All Category</option>
                {categories?.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  if (value) {
                    const numbers = value.split('-');
                    setMinPrice(numbers[0]);
                    setMaxPrice(numbers[1]);
                    setPage(1);
                  } else {
                    setMinPrice('');
                    setMaxPrice('');
                    setPage(1);
                  }
                }}
                className="select w-full max-w-xs"
              >
                <option value={''}>All Prices</option>
                <option value={'50-100'}>50 - 100</option>
                <option value={'100-150'}>100 - 150</option>
                <option value={'150-200'}>150 - 200</option>
              </select>
              <select
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="select w-full max-w-xs"
              >
                <option value={''}>Sort</option>
                <option value={'new'}>Latest</option>
                <option value={'1'}>$Low - $High</option>
                <option value={'-1'}>$High - $Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
