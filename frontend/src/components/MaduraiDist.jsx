import React, { useState, useEffect } from "react";

/* ================= HERO SLIDER (ONLY 4) ================= */
const heroPlaces = [
  {
    id: 1,
    name: "Meenakshi Amman Temple",
    location: "Madurai, Tamil Nadu",
    tagline: "The city's 4.7-rated, primary attraction, dedicated to Goddess Meenakshi and Lord Sundareswarar.",

    image:
      "https://ricowdhzntqrkvnjulox.supabase.co/storage/v1/object/public/tnvista2025allphotos/madurai/Meenachiamman-temple/meenachiamman6.jpg",
  },
  {
    id: 2,
    name: "Thirumalai Nayakkar Mahal",
    location: "Madurai, Tamil Nadu",
    tagline: "A 17th-century palace showcasing Dravidian and Rajput architecture.",
    image:
        "https://ricowdhzntqrkvnjulox.supabase.co/storage/v1/object/public/tnvista2025allphotos/madurai/Thirumalai-Nayak-Palace/thirumalainayak5.jpg",
    
  },
  {
    id: 3,
    name: "Pazhamudhir Solai",
    location: "Madurai, Tamil Nadu",
    tagline: " A significant Murugan temple located on a hill.",
    image:
        "https://ricowdhzntqrkvnjulox.supabase.co/storage/v1/object/public/tnvista2025allphotos/madurai/Pazhamudircholai/pazhamudircholai1.png",
  },
  {
    id: 4,
    name: "Alagar Koil Temple and Shrine",
    location: "Madurai, Tamil Nadu",
    tagline: "A Vishnu temple set at the foot of hills.",
    image:
    "https://ricowdhzntqrkvnjulox.supabase.co/storage/v1/object/public/tnvista2025allphotos/madurai/Kallazhagar-Sundararaja-Perumal-Temple/azhagar8.png",
  },
];

/* ================= CARD SECTION (UNLIMITED) ================= */
const explorePlaces = [
  ...heroPlaces,
  {
    id: 5,
    name: "Vandiyur Mariamman Theppakulam",
    location: "Madurai, Tamil Nadu",
    image:
        "https://ricowdhzntqrkvnjulox.supabase.co/storage/v1/object/public/tnvista2025allphotos/madurai/Vandiyur-Mariamman-Teppakulam/theppakulam3.jpg",
  },
  {
    id: 6,
    name: "Gandhi Memorial Museum",
    location: "Madurai, Tamil Nadu",
    image:
        "https://ricowdhzntqrkvnjulox.supabase.co/storage/v1/object/public/tnvista2025allphotos/madurai/Gandhi-Memorial-Museum/gmuseum4.png",
  },
 {
    id: 7,
    name: "Athisayam ",
    location: "Madurai, Tamil Nadu",
    image:
      "https://ricowdhzntqrkvnjulox.supabase.co/storage/v1/object/public/tnvista2025allphotos/madurai/Athisayam/athisayam1.png",
  },
 {
    id: 8,
    name: "Samanar Hill",
    location: "Madurai, Tamil Nadu",
    image:
        "https://ricowdhzntqrkvnjulox.supabase.co/storage/v1/object/public/tnvista2025allphotos/madurai/SamanarHill/samanarhill2.png",
  },

   {
    id: 9,
    name: "Rajaji Park",
    location: "Madurai, Tamil Nadu",
    image:
        "https://ricowdhzntqrkvnjulox.supabase.co/storage/v1/object/public/tnvista2025allphotos/madurai/Rajaji-Park/rajajipark1.png",
  },

 {
    id: 10,
    name: "Tirupparankundram Temple",
    location: "Madurai, Tamil Nadu",
    image:
        "https://ricowdhzntqrkvnjulox.supabase.co/storage/v1/object/public/tnvista2025allphotos/madurai/Tirupparankundram/tirupparankundram1.png",
  },
 {
    id: 11,
    name: "Vaigaidam",
    location: "Madurai, Tamil Nadu",
    image:
        "https://ricowdhzntqrkvnjulox.supabase.co/storage/v1/object/public/tnvista2025allphotos/madurai/Vaigaidam/vaigai3.png",

  },

 {
    id: 12,
    name: "Mary Cathedral",
    location: "Madurai, Tamil Nadu",
    image:
        "https://ricowdhzntqrkvnjulox.supabase.co/storage/v1/object/public/tnvista2025allphotos/madurai/Mary-Cathedral/marychurch11.png",

  },

 {
    id: 13,
    name: "Kazimar Big Mosquei",
    location: "Madurai, Tamil Nadu",
    image:
        "https://ricowdhzntqrkvnjulox.supabase.co/storage/v1/object/public/tnvista2025allphotos/madurai/Kazimar-Big-Mosque/Kazimar1.webp",

  },

 {
    id: 14,
    name: "Yanai Malai Hill",
    location: "Madurai, Tamil Nadu",
    image:
        "https://ricowdhzntqrkvnjulox.supabase.co/storage/v1/object/public/tnvista2025allphotos/madurai/Yanai-Malai-Hill/yanaimalai1.png",

  },





];

const MaduraiDist = () => {
  const [selected, setSelected] = useState(heroPlaces[0]);
  const [prevImage, setPrevImage] = useState(null);
  const [animating, setAnimating] = useState(false);

  /* ================= HERO AUTO SLIDE ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [selected]);

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);

    const currentIndex = heroPlaces.findIndex(
      (p) => p.id === selected.id
    );
    const nextIndex =
      (currentIndex + 1) % heroPlaces.length;

    setPrevImage(selected.image);
    setSelected(heroPlaces[nextIndex]);

    setTimeout(() => setAnimating(false), 1200);
  };

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-[70vh] overflow-hidden font-sans">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          {prevImage && (
            <div
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-0"
              style={{ backgroundImage: `url(${prevImage})` }}
            />
          )}
          <div
            key={selected.image}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-100"
            style={{ backgroundImage: `url(${selected.image})` }}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20" />

        {/* Text */}
        <div className="absolute top-10 left-10 z-30 text-white max-w-xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-3">
            {selected.name}
          </h1>
          <p className="text-xl sm:text-2xl text-amber-300 font-semibold">
            {selected.location}
          </p>
          <p className="mt-3 text-lg text-gray-200 italic">
            {selected.tagline}
          </p>
        </div>

        {/* HERO SLIDE CARDS (WITH UNIQUE TEXT) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-6 z-30">
          {heroPlaces.map((place) => (
            <div
              key={place.id}
              onClick={() => {
                if (animating) return;
                setPrevImage(selected.image);
                setSelected(place);
              }}
              className={`relative rounded-2xl overflow-hidden shadow-xl cursor-pointer
                transition-all duration-500 ease-out hover:scale-105
                ${
                  selected.id === place.id
                    ? "w-56 h-80"
                    : "w-44 h-64 opacity-70"
                }`}
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover"
              />

              {/* Unique Text */}
              <div className="absolute bottom-0 left-0 w-full bg-black/60 p-3 text-center text-white">
                <p className="font-semibold text-sm">
                  {place.name}
                </p>
                <p className="text-xs text-amber-300 mt-1">
                
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Page Number */}
        <div className="absolute bottom-8 right-12 text-white text-3xl font-light z-30">
          {String(selected.id).padStart(2, "0")}
        </div>
      </div>

      {/* ================= SEPARATE CARD SECTION ================= */}
      <section className="py-24 bg-white">
        <h2 className="text-center text-4xl font-bold mb-14 text-gray-900">
          More Places to Explore
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
          {explorePlaces.map((place) => (
            <div
              key={place.id}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  {place.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {place.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MaduraiDist;

