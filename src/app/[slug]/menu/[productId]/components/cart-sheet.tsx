import { useContext } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader,SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../../contexts/cart";

const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext); 
  return (
    <>
      <Sheet open={isOpen} onOpenChange={toggleCart} >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sacola</SheetTitle>
            <SheetDescription>description</SheetDescription>
          </SheetHeader>
          {
            products.map((product: { id: string; name: string; quantity: number }) => {
              return (
                <div key={product.id}>
                  <h1> {product.name} - {product.quantity} </h1>
                </div>
              );
            })
          }
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartSheet;
