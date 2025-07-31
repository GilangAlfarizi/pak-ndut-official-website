import React from "react";
import Navbar from "../../components/global/Nav";
import OutletCards from "../../components/global/OutletCards";
import JsonData from "../../../public/data/outlets.json";

const Reservation = () => {
  const Data = JsonData.data

  return (
    <div>
      <div>
        <Navbar />
        <div className="grid gap-8 bg-[#BA0202] p-4 py-40 xl:py-40 xl:px-40 justify-center grid-cols-1 md:grid-cols-2 ">
          <OutletCards items={Data} />
        </div>
      </div>
    </div>
  );
};

export default Reservation;
