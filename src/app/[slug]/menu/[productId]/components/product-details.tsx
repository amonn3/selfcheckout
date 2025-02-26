"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { CartContext } from "@/app/[slug]/menu/contexts/cart";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import CartSheet from "./cart-sheet";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { toggleCart, addProduct } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity,
    });
    toggleCart();
  };
  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl bg-background p-5">
        <div className="flex-auto overflow-hidden">
          {/* RESTAURANTE */}
          <div className="flex items-center gap-1.5">
            <Image
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              width={16}
              height={16}
              className="rounded-full"
            />
            <p className="text-xs text-muted-foreground">
              {product.restaurant.name}
            </p>
          </div>

          {/* PRODUCT NAME */}
          <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

          {/* PRICE AND QUANTITY */}
          <div className="mt-3 flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {formatCurrency(product.price)}
            </h3>
            <div className="flex items-center gap-3 text-center">
              <Button
                onClick={handleDecreaseQuantity}
                className="h-8 w-8 rounded-xl"
                variant="outline"
                size="icon"
              >
                <ChevronLeftIcon />
              </Button>
              <p className="w-4">{quantity}</p>
              <Button
                onClick={handleIncreaseQuantity}
                className="h-8 w-8 rounded-xl"
                variant="destructive"
                size="icon"
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>

          <ScrollArea className="mt-6 h-full">
            {/* DESCRIPTION */}
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold">Sobre</h4>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* INGREDIENTS */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-1.5">
                <ChefHatIcon size={18} />
                <h4 className="font-semibold">Ingredientes</h4>
              </div>
              <ul className="list-disc px-5 text-sm text-muted-foreground">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </ScrollArea>
        </div>

        {/* ADD TO CART */}
        <Button className="mt-2 w-full rounded-full" onClick={handleAddToCart}>
          Adicionar à sacola
        </Button>
      </div>
      <CartSheet />
    </>
  );
};

export default ProductDetails;
