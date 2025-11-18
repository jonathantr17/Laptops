"use client";

import ProductCard from "./ProductCard";

export default function ProductSection({ title, products = [] }: { title: string; products?: any[] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((item) => (
          <ProductCard key={item.id} laptop={item} />
        ))}
      </div>
    </section>
  );
}