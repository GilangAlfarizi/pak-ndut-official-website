import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaUser, FaGraduationCap, FaBirthdayCake } from 'react-icons/fa';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch JSON data
  useEffect(() => {
    fetch('/data/careers.json')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
      })
      .catch((err) => console.error('Failed to load job data:', err));
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);

    const results = jobs.filter((job) =>
      `${job.title} ${job.education} ${job.location}`.toLowerCase().includes(keyword)
    );

    setFilteredJobs(results);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="bg-[#FFCC29] flex justify-center mb-0 md:mb-10">
        <img
          src="/images/CareerBanner.png"
          alt="Job Banner"
          className="w-full h-full shadow-lg brightness-100 md:brightness-70 mt-14 md:mt-0"
        />
      </div>

      <div className="px-6 md:px-20 py-10">
        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <div className="flex w-full max-w-3xl bg-white shadow-lg rounded-xl overflow-hidden">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Enter a keyword"
              className="flex-grow px-5 py-3 outline-none"
            />
            <button className="bg-red-700 text-white px-6 py-3 font-semibold hover:bg-red-800 transition">
              Search
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6">Available Positions</h2>

        {/* Job Cards */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredJobs.map((job, idx) => (
              <div
                key={idx}
                className="bg-white shadow-md rounded-lg p-5 space-y-3 border border-gray-100 hover:shadow-xl"
              >
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <FaGraduationCap className="text-red-600" />
                  <span>{job.education}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <FaMapMarkerAlt className="text-red-600" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <FaBirthdayCake className="text-red-600" />
                  <span>{job.age}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <FaUser className="text-red-600" />
                  <span>{job.gender}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-40 text-xl font-semibold text-gray-500">
            No Position Available
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
