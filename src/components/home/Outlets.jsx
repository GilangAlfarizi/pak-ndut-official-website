import GIF from "../../../public/images/Pak_Ndut_Lokasi_Cabang_Outlet[1].gif";
import AccordionOutlet from "../global/AccordionOutlet";
import Data from "../../../public/data/outlets.json";

const Outlets = () => {
  const rawData = Data;

  const accordionData = [];

  rawData.data.forEach((item) => {
    const existingProvince = accordionData.find(
      (entry) => entry.province === item.province
    );

    const outlet = {
      id: item.id,
      name: item.name,
      address: item.address,
      province: item.province,
      open_hours: item.open_hours,
      map_url: item.map_url,
      phone: item.phone
    };

    if (existingProvince) {
      existingProvince.outlets.push(outlet);
    } else {
      accordionData.push({
        id: accordionData.length + 1,
        province: item.province,
        outlets: [outlet],
      });
    }
  });

  // const accordionData = [
  //   {
  //     id: 1,
  //     province: "Jawa Barat",
  //     outlets: [
  //       {
  //         id: 1,
  //         name: "Bebek Goreng Pak Ndut Bandung",
  //         address:
  //           "Jl. Halimun No.10, Malabar, Kec. Lengkong, Kota Bandung, Jawa Barat 40262",
  //         province: "Jawa Barat",
  //         open_hours: "09:00 - 21:00",
  //         map_url:
  //           "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d16341427.909927124!2d102.662085!3d0.5905075!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e62acc7746b7%3A0xb3c04852815fadc!2sBebek%20Goreng%20Pak%20Ndut!5e0!3m2!1sen!2sid!4v1753805857592!5m2!1sen!2sid",
  //       },
  //       {
  //         id: 2,
  //         name: "Bebek Goreng Pak Ndut Air Mancur",
  //         address:
  //           "Jl. Pemuda No.9A, RT.3/RW.7, Tanah Sareal, Kec. Tanah Sereal, Kota Bogor, Jawa Barat 16161",
  //         province: "Jawa Barat",
  //         open_hours: "08:00 - 21:30",
  //         map_url:
  //           "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15853.737558895695!2d106.7933146!3d-6.5928081!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c58834af952d%3A0xfab6a58b78901779!2sBebek%20Pak%20Ndut%20Bogor%20Air%20Mancur!5e0!3m2!1sen!2sid!4v1753806000740!5m2!1sen!2sid",
  //       },
  //     ],
  //   },
  // ];

  return (
    <div className="bg-[#BA0202] p-4 md:p-12 2xl:p-20 2xl:px-83 xl:px-32 lg:px-28 w-[100v]">
      <div className="bg-white rounded-4xl">
        <div className="p-4 xl:p-20 ">
          <h2 className="text-4xl font-black text-center text-[#BA0202]">
            Our Outlets
          </h2>
          <img src={GIF} alt="GIF" className="rounded-4xl mt-8" />
        </div>
        <div className="flex bg-[#FFCC29] h-80 p-8 justify-center">
          <div className=" w-240 flex">
            <div className="flex  w-full h-full justify-center items-center">
              <div className="text-center text-[#BA0202]">
                <h4 className="text-8xl font-bold">29</h4>
                <p className="font-bold">Outlets</p>
              </div>
            </div>
            <div className="flex w-full h-full justify-center items-center">
              <div className="text-center text-[#BA0202]">
                <h4 className="text-8xl font-bold">6</h4>
                <p className="font-bold">Cities</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 xl:p-20">
          <AccordionOutlet items={accordionData} />
        </div>
      </div>
    </div>
  );
};

export default Outlets;
