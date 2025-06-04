import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="bg-cover bg-[url(https://res.cloudinary.com/drk8qt8ak/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1748786293/taxi_image_swqmlt.jpg)] h-screen w-screen pt-8  flex justify-between flex-col  ">
        <div>
          <p className="heading-font text-gray-900 px-5 text-3xl font-extrabold ">
            VRoom
          </p>
        </div>

        <div className="bg-white py-4 px-6 rounded">
          <h2 className="text-black text-2xl text-center font-semibold  tracking-wide">
            Get started with Vroom
          </h2>
          <Link
            to="/login"
            className="bg-black flex justify-center text-white px-5 py-2 w-full mt-3 mb-2 rounded "
          >
            Continue
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
