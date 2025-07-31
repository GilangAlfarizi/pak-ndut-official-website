import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaUser, FaGraduationCap, FaBirthdayCake } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Tambahkan ini

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('All Positions');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  useEffect(() => {
    fetch('/data/careers.json')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.data);
        setFilteredJobs(data.data);
      })
      .catch((err) => console.error('Failed to load job data:', err));
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchTerm, selectedPosition, selectedLocation]);

  const filterJobs = () => {
    const results = jobs.filter((job) => {
      const matchKeyword = `${job.name} ${job.location}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchPosition =
        selectedPosition === 'All Positions' || job.name === selectedPosition;

      const matchLocation =
        selectedLocation === 'All Locations' || job.location === selectedLocation;

      return matchKeyword && matchPosition && matchLocation;
    });

    setFilteredJobs(results);
  };

  const getUniqueValues = (key) => {
    const values = key === 'name' ? 'Positions' : 'Locations';
    return ['All ' + values, ...new Set(jobs.map((job) => job[key]))];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="bg-gray-300 flex justify-center mb-0 md:mb-10">
        <img
          src="/images/CareerBanner.png"
          alt="Job Banner"
          className="w-full h-[400px] object-cover shadow-lg brightness-100 md:brightness-70 mt-14 md:mt-0 grayscale"
        />
      </div>

      <div className="px-6 md:px-20 py-5 md:py-0">
        {/* Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Position Filter */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 tracking-wide mb-1">POSITION</label>
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="appearance-none bg-transparent focus:outline-none border-b border-gray-300 py-2 text-gray-800"
            >
              {getUniqueValues('name').map((pos, idx) => (
                <option key={idx} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 tracking-wide mb-1">LOCATION</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="appearance-none bg-transparent focus:outline-none border-b border-gray-300 py-2 text-gray-800"
            >
              {getUniqueValues('location').map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Keyword Search */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 tracking-wide mb-1">KEYWORD</label>
            <input
              type="text"
              placeholder="Enter keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-b border-gray-300 py-2 focus:outline-none text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Title - only show when data is available */}
        {filteredJobs.length > 0 && (
          <h2 className="text-2xl font-bold mb-6">Available Positions</h2>
        )}

        {/* Job Cards */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredJobs.map((job, idx) => (
              <Link to={`/career/${job.id}`} key={idx}>
                <div className="bg-white shadow-md rounded-lg p-5 space-y-3 border border-gray-100 hover:shadow-xl hover:border-gray-300 transition duration-300">
                  <h3 className="text-lg font-semibold">{job.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FaMapMarkerAlt className="text-red-600" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FaBirthdayCake className="text-red-600" />
                    <span>{job.age}</span>
                  </div>
                </div>
              </Link>
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
