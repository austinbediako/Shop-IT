import React, { Fragment } from "react";
import Layout from "../layout";

// Mock data for blog posts showcasing high aesthetic appeal.
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Art of Constructive Minimalism",
    category: "Design",
    date: "MARCH 15, 2026",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000",
    excerpt: "Exploring the boundaries where stark utilitarian layouts meet luxurious visual storytelling in modern e-commerce.",
  },
  {
    id: 2,
    title: "Sourcing Sustainable Textures",
    category: "Materials",
    date: "FEBRUARY 28, 2026",
    image: "https://images.unsplash.com/photo-1574342738221-3965fc71775a?auto=format&fit=crop&q=80&w=1400",
    excerpt: "A deep dive into the raw threads and organic meshes that define our latest autumn capsule collection.",
  },
  {
    id: 3,
    title: "Geometric Tension in Fashion",
    category: "Editorial",
    date: "JANUARY 12, 2026",
    image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&q=80&w=1400",
    excerpt: "How intersecting lines and bold, block colors are aggressively pushing the boundaries of contemporary streetwear.",
  }
];

const BlogComponent = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1a1a1a] pb-24">
      {/* Editorial Header */}
      <header className="px-6 py-20 text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Journal</h1>
        <p className="font-serif text-xl md:text-2xl italic text-gray-500 max-w-2xl mx-auto">
          Thoughts, curations, and deep dives into the aesthetic principles guiding our studio.
        </p>
      </header>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Featured Latest Post */}
        <div className="mb-24 group cursor-pointer">
          <div className="relative overflow-hidden mb-8 w-full h-[60vh] bg-gray-200">
            <img 
              src={BLOG_POSTS[0].image} 
              alt={BLOG_POSTS[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-6 left-6 bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest z-10">
              {BLOG_POSTS[0].category}
            </div>
          </div>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              {BLOG_POSTS[0].date}
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none group-hover:text-amber-800 transition-colors">
              {BLOG_POSTS[0].title}
            </h2>
            <p className="text-lg md:text-xl font-light text-gray-600 max-w-2xl mx-auto">
              {BLOG_POSTS[0].excerpt}
            </p>

          </div>
        </div>

        {/* Secondary Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-black pt-16">
          {BLOG_POSTS.slice(1).map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[4/3] mb-6 bg-gray-100">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-widest z-10">
                  {post.category}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  {post.date}
                </p>
                <h3 className="text-2xl font-black uppercase tracking-tight leading-snug group-hover:text-amber-800 transition-colors">
                  {post.title}
                </h3>
                <p className="font-light text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

const Blog = (props) => {
  return (
    <Fragment>
      <Layout children={<BlogComponent />} />
    </Fragment>
  );
};

export default Blog;
