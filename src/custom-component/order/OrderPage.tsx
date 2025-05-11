import { useLocalStorage } from "@uidotdev/usehooks";
import useOrder from "./custom-hook/useOrder";
import EachOrderPage from "./EachOrderPage";
import OrderSkeleton from "./skeleton/OrderSkeleton";

export default function OrderPage() {
  const [userId, _] = useLocalStorage<number | null>("userId", null);
  const { orders, orderError, orderLoading } = useOrder({ userId });

  if (orderLoading) {
    return <OrderSkeleton />;
  }

  if (orderError) {
    return <div>Error fetching orders</div>;
  }

  if (!orderError && !orderLoading && orders && orders.length === 0) {
    return <div>You do not have any orders yet</div>;
  }

  if (!orderError && !orderLoading && orders) {
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col pt-10 gap-10 w-full">
        {orders.map((order) => (
          <EachOrderPage key={order.orderId} order={order} />
        ))}
      </div>
    );
  }
}
