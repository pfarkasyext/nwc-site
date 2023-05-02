import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "@yext/pages/components";
import Cta from "./cta";
import HoursText from "./HoursText";
import { BsPhone } from "react-icons/bs";

const Carousel = (props: any) => {
  const { data, entityType } = props;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {data.map((subItem: any, subIndex: number) => {
        const { rawData, name } = subItem;
        const productUrl = "https://healthily-magnetic-hoverfly.sbx.pgsdemo.com/" + rawData.slug;
        return (
          <a
            className="flex flex-col overflow-hidden space-y-2 rounded-lg   "
            key={subIndex}
            style={{ maxHeight: "400px", overflow: "hidden" }}
            href={productUrl}
          >
            <div style={{ height: "150px" }} className="bg-gray-50">
              <img
                style={{ height: "100%", objectFit: "contain" }}
                className="rounded-lg p-3 object-cover m-auto"
                src={rawData.c_cImageURLText}
                alt=""
              />
            </div>

            <div className="font-semibold flex-flex-col space-y-1 text-center text-brand-primary">
              <div>{rawData.name}</div>
              {entityType?.toLowerCase() === "stores" && (
                <div className="text-xs text-gray-500 ">As low as 0% APR</div>
              )}
            </div>
          </a>
        );
      })}
    </Slider>
  );
};

export default Carousel;