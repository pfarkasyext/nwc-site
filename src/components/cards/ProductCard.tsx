// src/components/LocationCard.tsx

import { CardComponent, CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Product from "../../types/products";
import InventoryModal from "../product-inventory-modal";
import { useState } from "react";

const ProductCard: CardComponent<Product> = ({
  result,
}: CardProps<Product>): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const product = result.rawData;
  const hrefURL = "/" + product.slug;
  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <InventoryModal
        productName={product.name}
        stockAvailability={product.c_inStock}
        isOpen={isOpen}
        onClose={closeDialog}
      ></InventoryModal>
      <div className="flex flex-col items-center p-4 text-center">
        <div className="rounded-full">
          <img
            src={product.c_cImageURLText}
            className="object-contain w-32 rounded-full pb-4"
          />
        </div>
        <a
          target={"_self"}
          href={hrefURL}
          className="font-semibold text-brand-primary"
          rel="noreferrer"
        >
          {product.name}
        </a>
        <button
          onClick={openDialog}
          className="text-xs text-brand-cta-hover italic underline"
        >
          Check store inventory
        </button>
        <div>${product.c_cPrice}</div>
      </div>
    </div>
  );
};

export default ProductCard;
