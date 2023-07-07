import * as React from "react";
import { Matcher, useSearchActions } from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import { Image } from "@yext/pages/components";
import Carousel from "../carousel";
import ProductCard from "../cards/ProductCard";

type HomeResultsProps = {
  initialVerticalKey: string[];
  initialNames: string[];
};

const FeaturedProducts = ({
  initialVerticalKey,
  initialNames,
}: HomeResultsProps) => {
  const [data, setData] = useState<any>([]);
  const searchActions = useSearchActions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    {
      const x = initialVerticalKey.map((item, index: number) => {
        searchActions.setVertical(item);
        searchActions.setQuery("featured");
        return searchActions.executeVerticalQuery().then((res) => {
          searchActions.setQuery("");
          return { entityType: initialNames[index], res };
        });
      });
      Promise.all(x).then((results) => {
        setData(results);
        setLoading(false);
      });
    }
  }, [initialVerticalKey]);

  return (
    <>
      {!loading && (
        <>
          <div className="space-y-8 pb-8 centered-container ">
            {data.map((item: any, index: any) => {
              const { entityType, res } = item;
              return (
                <span key={index}>
                  <div className="flex flex-col">
                    <div className="text-2xl font-semibold my-8">
                      Featured {entityType}
                    </div>
                    <div className=" overflow-hidden">
                      <Carousel
                        data={res.verticalResults.results}
                        entityType={entityType}
                      />
                    </div>
                  </div>
                  {index !== data.length - 1 && <hr className="my-10" />}
                </span>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export { FeaturedProducts };
