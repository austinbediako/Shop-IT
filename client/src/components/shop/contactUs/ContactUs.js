import React, { Fragment } from "react";
import Layout from "../layout";
import { Mail, MapPin, Phone } from "lucide-react";

/**
 * Editorial / Brutalist Contact Us Page using frontend-design skill guide
 * Focuses on large typography, stark contrasts, and striking layout over generic components.
 */
const ContactUsComponent = () => {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#111111] selection:bg-black selection:text-white">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-8 md:px-16 border-b-2 border-black">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
          Get in<br />
          Touch.
        </h1>
        <p className="mt-8 text-xl md:text-2xl font-light max-w-2xl tracking-wide">
          Whether you have a question about an order, a product inquiry, or just want to say hello, our studio is ready to hear from you.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Contact Info Column */}
        <div className="p-8 md:p-16 border-b-2 md:border-b-0 md:border-r-2 border-black space-y-12">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Visit Us</h3>
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 shrink-0 mt-1" />
              <p className="text-xl font-medium leading-relaxed">
                Legon Campus<br />
                Suite 404<br />
                Ghana, DCIT 209
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Call Us</h3>
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 shrink-0" />
              <p className="text-xl font-medium">+233 2048193</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Email Us</h3>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 shrink-0" />
              <p className="text-xl font-medium hover:underline cursor-pointer">
                group@dcit209.com
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Form Column spans 2 */}
        <div className="p-8 md:p-16 lg:col-span-2 bg-[#111111] text-[#FDFCF8]">
          <h2 className="text-4xl font-bold uppercase tracking-tighter mb-12">
            Send a Dispatch
          </h2>
          <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
            <div className="group relative">
              <input
                type="text"
                id="name"
                className="w-full bg-transparent border-b-2 border-gray-600 focus:border-[#FDFCF8] text-2xl py-4 outline-none transition-colors peer placeholder-transparent"
                placeholder="Name"
                autoComplete="off"
              />
              <label htmlFor="name" className="absolute left-0 -top-6 text-sm font-bold uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:text-2xl peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-[#FDFCF8]">
                Your Name
              </label>
            </div>

            <div className="group relative">
              <input
                type="email"
                id="email"
                className="w-full bg-transparent border-b-2 border-gray-600 focus:border-[#FDFCF8] text-2xl py-4 outline-none transition-colors peer placeholder-transparent"
                placeholder="Email"
                autoComplete="off"
              />
              <label htmlFor="email" className="absolute left-0 -top-6 text-sm font-bold uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:text-2xl peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-[#FDFCF8]">
                Your Email
              </label>
            </div>

            <div className="group relative">
              <textarea
                id="message"
                rows="4"
                className="w-full bg-transparent border-b-2 border-gray-600 focus:border-[#FDFCF8] text-2xl py-4 resize-none outline-none transition-colors peer placeholder-transparent"
                placeholder="Message"
              ></textarea>
              <label htmlFor="message" className="absolute left-0 -top-6 text-sm font-bold uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:text-2xl peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-[#FDFCF8]">
                Message
              </label>
            </div>

            <button className="w-full py-6 bg-[#FDFCF8] text-[#111111] text-xl font-bold uppercase tracking-widest hover:bg-gray-300 transition-colors">
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const ContactUs = (props) => {
  return (
    <Fragment>
      <Layout children={<ContactUsComponent />} />
    </Fragment>
  );
};

export default ContactUs;
