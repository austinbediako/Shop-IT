import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getAllProduct } from "../../admin/products/FetchApi";
import { HomeContext } from "./index";
import { isWishReq, unWishReq, isWish } from "./Mixins";
import { CardFlip, CardFlipFront, CardFlipBack } from "../../systaliko-ui/cards/card-flip";
import { sliderImages } from "../../admin/dashboardAdmin/Action";

const apiURL = process.env.REACT_APP_API_URL;

const InlineCarousel = ({ images, offset = 0 }) => {
  const [current, setCurrent] = useState(offset % (images?.length || 1));

  useEffect(() => {
    if (images && images.length > 1) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="col-span-2 md:col-span-3 lg:col-span-4 w-full h-64 md:h-[400px] my-10 relative overflow-hidden bg-[#1a202c]">
      {images.map((item, idx) => (
        <div
          key={item._id || idx}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${item.slideImage.match(/^https?:\/\//) ? item.slideImage : `${apiURL}/uploads/customize/${item.slideImage}`})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center pointer-events-none p-6 text-center">
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-[0.2em] uppercase drop-shadow-2xl mb-4">
          Featured Collection
        </h2>
        <div className="w-16 h-1 bg-white mb-4"></div>
        <p className="text-gray-200 text-sm md:text-base max-w-lg font-light tracking-wide shadow-sm">
          Discover our hand-picked selections curated for the modern individual. Quality and aesthetics merged into one.
        </p>
      </div>

      {/* Navigation Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-8 h-1 transition-all duration-300 ${
                idx === current ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SingleProduct = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const { products } = data;
  const history = useHistory();

  /* WhisList State */
  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  );

  useEffect(() => {
    fetchData();
    sliderImages(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getAllProduct();
      setTimeout(() => {
        if (responseData && responseData.Products) {
          dispatch({ type: "setProducts", payload: responseData.Products });
        } else {
          dispatch({ type: "setProducts", payload: [] });
        }
        dispatch({ type: "loading", payload: false });
      }, 500);
    } catch (error) {
      console.log(error);
      dispatch({ type: "loading", payload: false });
    }
  };

  if (data.loading) {
    return (
      <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <Fragment>
      {products && products.length > 0 ? (
        products.map((item, index) => {
          return (
            <Fragment key={index}>
              <CardFlip className="col-span-1 m-2 h-72 w-full">
                <CardFlipFront className="rounded-xl overflow-hidden shadow-md">
                  <img
                    className="w-full h-full object-cover object-center cursor-pointer"
                    src={item.pImages[0].match(/^https?:\/\//) ? item.pImages[0] : `${apiURL}/uploads/products/${item.pImages[0]}`}
                    alt="Product"
                  />
                </CardFlipFront>
                <CardFlipBack className="rounded-xl overflow-hidden shadow-md bg-white p-4 flex flex-col items-center justify-center text-center">
                  <div className="text-xl font-semibold text-gray-800 mb-2 mx-2 line-clamp-2">
                    {item.pName}
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    <span>
                      <svg
                        className="w-4 h-4 fill-current text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-700 text-sm">
                      {item.pRatingsReviews.length} Reviews
                    </span>
                  </div>

                  <div className="text-lg font-bold text-gray-900 mb-4">GH₵{item.pPrice}.00</div>

                  <button 
                    onClick={(e) => history.push(`/products/${item._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-none font-medium transition-colors w-full mx-4"
                  >
                    View Product
                  </button>

                  {/* WhisList Logic  */}
                  <div className="absolute top-0 right-0 mx-2 my-2 md:mx-4">
                    <svg
                      onClick={(e) => isWishReq(e, item._id, setWlist)}
                      className={`${
                        isWish(item._id, wList) && "hidden"
                      } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-blue-600 transition-all duration-300 ease-in`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <svg
                      onClick={(e) => unWishReq(e, item._id, setWlist)}
                      className={`${
                        !isWish(item._id, wList) && "hidden"
                      } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-blue-600 transition-all duration-300 ease-in`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {/* WhisList Logic End */}
                </CardFlipBack>
              </CardFlip>

              {/* Dynamic Admin Slider Interleaved Carousel */}
              {(index + 1) % 12 === 0 && data.sliderImages && data.sliderImages.length > 0 && (
                <InlineCarousel images={data.sliderImages} offset={Math.floor((index + 1) / 12)} />
              )}
            </Fragment>
          );
        })
      ) : (
        <Fragment>
          {data.sliderImages && data.sliderImages.length > 0 && (
            <InlineCarousel images={data.sliderImages} offset={0} />
          )}
          <div className="col-span-2 md:col-span-3 lg:col-span-4 flex flex-col items-center justify-center py-20 px-4 w-full">
          {data.searchDropdown ? (
            <div className="flex flex-col items-center w-full max-w-md text-center">
              <div className="relative w-full mb-10 bg-gray-50 overflow-hidden">
                <img src="/not-found.jpg" alt="No products found" className="w-full h-auto object-cover opacity-95 hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 border border-gray-200 pointer-events-none"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-light tracking-widest text-[#1a1a1a] uppercase mb-4">Nothing Found</h2>
              <div className="w-12 h-1 bg-blue-600 mb-6"></div>
              <p className="text-gray-500 font-light text-lg leading-relaxed">
                We couldn't find any items matching your search. Discover our curated collections instead.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full max-w-md text-center">
              <div className="relative w-full mb-10 bg-gray-50 overflow-hidden">
                <img src="/no-item.jpeg" alt="Empty category" className="w-full h-auto object-cover opacity-95 hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 border border-gray-200 pointer-events-none"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-light tracking-widest text-[#1a1a1a] uppercase mb-4">Section Empty</h2>
              <div className="w-12 h-1 bg-blue-600 mb-6"></div>
              <p className="text-gray-500 font-light text-lg leading-relaxed">
                This collection is currently being updated. Check back soon for new exquisite arrivals.
              </p>
            </div>
          )}
        </div>
      </Fragment>
      )}
    </Fragment>
  );
};

export default SingleProduct;
