// src/components/LocationCard.tsx

import { CardComponent, CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Product from "../../types/products";

const ProductCard: CardComponent<Product> = ({
  result,
}: CardProps<Product>): JSX.Element => {
  const product = result.rawData;
  const hrefURL = "/" + product.slug;

  return (
    <div>
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
        <button className="text-xs text-brand-cta-hover italic underline">Check store inventory</button>
        <div>${product.c_cPrice}</div>
      </div>
    </div>
  );
};

export default ProductCard;
