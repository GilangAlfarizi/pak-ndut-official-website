const H3Style = "text-[#BA0202] text-xl font-bold";

const About = () => {
  return (
    <div className="bg-[#BA0202] p-8 w-[100v]">
      <div className="bg-white">
        <div className="grid lg:grid-cols-2 lg:grid-rows-3 h-full grid-cols-1 grid-rows-6">
          <div className="order-1 lg:order-1 flex items-center">
            <div className="p-4">
              <h3 className={H3Style}>About us</h3>
              {/* <p className="mt-2">
                Rooted in tradition, we bring authentic fried duck prepared with
                family recipes, modern hospitality, and a warm Indonesian
                welcome.
              </p> */}
            </div>
          </div>
          <div className="order-2 lg:order-2 bg-yellow-400">
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdupQNhCkDjLvFFJndUr7uLfVkJdaZ8BsQvA&s" alt="Image" className="h-full w-full"/> */}
          </div>
          <div className="order-4 lg:order-3 bg-yellow-400">
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdupQNhCkDjLvFFJndUr7uLfVkJdaZ8BsQvA&s" alt="Image" className="h-full w-full"/> */}
          </div>
          <div className="order-3 lg:order-4 flex items-center">
            <div className="p-4">
              <h3 className={H3Style}>Our Vision & Mission</h3>
              <p className="mt-2">
                Pengembangan operasional perusahaan selalu berpedoman pada visi
                dan misi. Dari Visi dan Misi inilah yang membantu perusahaan
                agar tetap fokus pada tujuan perusahaan yang ingin dicap
              </p>
              <h4>VISI</h4>
              <p>
                Menjadi sebuah perusahaan makanan tingkat Internasional yang
                menyajikan makanan halal dan sehat untuk seluruh orang di dunia.
              </p>
              <h4>MISI</h4>
              <p>
                1. Membangun rumah potong unggas dan rumah produksi standart
                international
              </p>
              <p>2. Menjaga kehalalan dan higienitas di semua area</p>
              <p>
                3. Meningkatkan ketrampilan dan pengetahuan semua anggota team
              </p>
              <p>4. Mengamankan suply bahan baku</p>
              <p>
                5. Membangun sistem yang terintegrasi dari hulu sampai hilir
              </p>
            </div>
          </div>
          <div className="order-5 lg:order-5 flex items-center">
            <div className="p-4">
              <h3 className={H3Style}>Our History</h3>
              {/* <p className="mt-2">
                Founded in 1997 by Mr. and Mrs. Mahmudi in a small food stall,
                Pak Ndut started by serving just 3–5 chickens a day. As
                customers grew, the modest 8-seat stall expanded to 100 seats.
                The name "Pak Ndut" was inspired by Mr. Mahmudi’s figure at the
                time. Later, his son-in-law Agus Ahmadi developed the business
                into a franchise under the brand "Bebek & Ayam Goreng Pak Ndut
                Kartosuro."
              </p> */}
            </div>
          </div>
          <div className="order-6 lg:order-6 bg-yellow-400">
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdupQNhCkDjLvFFJndUr7uLfVkJdaZ8BsQvA&s" alt="Image" className="h-full w-full"/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
