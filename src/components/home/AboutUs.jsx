const H3Style = "text-[#BA0202] text-xl font-bold";

const About = () => {
  return (
    <div className="bg-[#BA0202] p-4 md:p-18 w-[100v]">
      <div className="bg-white rounded-xl">
        <div className="xl:flex">
          <div className="flex aspect-square w-full items-center h-[80vh]">
            <div className="p-4 lg:p-8 md:px-20 lg:px-40">
              <h3 className={H3Style}>About us</h3>
              <p className="mt-2">
                Bebek & Ayam Goreng Pak Ndut began as a small food stall in
                Kartasura and has grown into a trusted franchise with over 27
                outlets across Indonesia and Singapore. Known for serving halal,
                hygienic, and authentic Indonesian flavors, the brand continues
                to expand under PT Indo PD Mandiri, guided by strong values and
                a commitment to quality.
              </p>
            </div>
          </div>
          <div className="aspect-square w-full bg-[#FFCC29] lg:rounded-tr-xl rounded-none">
            image 2
          </div>
        </div>
        <div className="xl:flex">
          <div className="flex lg:aspect-square w-full items-center h-[80vh] order-last">
            <div className="p-4 lg:p-8 md:px-20 lg:px-40">
              <h3 className={H3Style}>Our Vision & Mission</h3>
              <p className="mt-2">
                The company's operational development is always guided by its
                vision and mission. These serve as the foundation that helps the
                company stay focused on its goals.
              </p>
              <h4 className="mt-4 font-bold">VISION</h4>
              <p className="mt-1">
                To become an international food company that serves halal and
                healthy meals for people all around the world.
              </p>
              <h4 className="mt-2 font-bold">MISSION</h4>
              <p className="mt-1">
                1. Establish internationally standardized poultry
                slaughterhouses and production facilities
              </p>
              <p>2. Ensure halal compliance and hygiene in all areas</p>
              <p>3. Enhance the skills and knowledge of all team members</p>
              <p>4. Secure a stable supply of raw materials</p>
              <p>5. Build an integrated system from upstream to downstream</p>
            </div>
          </div>
          <div className="aspect-square w-full bg-[#FFCC29]">image 2</div>
        </div>
        <div className="xl:flex">
          <div className="flex lg:aspect-square w-full items-center h-[80vh]">
            <div className="p-4 lg:p-8 md:px-20 lg:px-40">
              <h3 className={H3Style}>Our History</h3>
              <p className="mt-2">
                Founded in 1997 by Mr. and Mrs. Mahmudi in a small food stall,
                Pak Ndut started by serving just 3–5 chickens a day. As
                customers grew, the modest 8-seat stall expanded to 100 seats.
                The name "Pak Ndut" was inspired by Mr. Mahmudi’s figure at the
                time. Later, his son-in-law Agus Ahmadi developed the business
                into a franchise under the brand "Bebek & Ayam Goreng Pak Ndut
                Kartosuro."
              </p>
            </div>
          </div>
          <div className="aspect-square w-full bg-[#FFCC29] rounded-b-xl lg:rounded-br-xl lg:rounded-bl-none">
            image 3
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
