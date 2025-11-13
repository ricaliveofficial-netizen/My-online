import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Carousel from "@/components/Carousel";
import ProductGrid from "@/components/ProductGrid";
import { type Product } from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";
import heroImage1 from '@assets/generated_images/Bluetooth_speaker_hero_image_377cf9fc.png';
import heroImage2 from '@assets/generated_images/Leather_backpack_hero_image_3ca20248.png';
import heroImage3 from '@assets/generated_images/Smart_watch_hero_image_7c696ce3.png';
import heroImage4 from '@assets/generated_images/Premium_headphones_hero_image_fba9dc73.png';
import laptopImage from '@assets/generated_images/Laptop_product_square_9570ba8c.png';
import earbudsImage from '@assets/generated_images/Wireless_earbuds_product_ac295f19.png';
import clockImage from '@assets/generated_images/Modern_wall_clock_6531b29e.png';
import mugImage from '@assets/generated_images/Ceramic_coffee_mug_198a74fa.png';

const STORAGE_KEY = "myshop_products";

const carouselImages = [heroImage1, heroImage2, heroImage3, heroImage4];

const initialProducts: Product[] = [
  { id: '1', name: 'Premium Laptop', price: 1299.99, imageUrl: laptopImage },
  { id: '2', name: 'Wireless Earbuds', price: 149.99, imageUrl: earbudsImage },
  { id: '3', name: 'Modern Wall Clock', price: 79.99, imageUrl: clockImage },
  { id: '4', name: 'Ceramic Coffee Mug', price: 24.99, imageUrl: mugImage },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedProducts = localStorage.getItem(STORAGE_KEY);
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (e) {
        console.error("Error parsing stored products:", e);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
        setProducts(initialProducts);
      }
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
      setProducts(initialProducts);
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleSearch = (query: string) => {
    toast({
      title: "Search",
      description: `Searching for: ${query}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      
      <Carousel images={carouselImages} />

      <main className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2" data-testid="text-section-title">Featured Products</h2>
          <p className="text-muted-foreground">Discover our curated selection of premium products</p>
        </div>
        
        <ProductGrid products={products} onAddToCart={handleAddToCart} />
      </main>
    </div>
  );
}
