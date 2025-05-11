import { ReturnOrderType } from "./types/order-types";

type EachOrderPageProps = {
  order: ReturnOrderType;
};

export default function EachOrderPage({ order }: EachOrderPageProps) {
  return (
    <div className="max-w-8xl mx-auto space-y-6">
      <div
        key={order.orderId}
        className="border border-gray-300 bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
      >
        {/* Book cover and details */}
        <div className="flex items-center gap-4">
          {/* Book cover image */}
          <div className="aspect-[3/4] max-w-[145px] w-full ">
            <img
              src={order.bookImage}
              alt={order.bookTitle}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/400x600?text=No+Cover";
              }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-800">
              {order.bookTitle}
            </h3>
            <p className="text-sm text-gray-600">Order ID: {order.orderId}</p>
            <p className="text-sm text-gray-600">
              Quantity: {order.cartQuantity}
            </p>
            <p className="text-sm text-gray-600">
              Unit Price: RM {Number(order.bookPrice).toFixed(2)}
            </p>
            <p className="text-md text-gray-600 font-bold">
              Total: RM{" "}
              {(order.cartQuantity * Number(order.bookPrice)).toFixed(2)}
            </p>
          </div>
        </div>
        {/* Order status and created time */}
        <div className="text-right mt-4 md:mt-0">
          <p className="text-sm text-gray-500 font-bold">
            Status: {order.cartStatus}
          </p>
          <p className="text-xs text-gray-400">
            Ordered on: {new Date(order.createTime).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
