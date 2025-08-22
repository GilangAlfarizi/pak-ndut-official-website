import { useLanguage } from "../../context/LanguageContext";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const H3Style = "text-[#BA0202] text-xl font-bold";

const About = () => {
  const { language } = useLanguage();

  const translations = {
    en: {
      aboutTitle: "About Us",
      aboutText: `Bebek & Ayam Goreng Pak Ndut began as a small food stall in Kartasura and has grown into a trusted franchise with over 27 outlets across Indonesia and Singapore. Known for serving halal, hygienic, and authentic Indonesian flavors, the brand continues to expand under PT Indo PD Mandiri, guided by strong values and a commitment to quality.`,

      visionMission: "Our Vision & Mission",
      visionMissionText: `The company's operational development is always guided by its vision and mission. These serve as the foundation that helps the company stay focused on its goals.`,
      vision: "VISION",
      visionText: `To become an international food company that serves halal and healthy meals for people all around the world.`,
      mission: "MISSION",
      missions: [
        "Establish internationally standardized poultry slaughterhouses and production facilities",
        "Ensure halal compliance and hygiene in all areas",
        "Enhance the skills and knowledge of all team members",
        "Secure a stable supply of raw materials",
        "Build an integrated system from upstream to downstream",
      ],

      history: "Our History",
      historyText: `Founded in 1997 by Mr. and Mrs. Mahmudi in a small food stall, Pak Ndut started by serving just 3–5 chickens a day. As customers grew, the modest 8-seat stall expanded to 100 seats. The name "Pak Ndut" was inspired by Mr. Mahmudi’s figure at the time. Later, his son-in-law Agus Ahmadi developed the business into a franchise under the brand "Bebek & Ayam Goreng Pak Ndut Kartosuro."`,
    },
    id: {
      aboutTitle: "Tentang Kami",
      aboutText: `Bebek & Ayam Goreng Pak Ndut berawal dari sebuah warung kecil di Kartasura dan berkembang menjadi franchise terpercaya dengan lebih dari 27 outlet di Indonesia dan Singapura. Dikenal menyajikan cita rasa khas Indonesia yang halal, higienis, dan autentik, brand ini terus berkembang di bawah PT Indo PD Mandiri dengan berpegang pada nilai-nilai kuat dan komitmen terhadap kualitas.`,

      visionMission: "Visi & Misi Kami",
      visionMissionText: `Pengembangan operasional perusahaan selalu berpedoman pada visi dan misi yang menjadi fondasi untuk tetap fokus pada tujuan.`,
      vision: "VISI",
      visionText: `Menjadi perusahaan makanan internasional yang menyajikan hidangan halal dan sehat bagi masyarakat di seluruh dunia.`,
      mission: "MISI",
      missions: [
        "Mendirikan rumah potong ayam dan fasilitas produksi berstandar internasional",
        "Menjamin kepatuhan halal dan kebersihan di semua bidang",
        "Meningkatkan keterampilan dan pengetahuan seluruh anggota tim",
        "Menjaga ketersediaan pasokan bahan baku yang stabil",
        "Membangun sistem terintegrasi dari hulu hingga hilir",
      ],

      history: "Sejarah Kami",
      historyText: `Didirikan pada tahun 1997 oleh Bapak dan Ibu Mahmudi di sebuah warung kecil, Pak Ndut awalnya hanya menyajikan 3–5 ekor ayam per hari. Seiring bertambahnya pelanggan, warung sederhana berkapasitas 8 kursi berkembang menjadi 100 kursi. Nama "Pak Ndut" terinspirasi dari sosok Bapak Mahmudi saat itu. Kemudian, menantunya Agus Ahmadi mengembangkan usaha ini menjadi franchise dengan nama "Bebek & Ayam Goreng Pak Ndut Kartosuro."`,
    },
  };

  const t = translations[language];

  const ImageWithFallback = ({ src, alt, className }) => {
    const [error, setError] = useState(false);

    if (error) {
      return <span className="text-gray-500 text-sm">No image available</span>;
    }

    return (
      <img
        src={src}
        alt={alt}
        className={`object-cover w-full h-full ${className}`}
        onError={() => setError(true)}
      />
    );
  };

  // Komponen teks dengan animasi scroll
  const AnimatedText = ({ children, className }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="bg-[#BA0202] p-4 md:p-12 2xl:p-20 2xl:px-83 xl:px-48 lg:px-28 w-full">
      <div className="bg-white rounded-4xl">
        {/* About Us */}
        <div className="xl:flex">
          <div className="flex xl:aspect-square w-full">
            <div className="flex p-4 items-center">
              <div>
                <AnimatedText>
                  <h3 className={H3Style}>{t.aboutTitle}</h3>
                </AnimatedText>
                <AnimatedText>
                  <p className="mt-2">{t.aboutText}</p>
                </AnimatedText>
              </div>
            </div>
          </div>
          <div className="flex aspect-square w-full bg-gray-100 xl:rounded-tr-4xl justify-center items-center">
            <ImageWithFallback
              src="/images/about.jpg"
              alt="About Us"
              className="xl:rounded-tr-4xl"
            />
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="xl:flex">
          <div className="flex xl:aspect-square w-full order-last">
            <div className="flex p-4 items-center">
              <div>
                <AnimatedText>
                  <h3 className={H3Style}>{t.visionMission}</h3>
                </AnimatedText>
                <AnimatedText>
                  <p className="mt-2">{t.visionMissionText}</p>
                </AnimatedText>
                <AnimatedText>
                  <h4 className="mt-4 font-bold">{t.vision}</h4>
                </AnimatedText>
                <AnimatedText>
                  <p className="mt-1">{t.visionText}</p>
                </AnimatedText>
                <AnimatedText>
                  <h4 className="mt-2 font-bold">{t.mission}</h4>
                </AnimatedText>
                {t.missions.map((m, i) => (
                  <AnimatedText key={i}>
                    <p>{`${i + 1}. ${m}`}</p>
                  </AnimatedText>
                ))}
              </div>
            </div>
          </div>
          <div className="flex aspect-square w-full bg-gray-100 justify-center items-center">
            <ImageWithFallback src="/images/Visimisi.jpg" alt="Vision & Mission" />
          </div>
        </div>

        {/* History */}
        <div className="xl:flex">
          <div className="flex xl:aspect-square w-full">
            <div className="flex p-4 items-center">
              <div>
                <AnimatedText>
                  <h3 className={H3Style}>{t.history}</h3>
                </AnimatedText>
                <AnimatedText>
                  <p className="mt-2">{t.historyText}</p>
                </AnimatedText>
              </div>
            </div>
          </div>
          <div className="flex aspect-square w-full bg-gray-100 rounded-br-4xl xl:rounded-bl-none rounded-b-4xl justify-center items-center">
            <ImageWithFallback
              src="/images/History.jpg"
              alt="History"
              className="rounded-br-4xl xl:rounded-bl-none rounded-b-4xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
