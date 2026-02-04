"use client";

import { useState } from "react";
import { useRoleGuard } from "@/hooks/useRoleGuard";
import { productsData } from "@/lib/mockData";
import ProductTable from "@/components/ProductTable";
import ProductForm from "@/components/ProductForm";
import { Product } from "@/lib/mockData";

export default function ProductsPage() {
  useRoleGuard(["manager", "store_keeper"]);

  const [products, setProducts] = useState<Product[]>(productsData);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toString().includes(searchQuery)
  );

  const handleSaveProduct = (product: Product) => {
    const existingIndex = products.findIndex((p) => p.id === product.id);
    if (existingIndex > -1) {
      const updated = [...products];
      updated[existingIndex] = product;
      setProducts(updated);
    } else {
      setProducts([...products, product]);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
              Products
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary"
            >
              ➕ Add Product
            </button>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Manage your inventory and product catalog
          </p>
        </div>

        {/* Search Bar */}
        <div className="card mb-6 animate-slideInDown">
          <input
            type="text"
            placeholder="Search products by name or ID..."
            className="input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Total Products
            </p>
            <p className="text-3xl font-bold text-primary">
              {filteredProducts.length}
            </p>
          </div>
          <div className="card">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Total Inventory Value
            </p>
            <p className="text-3xl font-bold text-success">
              ₹{filteredProducts.reduce((sum, p) => sum + p.price * p.stock, 0).toLocaleString()}
            </p>
          </div>
          <div className="card">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Low Stock Items
            </p>
            <p className="text-3xl font-bold text-warning">
              {filteredProducts.filter((p) => p.stock < 20).length}
            </p>
          </div>
        </div>

        {/* Products Table */}
        <div className="card animate-fadeIn">
          <ProductTable
            products={filteredProducts}
            onSaveProduct={handleSaveProduct}
          />
        </div>
      </div>

      {/* Add Product Modal */}
      {showForm && (
        <ProductForm
          onSave={handleSaveProduct}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
