import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch('/data/careers.json')
      .then((res) => res.json())
      .then((data) => {
        const foundJob = data.data.find((item) => item.id === parseInt(id));
        setJob(foundJob);
      })
      .catch((err) => console.error('Failed to fetch job detail:', err));
  }, [id]);

  const handleBack = () => {
    navigate('/career');
  };

  if (!job) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative">
        <img
          src="/images/CareerBanner.png"
          alt="Job Header"
          className="w-full h-[300px] object-cover grayscale"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div className="text-white">
            <button
              onClick={handleBack}
              className="text-sm uppercase mb-4 hover:underline ml-5 md:ml-0"
            >
              &larr; Back
            </button>
            <h1 className="text-2xl md:text-3xl ml-5 md:ml-0 font-bold">
              {job.name} - {job.location}
            </h1>
          </div>
        </div>
      </div>

      {/* Job Detail Card */}
      <div className="flex justify-center mt-[-80px]">
        <div className="bg-white shadow-lg rounded-md p-8 max-w-3xl w-full z-10">
          {/* Job Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Job Description</h2>
            <p className="text-gray-700">{job.description}</p>
          </div>

          {/* Job Requirements */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Job Requirements</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {job.requirement.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          {/* Button */}
          <div className="text-center">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=info@pakndut.co&su=Job Application for ${encodeURIComponent(
                job.name
              )}&body=Dear HR,%0D%0A%0D%0AI am interested in the ${encodeURIComponent(
                job.name
              )} position at ${encodeURIComponent(job.location)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFCC29] hover:bg-yellow-500 text-white px-6 py-2 rounded-md font-semibold inline-block"
            >
              Apply for Job
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
