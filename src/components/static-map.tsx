import * as React from "react";

type Coordinates = {
  latitude: string;
  longitude: string;
};

const StaticMap = (props: Coordinates) => {
  const { latitude, longitude } = props;

  return (
    <>
      <img
        className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
        // width="300"
        // height="200"
        src={
          "https://maps.googleapis.com/maps/api/staticmap?center=" +
          `${latitude}` +
          "," +
          `${longitude}` +
          "&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7Clabel:LL%7C" +
          `${latitude}` +
          "," +
          `${longitude}` +
          "&key=AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18"
        }
      ></img>
    </>
  );
};

export default StaticMap;
