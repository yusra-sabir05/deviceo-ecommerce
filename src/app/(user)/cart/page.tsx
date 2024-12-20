import { auth } from "@/auth";
import CartContainer from "@/components/cartContainer";
import Container from "@/components/container";
import React from "react";

const CartPage = async () => {
  const session = await auth();

  return (
    <Container className="py-10">
      <CartContainer session={session} />
    </Container>
  );
};

export default CartPage;
