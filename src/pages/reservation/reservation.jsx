import OutletCards from "../../components/global/OutletCards";
import { useEffect, useState } from "react";
import Navbar from "../../components/global/Nav";

const Reservation = () => {
  const [OutletsData, SetOutletsData] = useState([]);

  useEffect(() => {
    fetch("/data/outlets.json")
      .then((res) => res.json())
      .then((json) => {
        SetOutletsData(json.data);
      })
      .catch((err) => console.error("Failed to fetch outlet data:", err));
  }, []);

  return (
    <div>
      <div>
        <Navbar />
        {OutletsData.length > 0 ? (
          <div className="grid gap-8 bg-[#BA0202] p-4 py-40 xl:py-40 xl:px-40 justify-center grid-cols-1 md:grid-cols-2 ">
            <OutletCards items={OutletsData} />
          </div>
        ) : (
          <div className="h-80 items-center justify-center flex">
            <p className="text-center">
              There are no outlets, an error may occured
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservation;
