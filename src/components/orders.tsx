"use client";
import { db } from "@/firebase";
import { collection, deleteDoc, doc, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { ProductData } from "@/type";
import FormatedPrice from "./formatedPrice";
import Table, {
  Card,
  Badge,
  Button,
  CardContent,
  CardHeader,
  CardTitle,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui";
import Link from "next/link";

interface Order {
  id: string;
  value: {
    amount: number;
    items: ProductData[];
  };
}

const Orders = () => {
  const { data: session } = useSession();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleDetails = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const [ordersSnapshot, loading] = useCollection(
    session &&
      query(collection(db, "users", session?.user?.email as string, "orders"))
  );
  const orders = ordersSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];

  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteDoc(
        doc(db, "users", session?.user?.email as string, "orders", id)
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      toast.success("Deleted action dispatched");
    }
  };

  return (
    <div className="flex flex-col gap-y-5 mt-5">
      {loading ? (
        <div className="flex flex-col flex-1 space-y-6 overflow-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-full py-20 rounded-md shrink-0 animate-pulse bg-zinc-400"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {orders?.length ? (
            <>
              <h2 className="text-2xl font-semibold">Orders Data</h2>
              {orders.map((item: Order) => (
                <div key={item?.id}>
                  <Card
                    className={
                      expandedOrderId === item.id ? "border-darkOrange/30" : ""
                    }
                  >
                    <CardHeader>
                      <CardTitle>
                        Order ID:{" "}
                        <span className="text-base tracking-wide">
                          {item.id.slice(-10)}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm font-medium text-black/60">
                            Total Amount
                          </p>
                          <FormatedPrice
                            amount={item?.value?.amount}
                            className="text-lg font-semibold"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-black/60">
                            Payment Status
                          </p>
                          <Badge variant="success">Paid</Badge>
                        </div>
                        <Button onClick={() => toggleDetails(item.id)}>
                          {expandedOrderId === item.id
                            ? "Hide Details"
                            : "Show Details"}
                        </Button>
                        <Button
                          onClick={() => handleDeleteOrder(item?.id)}
                          variant="delete"
                        >
                          <MdClose className="text-base mt-1" /> Delete order
                        </Button>
                      </div>
                    </CardContent>
                    <AnimatePresence>
                      {expandedOrderId === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="border-0 border-t rounded-none">
                            <CardHeader>
                              <CardTitle>Order Items</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Item</TableHead>
                                    <TableHead className="text-center">
                                      Price
                                    </TableHead>
                                    <TableHead className="text-center">
                                      Quantity
                                    </TableHead>
                                    <TableHead className="text-right">
                                      Subtotal
                                    </TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {item?.value?.items?.map(
                                    (product: ProductData) => (
                                      <TableRow key={product?._id}>
                                        <TableCell>{product?.title}</TableCell>
                                        <TableCell className="text-center">
                                          <FormatedPrice
                                            amount={product?.price}
                                          />
                                        </TableCell>
                                        <TableCell className="text-center">
                                          {product?.quantity}
                                        </TableCell>
                                        <TableCell className="text-right font-semibold">
                                          <FormatedPrice
                                            amount={
                                              product?.price * product?.quantity
                                            }
                                          />
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </div>
              ))}
            </>
          ) : (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center py-10"
            >
              <div className="flex items-center max-w-[500px] p-4 py-8 bg-white rounded-md shadow-lg gap-4">
                <Image
                  src="/images/shoppingbag.png" // Your image path
                  alt="Orders Representation"
                  width={200} // Specify desired width
                  height={200} // Specify desired height
                  className="rounded-md"
                />
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold uppercase text-center text-black mb-2">
                    Your data is empty
                  </h1>
                  <p className="text-sm text-center text-black px-2 mt-2">
                    It looks like you have not placed any orders yet. Browse our
                    collection and make your first purchase today
                  </p>
                  <Link
                    href="/shop"
                    className="bg-blueViolet text-white hover:bg-darkblueViolet hoverEffect px-8 py-3 rounded-lg font-semibold text-center mt-4"
                  >
                    Start Shopping
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
