import GIF from "../../../public/images/KriteriaLokasi.gif";

const Criteria = () => {
  return (
    <div className="flex bg-[#BA0202] justify-center">
      <div className="flex lg:w-[40vw] justify-center p-4 md:p-12">
        <div className="gap-8">
          <div className="flex justify-center">
            <h2 className="text-4xl font-black text-center text-[#FFCC29]">
              Location Criteria
            </h2>
          </div>
          <div className="my-8">
            <img src={GIF} alt="GIF" className="rounded-4xl" />
          </div>
          <div className="text-white">
            <p>
              The franchise partnership for Bebek & Ayam Goreng Pak
              Ndut lasts for 5 years and can be extended. This partnership
              operates under a royalty fee system, and during the 5-year period,
              our team will assist the investor with operations. The royalty fee
              is 5% of the sales of raw materials (duck and chicken) and/or
              seasonings supplied from the central office. 
              
            </p>
            <br/>
            <p>

              During the Grand
              Opening, the central office will also provide support in the form
              of raw materials (duck & chicken). In addition, we will provide
              the assistance of expert staff before and after the Grand Opening,
              within a period specified by us. The attached Franchise Package
              does not include exhaust system, gas installation, stainless
              equipment, and furniture set. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Criteria;
