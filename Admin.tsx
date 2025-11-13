import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { type Product } from "@/components/ProductCard";
import { Trash2, Edit2, Save, X, ArrowLeft } from "lucide-react";

const STORAGE_KEY = "myshop_products";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", price: "", imageUrl: "" });
  const [editFormData, setEditFormData] = useState({ name: "", price: "", imageUrl: "" });
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const storedProducts = localStorage.getItem(STORAGE_KEY);
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (e) {
        console.error("Error parsing stored products:", e);
        setProducts([]);
      }
    }
  };

  const saveProducts = (updatedProducts: Product[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.imageUrl) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl,
    };

    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);

    setFormData({ name: "", price: "", imageUrl: "" });
    toast({
      title: "Success",
      description: "Product added successfully",
    });
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    saveProducts(updatedProducts);
    toast({
      title: "Success",
      description: "Product deleted successfully",
    });
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditFormData({
      name: product.name,
      price: product.price.toString(),
      imageUrl: product.imageUrl,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditFormData({ name: "", price: "", imageUrl: "" });
  };

  const handleUpdateProduct = (id: string) => {
    if (!editFormData.name || !editFormData.price || !editFormData.imageUrl) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const updatedProducts = products.map((p) =>
      p.id === id
        ? { ...p, name: editFormData.name, price: parseFloat(editFormData.price), imageUrl: editFormData.imageUrl }
        : p
    );

    saveProducts(updatedProducts);
    setEditingId(null);
    toast({
      title: "Success",
      description: "Product updated successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => setLocation("/")}
            data-testid="button-back-home"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-admin-title">Admin Panel</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[400px,1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter product name"
                    data-testid="input-product-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    data-testid="input-product-price"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    data-testid="input-product-image"
                  />
                  {formData.imageUrl && (
                    <div className="mt-2 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/300x200?text=Invalid+Image";
                        }}
                      />
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full" data-testid="button-add-product">
                  Add Product
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product List ({products.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {products.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No products yet. Add your first product!</p>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-4 rounded-lg border hover-elevate"
                      data-testid={`row-product-${product.id}`}
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 rounded-md object-cover bg-gray-100"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/64?text=No+Image";
                        }}
                      />
                      
                      {editingId === product.id ? (
                        <div className="flex-1 space-y-3">
                          <Input
                            value={editFormData.name}
                            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                            placeholder="Product name"
                            data-testid={`input-edit-name-${product.id}`}
                          />
                          <Input
                            type="number"
                            step="0.01"
                            value={editFormData.price}
                            onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                            placeholder="Price"
                            data-testid={`input-edit-price-${product.id}`}
                          />
                          <Input
                            value={editFormData.imageUrl}
                            onChange={(e) => setEditFormData({ ...editFormData, imageUrl: e.target.value })}
                            placeholder="Image URL"
                            data-testid={`input-edit-image-${product.id}`}
                          />
                        </div>
                      ) : (
                        <div className="flex-1">
                          <h3 className="font-semibold" data-testid={`text-product-name-${product.id}`}>
                            {product.name}
                          </h3>
                          <p className="text-lg font-bold text-primary" data-testid={`text-product-price-${product.id}`}>
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {editingId === product.id ? (
                          <>
                            <Button
                              size="icon"
                              variant="default"
                              onClick={() => handleUpdateProduct(product.id)}
                              data-testid={`button-save-${product.id}`}
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={cancelEdit}
                              data-testid={`button-cancel-${product.id}`}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => startEdit(product)}
                              data-testid={`button-edit-${product.id}`}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDeleteProduct(product.id)}
                              data-testid={`button-delete-${product.id}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
