import { useEffect, useState } from "react";
import Carousel from "../carousel";
import * as React from "react";
import Loader from "../loader";

const FeaturedProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(
          "https://sbx-cdn.us.yextapis.com/v2/accounts/me/search/vertical/query?experienceKey=answers&api_key=d2471212e8121452a0204c59c9a08bd4&v=20220511&locale=en&input=&verticalKey=products&filters=%7B%22c_isFeatured%22%3A%7B%22%24eq%22%3Atrue%7D%7D"
        );
        if (response.ok) {
          const data = await response.json();
          setData(data.response); // Update the data state
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading state to false regardless of success or error
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <>
      {!loading ? ( // Render if not loading
        <div className="space-y-8 pb-8 centered-container">
          <div className="text-2xl font-semibold my-8">Featured Products</div>
          <div className="flex ">
            <div className="overflow-hidden">
              <Carousel data={data} entityType="Product" />
            </div>
          </div>
        </div>
      ) : (
        // Render loading state if loading
        <div className="space-y-8 pb-8 centered-container">
          <div className="text-2xl font-semibold my-8">Featured Products</div>
          <div className="flex justify-center">
            <div className="overflow-hidden">
              <Loader></Loader>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { FeaturedProducts };
