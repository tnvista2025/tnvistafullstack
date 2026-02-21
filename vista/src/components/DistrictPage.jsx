import React, { useState, useRef, useEffect } from "react";
import Distbg from "../assets/distbg.jpg";
import { Link, useLocation } from "react-router-dom";

const DistrictPage = () => {
  const [activeDistrict, setActiveDistrict] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedDistrictId, setHighlightedDistrictId] = useState(null);
  const [animatingDistricts, setAnimatingDistricts] = useState(new Set());
  const searchRef = useRef(null);
  const cardRefs = useRef({});
  const animationTimeouts = useRef({});
  const districtsSectionRef = useRef(null);
  const location = useLocation();

  // COMPLETE DISTRICT DATA - All 38 districts
  const allDistricts = [
    {
      id: 1,
      name: "Pudukkottai",
      tamilName: "புதுக்கோட்டை",
      image: "https://jeiwwgoxuldwoxurkalo.supabase.co/storage/v1/object/sign/tnvista/pudukkottai/kundandarkovil/kunext2.jpg",
      path: "/PdktDist",
      essence: "Land of 1000+ Temples",
      specialty: "Chettinad Architecture"
    },
    {
      id: 2,
      name: "Madurai",
      tamilName: "மதுரை",
      image: "https://ricowdhzntqrkvnjulox.supabase.co/storage/v1/object/public/tnvista2025allphotos/madurai/Meenachiamman-temple/meenachiamman6.jpg",
      path: "/MaduraiDist",
      essence: "City of Festivals",
      specialty: "Meenakshi Temple"
    },
    {
      id: 3,
      name: "Chennai",
      tamilName: "சென்னை",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500",
      path: "/ChennaiDist",
      essence: "Gateway to South India",
      specialty: "Marina Beach"
    },
    {
      id: 4,
      name: "Coimbatore",
      tamilName: "கோயம்புத்தூர்",
      image: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa7c?w=500",
      path: "/CoimbatoreDist",
      essence: "Manchester of South",
      specialty: "Textile Hub"
    },
    {
      id: 5,
      name: "Thanjavur",
      tamilName: "தஞ்சாவூர்",
      image: "https://ricowdhzntqrkvnjulox.supabase.co/storage/v1/object/public/tnvista2025allphotos/Thanjavur/Big%20Temple/unnamed.webp",
      path: "/ThanjavurDist",
      essence: "Land of Chola Legacy",
      specialty: "Brihadeeswarar Temple"
    },
    {
      id: 6,
      name: "Kanyakumari",
      tamilName: "கன்னியாகுமரி",
      image: "https://images.unsplash.com/photo-1589908805464-86517c13d1e1?w=500",
      path: "/KanyakumariDist",
      essence: "Where Three Seas Meet",
      specialty: "Vivekananda Rock"
    },
    {
      id: 7,
      name: "Ooty",
      tamilName: "ஊட்டி",
      image: "https://images.unsplash.com/photo-1626621331446-7c6a5e8e5b5b?w=500",
      path: "/OotyDist",
      essence: "Queen of Hills",
      specialty: "Tea Plantations"
    },
    {
      id: 8,
      name: "Rameswaram",
      tamilName: "இராமேஸ்வரம்",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/RameswaramDist",
      essence: "Sacred Island",
      specialty: "Pamban Bridge"
    },
    {
      id: 9,
      name: "Kanchipuram",
      tamilName: "காஞ்சிபுரம்",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/KanchipuramDist",
      essence: "City of Thousand Temples",
      specialty: "Silk Sarees"
    },
    {
      id: 10,
      name: "Tiruchirappalli",
      tamilName: "திருச்சிராப்பள்ளி",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/TrichyDist",
      essence: "Rockfort City",
      specialty: "Rockfort Temple"
    },
    {
      id: 11,
      name: "Vellore",
      tamilName: "வேலூர்",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/VelloreDist",
      essence: "Fort City",
      specialty: "Golden Temple"
    },
    {
      id: 12,
      name: "Salem",
      tamilName: "சேலம்",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/SalemDist",
      essence: "Mango City",
      specialty: "Steel Plant"
    },
    {
      id: 13,
      name: "Tirunelveli",
      tamilName: "திருநெல்வேலி",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/TirunelveliDist",
      essence: "Halwa City",
      specialty: "Courtallam Falls"
    },
    {
      id: 14,
      name: "Erode",
      tamilName: "ஈரோடு",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/ErodeDist",
      essence: "Turmeric City",
      specialty: "Bhavani River"
    },
    {
      id: 15,
      name: "Dindigul",
      tamilName: "திண்டுக்கல்",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/DindigulDist",
      essence: "Lock City",
      specialty: "Dindigul Biryani"
    },
    {
      id: 16,
      name: "Namakkal",
      tamilName: "நாமக்கல்",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/NamakkalDist",
      essence: "Egg City",
      specialty: "Namakkal Fort"
    },
    {
      id: 17,
      name: "Karur",
      tamilName: "கருர்",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/KarurDist",
      essence: "Home Textile Hub",
      specialty: "Amaravathi River"
    },
    {
      id: 18,
      name: "Perambalur",
      tamilName: "பெரம்பலூர்",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/PerambalurDist",
      essence: "Fossils Hub",
      specialty: "Ranaganathar Temple"
    },
    {
      id: 19,
      name: "Ariyalur",
      tamilName: "அரியலூர்",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/AriyalurDist",
      essence: "Cement City",
      specialty: "Fossils"
    },
    {
      id: 20,
      name: "Cuddalore",
      tamilName: "கடலூர்",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/CuddaloreDist",
      essence: "Port City",
      specialty: "Silver Beach"
    },
    {
      id: 21,
      name: "Villupuram",
      tamilName: "விழுப்புரம்",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/VillupuramDist",
      essence: "Agricultural Hub",
      specialty: "Gingee Fort"
    },
    {
      id: 22,
      name: "Ranipet",
      tamilName: "ராணிப்பேட்டை",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/RanipetDist",
      essence: "Industrial Town",
      specialty: "Leather Hub"
    },
    {
      id: 23,
      name: "Tirupathur",
      tamilName: "திருப்பத்தூர்",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/TirupathurDist",
      essence: "Javadi Hills",
      specialty: "Yelagiri"
    },
    {
      id: 24,
      name: "Krishnagiri",
      tamilName: "கிருஷ்ணகிரி",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/KrishnagiriDist",
      essence: "Mango Hub",
      specialty: "Hogenakkal"
    },
    {
      id: 25,
      name: "Dharmapuri",
      tamilName: "தர்மபுரி",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/DharmapuriDist",
      essence: "Gateway to Hills",
      specialty: "Theerthamalai"
    },
    {
      id: 26,
      name: "Tiruvannamalai",
      tamilName: "திருவண்ணாமலை",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/TiruvannamalaiDist",
      essence: "Spiritual City",
      specialty: "Arunachala Hill"
    },
    {
      id: 27,
      name: "Kallakurichi",
      tamilName: "கள்ளக்குறிச்சி",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/KallakurichiDist",
      essence: "Agricultural Belt",
      specialty: "Kallakurichi Rice"
    },
    {
      id: 28,
      name: "Chengalpattu",
      tamilName: "செங்கல்பட்டு",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/ChengalpattuDist",
      essence: "Temple Gateway",
      specialty: "Mahabalipuram"
    },
    {
      id: 29,
      name: "Thoothukkudi",
      tamilName: "தூத்துக்குடி",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/ThoothukkudiDist",
      essence: "Pearl City",
      specialty: "Port"
    },
    {
      id: 30,
      name: "Ramanathapuram",
      tamilName: "இராமநாதபுரம்",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/RamanathapuramDist",
      essence: "Maritime Heritage",
      specialty: "Pamban Bridge"
    },
    {
      id: 31,
      name: "Sivagangai",
      tamilName: "சிவகங்கை",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/SivagangaiDist",
      essence: "Queen's Land",
      specialty: "Maruthu Pandiyar"
    },
    {
      id: 32,
      name: "Virudhunagar",
      tamilName: "விருதுநகர்",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/VirudhunagarDist",
      essence: "Match City",
      specialty: "Fireworks"
    },
    {
      id: 33,
      name: "Tenkasi",
      tamilName: "தென்காசி",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/TenkasiDist",
      essence: "Temple Town",
      specialty: "Courtallam Falls"
    },
    {
      id: 34,
      name: "Nilgiris",
      tamilName: "நீலகிரி",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/NilgirisDist",
      essence: "Blue Mountains",
      specialty: "Tea Gardens"
    },
    {
      id: 35,
      name: "Tiruppur",
      tamilName: "திருப்பூர்",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/TiruppurDist",
      essence: "Knitwear City",
      specialty: "Textile Export"
    },
    {
      id: 36,
      name: "Mayiladuthurai",
      tamilName: "மயிலாடுதுறை",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/MayiladuthuraiDist",
      essence: "Temple Town",
      specialty: "Cauvery Delta"
    },
    {
      id: 37,
      name: "Nagapattinam",
      tamilName: "நாகப்பட்டினம்",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/NagapattinamDist",
      essence: "Port Town",
      specialty: "Velankanni"
    },
    {
      id: 38,
      name: "Thiruvarur",
      tamilName: "திருவாரூர்",
      image: "https://images.unsplash.com/photo-1622128377979-48521cb1a4bd?w=500",
      path: "/ThiruvarurDist",
      essence: "Temple City",
      specialty: "Thyagaraja Temple"
    }
  ];

  // Handle hash navigation on page load
  useEffect(() => {
    if (location.hash === '#districts-section') {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        if (districtsSectionRef.current) {
          districtsSectionRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    }
  }, [location]);

  // Find exact matching districts based on complete search query
  const getExactMatchingDistricts = () => {
    if (searchQuery.trim() === "" || searchQuery.trim().length < 3) return [];
    
    const searchLower = searchQuery.toLowerCase().trim();
    
    return allDistricts.filter(district => {
      const districtNameLower = district.name.toLowerCase();
      const tamilName = district.tamilName;
      
      return districtNameLower === searchLower || 
             districtNameLower.includes(searchLower) ||
             tamilName.includes(searchLower);
    });
  };

  const exactMatchingDistricts = getExactMatchingDistricts();
  const exactMatchingDistrictIds = exactMatchingDistricts.map(d => d.id);

  // Filter districts for suggestions
  const suggestions = searchQuery.trim() === "" ? [] : allDistricts.filter(district => 
    district.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    district.tamilName.includes(searchQuery) ||
    district.essence.toLowerCase().includes(searchQuery.toLowerCase()) ||
    district.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  // Trigger animation for exact matching districts
  useEffect(() => {
    Object.values(animationTimeouts.current).forEach(timeout => clearTimeout(timeout));
    animationTimeouts.current = {};

    if (searchQuery.trim().length >= 3 && exactMatchingDistricts.length > 0) {
      setAnimatingDistricts(new Set(exactMatchingDistrictIds));
      
      exactMatchingDistrictIds.forEach(id => {
        const timeoutId = setTimeout(() => {
          setAnimatingDistricts(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
        }, 5000);
        
        animationTimeouts.current[id] = timeoutId;
      });
    } else {
      setAnimatingDistricts(new Set());
    }

    return () => {
      Object.values(animationTimeouts.current).forEach(timeout => clearTimeout(timeout));
    };
  }, [searchQuery, exactMatchingDistricts.length]);

  const filteredDistricts = allDistricts;
  const visibleDistricts = filteredDistricts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 8, filteredDistricts.length));
  };

  const hasMore = visibleCount < filteredDistricts.length;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
    setHighlightedDistrictId(null);
  };

  const handleSuggestionClick = (district) => {
    setSearchQuery(district.name);
    setShowSuggestions(false);
    setHighlightedDistrictId(district.id);
    
    setTimeout(() => {
      if (cardRefs.current[district.id]) {
        cardRefs.current[district.id].scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setHighlightedDistrictId(null);
    }
  }, [searchQuery]);

  return (
    <div className="flex flex-col items-center overflow-hidden bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${Distbg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl special-font">
            Explore Tamil Nadu
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl max-w-xl text-gray-200">
            Culture • Heritage • Innovation • Nature
          </p>

          {/* Search Bar with Suggestions */}
          <div className="relative mt-8" ref={searchRef}>
            <div className="flex bg-white/90 backdrop-blur-lg rounded-4xl shadow-2xl overflow-hidden w-80 sm:w-96">
              <input
                type="text"
                placeholder="Search districts, places..."
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => setShowSuggestions(true)}
                className="w-full px-6 py-4 outline-none text-sm text-gray-700"
              />
              <button className="px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transition">
                Search
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-100/95 rounded-4xl shadow-2xl overflow-hidden z-50">
                {suggestions.map((district) => (
                  <button
                    key={district.id}
                    onClick={() => handleSuggestionClick(district)}
                    className="w-full text-left px-6 py-4 hover:bg-gray-50 transition border-b border-gray-300 last:border-0 flex items-center space-x-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                      <img src={district.image} alt={district.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">{district.name}</span>
                      <span className="text-sm text-gray-600 ml-2">{district.tamilName}</span>
                      <p className="text-xs text-gray-500">{district.specialty}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Search Results Count */}
            {searchQuery.trim().length >= 3 && exactMatchingDistricts.length > 0 && (
              <div className="absolute mt-25 left-25  text-sm text-white/60">
                Found {exactMatchingDistricts.length} matching {exactMatchingDistricts.length === 1 ? 'district' : 'districts'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Districts Section with ref and ID */}
      <section 
        ref={districtsSectionRef}
        id="districts-section"
        className="w-full max-w-7xl px-4 sm:px-6 py-10 scroll-mt-20"
      >
        <div className="text-center ">
          <span className="text-xs uppercase tracking-[0.4em] text-gray-400 font-light">
            EXPLORE
          </span>
          <h2 className="text-4xl md:text-4xl mt-0 mb-3 ">
            <span
              className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent special-font"
            >
              All Districts
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
          
          <p className="text-gray-600 mt-8 mb-18 max-w-2xl mx-auto font-['Playfair_italic']">
             38 Districts • 38 Stories
          </p>
        </div>

        {/* Card Grid - Simplified */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleDistricts.map((district) => {
            const isExactMatch = exactMatchingDistrictIds.includes(district.id);
            const shouldAnimate = animatingDistricts.has(district.id);
            const isHighlighted = highlightedDistrictId === district.id;
            
            return (
              <Link
                key={district.id}
                to={district.path}
                ref={el => cardRefs.current[district.id] = el}
                onMouseEnter={() => setActiveDistrict(district.id)}
                onMouseLeave={() => setActiveDistrict(null)}
                className={`group block cursor-pointer transition-all duration-300 ${
                  isHighlighted ? 'scroll-mt-20' : ''
                }`}
              >
                <div className={`bg-white border border-gray-200 rounded-e-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  shouldAnimate ? 'animate-running-border' : ''
                }`}>
                  
                  <div className="relative h-60 overflow-hidden bg-gray-100">
                    <img
                      src={district.image}
                      alt={district.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* District name overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                      <div className="absolute bottom-4 left-0 right-0 text-center">
                        <h3 className="text-white text-lg font-bold">{district.name}</h3>
                        <p className="text-white/80 text-xs">{district.tamilName}</p>
                      </div>
                    </div>
                    
                    {shouldAnimate && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-b from-green-400 to-blue-400 animate-border-run-top"></div>
                        <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-green-400 to-blue-400 animate-border-run-right"></div>
                        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-green-400 to-blue-400 animate-border-run-bottom"></div>
                        <div className="absolute bottom-0 left-0 h-full w-1 bg-gradient-to-t from-green-400 to-blue-400 animate-border-run-left"></div>
                      </div>
                    )}

                    {isExactMatch && searchQuery.trim().length >= 3 && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                        Match
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-16">
            <button 
              onClick={handleLoadMore}
              className="px-10 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-4xl font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300 hover:scale-105"
            >
              Load More Districts
            </button>
            <p className="text-xs text-gray-400 mt-4">
              Showing {visibleCount} of {filteredDistricts.length} districts
            </p>
          </div>
        )}
      </section>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes border-run-top {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes border-run-right {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes border-run-bottom {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes border-run-left {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        
        .animate-border-run-top {
          animation: border-run-top 2s linear infinite;
        }
        .animate-border-run-right {
          animation: border-run-right 2s linear infinite;
        }
        .animate-border-run-bottom {
          animation: border-run-bottom 2s linear infinite;
        }
        .animate-border-run-left {
          animation: border-run-left 2s linear infinite;
        }
        
        .animate-running-border {
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default DistrictPage;