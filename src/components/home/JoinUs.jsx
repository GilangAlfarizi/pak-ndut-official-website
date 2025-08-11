import { Link } from "react-router-dom";

const JoinUs = () => {
  return (
    <div className="flex justify-center h-180  items-center">
      <div className="grid gap-4 text-center p-4">
        <div>
          <h2 className="text-4xl font-black text-center text-[#BA0202]">
            Join Our Family.
          </h2>
        </div>
        <div>
          <p>Fill in our form and join Bebek Pak Ndut's Family.</p>
        </div>
        <div>
          <Link
            to="https://wa.me/+6282265687777"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="mt-4 px-10 py-4 bg-[#BA0202] text-white text-2xl font-semibold rounded-[40px] hover:bg-red-600 transition duration-200">
              Apply or Inquire
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
