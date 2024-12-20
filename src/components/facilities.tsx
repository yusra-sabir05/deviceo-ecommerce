import {
  Clock8,
  MessageSquareQuote,
  Rocket,
  WalletMinimal,
} from "lucide-react";
import React from "react";
const data = [
  {
    title: "Free Delivery",
    description: "When ordering above $1500",
    icon: <Rocket />,
  },
  {
    title: "90 Days Return",
    description: "If goods have problems",
    icon: <Clock8 />,
  },
  {
    title: "Secure Payments",
    description: "100% secure payment",
    icon: <WalletMinimal />,
  },
  {
    title: "24/7 Support",
    description: "Dedicated support ",
    icon: <MessageSquareQuote />,
  },
];
const Facilities = () => {
  return (
    <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
      {data.map((item) => (
        <div
          key={item.title}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <span className="text-3xl text-lightGreen">{item?.icon}</span>
          <div className="text-center sm:text-left">
            <h2 className="uppercase font-bold">{item?.title}</h2>
            <p className="text-sm text-lightText">{item?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Facilities;
