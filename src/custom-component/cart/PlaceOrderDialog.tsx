import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SetStateAction } from "react";
import useCart from "./custom-hook/useCart";
import useOrder from "../order/custom-hook/useOrder";
import { toast } from "sonner";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router";

type PlaceOrderDialogProps = {
  open: boolean;
  onOpenChange: React.Dispatch<SetStateAction<boolean>>;
  btnClassName: string;
  totalPrice: number;
  disabled: boolean;
  checkedBook: number[];
};

export default function PlaceOrderDialog({
  open,
  onOpenChange,
  btnClassName,
  totalPrice,
  disabled,
  checkedBook,
}: PlaceOrderDialogProps) {
  const [userId, _] = useLocalStorage<number | null>("userId", null);
  const navigate = useNavigate();
  const { placeOrder } = useOrder({ userId: userId });
  const { cartItems } = useCart({ userId: userId });
  const cartToCheckout = cartItems?.filter((item) =>
    checkedBook.includes(item.cartId)
  );

  const handlePlaceOrder = async () => {
    if (!cartToCheckout || cartToCheckout.length === 0) {
      return;
    }

    const orderToPlace = cartToCheckout.map((item) => {
      return {
        user: {
          userId: item.userId,
        },
        book: {
          bookId: item.bookId,
        },
        cartId: item.cartId,
        cartQuantity: item.bookQuantity,
      };
    });

    try {
      await placeOrder(orderToPlace);
      toast("Success", {
        description: "Order placed successful",
      });
      navigate("/order");
    } catch (error) {
      toast("Error", {
        description: "Error placing order. Please try again later",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default" className={btnClassName} disabled={disabled}>
          Place order
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col sm:max-w-[800px] sm:max-h-[600px] h-full">
        <DialogHeader>
          <DialogTitle>Place Order</DialogTitle>
          <DialogDescription>
            Please click the Confirm button to place the order.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 overflow-y-scroll">
          <div className="flex flex-col space-y-4 w-full">
            {cartToCheckout?.map((item) => (
              <div
                key={item.cartId}
                className="flex justify-between items-start border-b pb-4"
              >
                <div className="flex flex-col max-w-[70%]">
                  <span className="font-medium text-gray-800">
                    {item.bookTitle}
                  </span>
                  <div className="text-sm text-gray-600">
                    Quantity: {item.bookQuantity}
                  </div>
                </div>
                <div className="text-right whitespace-nowrap">
                  <div className="text-sm text-gray-500">Unit Price</div>
                  <div className="font-semibold text-gray-800">
                    RM {Number(item.bookPrice).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="flex items-center gap-4 mt-4">
          <div className="flex gap-2 mr-auto items-center text-lg font-medium">
            <span>Total Price:</span>
            <span className="text-xl font-bold text-gray-800">
              RM {totalPrice.toFixed(2)}
            </span>
          </div>
          <Button
            type="submit"
            className={btnClassName}
            onClick={handlePlaceOrder}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
