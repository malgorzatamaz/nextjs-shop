import Image from "next/image";
import { useState } from "react";

import { Item } from "types/Item";
import AddToCart from "./AddToCart";

const ProductItem = ({ item }: { item: Item }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div>
          <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
            <Image
              src={item.image}
              width={200}
              height={100}
              alt="Front of men&#039;s Basic Tee in black."
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {item.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
          <button
            onClick={() => {
              setOpenModal(true);
            }}
            className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Add to cart
          </button>
        </div>
      </div>
      {openModal && (
        <AddToCart onClose={() => setOpenModal(false)} item={item} />
      )}
    </>
  );
};

export default ProductItem;
