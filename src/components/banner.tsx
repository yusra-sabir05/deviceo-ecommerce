import { getBannerData } from "@/lib/gitdata";
import React from "react";
import Container from "./container";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Button from "./button";
import { BannerData } from "../../type";
import FormatedPrice from "./formatedPrice";

const Banner = async () => {
  const banners = await getBannerData();

  const singleBanner = banners[0];

  return (
    <div>
      <Container className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10 md:max-h-[600px]">
        {/* Left half - single image */}

        <div className="md:col-span-2 bg-bgLight relative flex items-center justify-between rounded-lg overflow-hidden group">
          {/* Changed items-end to items-center for vertical centering */}

          <div className="flex flex-col justify-center gap-5 md:gap-10 p-5">
            {/* Added padding for spacing around text content */}

            <div className="flex flex-col gap-1 md:gap-3">
              <button className="bg-lightGreen text-white rounded-full w-20 py-1 text-sm font-semibold hover:bg-yellow-700 hoverEffect ">
                Sale {singleBanner?.price}
              </button>

              <p className="text-xl font-semibold md:text-2xl">
                {singleBanner?.title}
              </p>

              <h2 className="text-2xl font-bold md:text-5xl">
                {singleBanner?.subtitle}
              </h2>

              <p className="text-xs font-medium text-black/60 md:text-sm max-w-44">
                {singleBanner?.description}
              </p>
            </div>

            <Link href={"/shop"}>
              <Button className="px-0 w-36 py-2.5 text-sm ">Shop Now</Button>
            </Link>
          </div>

          <Image
            src={urlFor(singleBanner?.image).url()}
            alt={singleBanner?.title}
            width={400}
            priority
            height={400}
            // Changed h-72 to md:h-full to allow the image to fill its container on larger screens

            className="object-contain h-72 md:h-full max-h-[600px] self-end group-hover:scale-105 hoverEffect"
          />
        </div>
        {/* right half - double image  */}
        <div className="flex flex-col space-y-5 md:space-y-10 h-auto md:max-h-[600px]">
          {banners.slice(1.3).map((item: BannerData) => (
            <div
              key={item?._id}
              className="h-full md:h-1/2 bg-bgLight rounded-lg overflow-hidden flex justify-center items-center p-5 group"
            >
              <div className="w-1/2 flex flex-col">
                <div>
                  <p className="text-2xl font-semibold">{item?.title}</p>
                  <p className="text-3xl font-bold">{item?.subtitle}</p>
                  <p className="text-black/60 mt-3 font-medium">
                    from{" "}
                    <FormatedPrice
                      amount={item?.price}
                      className="text-lightRed font-bold"
                    />
                  </p>
                  <Link
                    href={"/shop"}
                    className="mt-5 font-bold underline underline-offset-2 decoration-[1px] hover:text-darkblueViolet hoverEffect"
                  >
                    Shop now!
                  </Link>
                </div>
              </div>
              <Image
                src={urlFor(item?.image).url()}
                alt={item?.title}
                width={500}
                priority
                height={500}
                className="object-contain h-72 md:h-60 w-1/2 group-hover:scale-105 hoverEffect"
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Banner;
