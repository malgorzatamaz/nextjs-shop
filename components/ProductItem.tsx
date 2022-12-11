import Image from "next/image";
import { useRouter } from "next/router";
import { Item } from "types/Item";
import { BASE_URL } from "utils";

interface Props {
  item: Item;
}

const ProductItem = ({ item }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${router.basePath}/item/${item.id}`);
  };

  return (
    <a
      onClick={handleClick}
      className="hover:bg-gray-50 cursor-pointer border rounded-md py-3 px-4 "
    >
      <div>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          {item?.image && (
            <Image
              src={item.image}
              width={300}
              height={300}
              alt="Front of men&#039;s Basic Tee in black."
              className="object-contain object-fit-contain"
            />
          )}
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">{item.title}</h3>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-900">
          {item.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
    </a>
  );
};

export default ProductItem;
