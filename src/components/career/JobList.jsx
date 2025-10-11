import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaBirthdayCake } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const ALL_POS = '__ALL_POS__';
const ALL_LOC = '__ALL_LOC__';

const JobList = () => {
  const { language } = useLanguage();

  // Translasi langsung di komponen
  const translations = {
    en: {
      position: 'POSITION',
      location: 'LOCATION',
      keyword: 'KEYWORD',
      allPositions: 'All Positions',
      allLocations: 'All Locations',
      keywordPlaceholder: 'Enter keyword',
      availablePositions: 'Available Positions',
      noPosition: 'No Position Available',
      bannerAlt: 'Job Banner',
      bannerTitle: 'Career at Pak Ndut',
      bannerSubtitle: 'Join our big family and grow together.',
    },
    id: {
      position: 'POSISI',
      location: 'LOKASI',
      keyword: 'KATA KUNCI',
      allPositions: 'Semua Posisi',
      allLocations: 'Semua Lokasi',
      keywordPlaceholder: 'Masukkan kata kunci',
      availablePositions: 'Posisi Tersedia',
      noPosition: 'Tidak Ada Posisi Tersedia',
      bannerAlt: 'Banner Karier',
      bannerTitle: 'Karir di Pak Ndut',
      bannerSubtitle: 'Bergabunglah dengan keluarga besar kami dan berkembang bersama.',
    },
  };

  const t = translations[language];

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(ALL_POS);
  const [selectedLocation, setSelectedLocation] = useState(ALL_LOC);

  useEffect(() => {
    fetch('https://pak-ndut-backend-production.up.railway.app/careers')
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data?.data) ? data.data : [];
        setJobs(list);
        setFilteredJobs(list);
      })
      .catch((err) => console.error('Failed to load job data:', err));
  }, []);

  useEffect(() => {
    filterJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs, searchTerm, selectedPosition, selectedLocation]);

  const filterJobs = () => {
    const q = (searchTerm || '').toLowerCase();
    const results = jobs.filter((job) => {
      const inKeyword = `${job.name} ${job.location}`.toLowerCase().includes(q);
      const inPosition = selectedPosition === ALL_POS || job.name === selectedPosition;
      const inLocation = selectedLocation === ALL_LOC || job.location === selectedLocation;
      return inKeyword && inPosition && inLocation;
    });
    setFilteredJobs(results);
  };

  const getUniqueValues = (key) => {
    return [...new Set(jobs.map((job) => job[key]).filter(Boolean))];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="bg-white relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
        <img
          src="/images/CareerBanner4.jpg"
          alt={t.bannerAlt}
          className="w-full h-[300px] md:h-[400px] object-cover shadow-lg brightness-100 md:brightness-70 grayscale"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold">{t.bannerTitle}</h1>
          <p className="mt-3 text-lg">{t.bannerSubtitle}</p>
        </div>
      </div>

      <div className="px-6 md:px-20 py-5 md:py-0 ">
        {/* Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Position Filter */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 tracking-wide mb-1">
              {t.position}
            </label>
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="appearance-none bg-transparent focus:outline-none border-b border-gray-300 py-2 text-gray-800"
            >
              <option value={ALL_POS}>{t.allPositions}</option>
              {getUniqueValues('name').map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 tracking-wide mb-1">
              {t.location}
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="appearance-none bg-transparent focus:outline-none border-b border-gray-300 py-2 text-gray-800"
            >
              <option value={ALL_LOC}>{t.allLocations}</option>
              {getUniqueValues('location').map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Keyword Search */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 tracking-wide mb-1">
              {t.keyword}
            </label>
            <input
              type="text"
              placeholder={t.keywordPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-b border-gray-300 py-2 focus:outline-none text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Title - only show when data is available */}
        {filteredJobs.length > 0 && (
          <h2 className="text-2xl font-bold mb-6">{t.availablePositions}</h2>
        )}

        {/* Job Cards */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredJobs.map((job) => (
              <Link to={`/career/${job.id}`} key={job.id}>
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
            {t.noPosition}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
