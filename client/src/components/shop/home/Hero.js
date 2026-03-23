import React, { Fragment } from "react";
import OrderSuccessMessage from "./OrderSuccessMessage";

const apiURL = process.env.REACT_APP_API_URL;

const Hero = () => {

  return (
    <Fragment>
      <section className="relative w-full h-[70vh] md:h-[80vh] bg-[#1a202c] mt-16 overflow-hidden block">
        
        {/* Static Background Layer */}
        <div className="absolute inset-0 w-full h-full bg-[#1a202c]" />
        {/* Left Side (Outside max-w container): Image tightly anchored to absolute left of entire screen */}
        <div className="absolute bottom-0 -left-[80%] md:-left-20 lg:-left-96 flex items-end z-10 h-full pointer-events-none drop-shadow-2xl opacity-80 md:opacity-100">
          <img 
            src="/hero-left.png" 
            alt="Hero Fashion" 
            className="w-auto h-full max-h-[60vh] md:max-h-[85vh] object-contain object-left-bottom" 
          />
        </div>

        {/* Right Side (Outside max-w container): Image tightly anchored to absolute right of entire screen */}
        <div className="absolute bottom-0 -right-[40%] md:-right-10 lg:-right-20 flex items-end z-10 h-full pointer-events-none drop-shadow-2xl opacity-80 md:opacity-100">
          <img 
            src="/hero-right.jpg" 
            onError={(e) => { e.target.onerror = null; e.target.src='/hero-right.jpg'; }}
            alt="Hero Fashion Right" 
            className="w-auto h-full max-h-[60vh] md:max-h-[85vh] object-contain object-right-bottom border-none" 
          />
        </div>

        {/* Container for Texts */}
        <div className="relative z-20 w-full max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          {/* Centered Text Content */}
          <div className="flex flex-col items-center text-center pb-20 mt-20 md:mt-0 md:pb-0">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white leading-tight mb-4 drop-shadow-2xl tracking-wide uppercase">
              Authentic Style
            </h1>
            <p className="text-gray-200 text-base md:text-lg mb-10 max-w-lg drop-shadow-md font-light tracking-wide">
              Explore our latest collection of premium, curated fashion pieces. Designed for the modern individual who values aesthetics and quality.
            </p>
            
            <button
              onClick={() => {
                const shopSection = document.getElementById("shop-products");
                if (shopSection) shopSection.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white text-black hover:bg-gray-200 transition-colors px-10 py-4 font-bold uppercase tracking-widest text-sm rounded-none shadow-lg pointer-events-auto"
            >
              Explore Collection
            </button>
          </div>
        </div>


      </section>
      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Hero;
