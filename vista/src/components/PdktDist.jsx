import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ================= HERO SLIDER (ONLY 4) ================= */
const heroPlaces = [
  {
    id: 1,
    name: "Kundandarkovil",
    location: "Pudukkottai, Tamil Nadu",
    tagline: "A masterpiece of Chola architecture",
    image: "https://jeiwwgoxuldwoxurkalo.supabase.co/storage/v1/object/sign/tnvista/pudukkottai/kundandarkovil/kunext2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kOGUxNWJjOS1iYzY4LTQzYWUtODIxMi1kNjg4NjQxYWY1MDAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0bnZpc3RhL3B1ZHVra290dGFpL2t1bmRhbmRhcmtvdmlsL2t1bmV4dDIuanBnIiwiaWF0IjoxNzcwNDc5MzI4LCJleHAiOjE4MDIwMTUzMjh9.HIKSb2BnGRvsSRwq1-T7HqDqG4nC_7Pk0OZsTN3ezHE",
  },
  {
    id: 2,
    name: "Palace",
    location: "Pudukkottai, Tamil Nadu",
    tagline: "Royal heritage of Pudukkottai",
    image: "https://jeiwwgoxuldwoxurkalo.supabase.co/storage/v1/object/sign/tnvista/pudukkottai/collector-office/palace2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kOGUxNWJjOS1iYzY4LTQzYWUtODIxMi1kNjg4NjQxYWY1MDAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0bnZpc3RhL3B1ZHVra290dGFpL2NvbGxlY3Rvci1vZmZpY2UvcGFsYWNlMi5qcGciLCJpYXQiOjE3NzA0Nzk0MjEsImV4cCI6MTgwMjAxNTQyMX0.Z6VRJp6HRkBSfvSUVg6ptD-VDpX924tcF1Trpxs8Z-s",
  },
  {
    id: 3,
    name: "Thirumayam Fort",
    location: "Pudukkottai, Tamil Nadu",
    tagline: "A fort carved from a single rock",
    image: "https://jeiwwgoxuldwoxurkalo.supabase.co/storage/v1/object/sign/tnvista/pudukkottai/thirumayam/trmfort.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kOGUxNWJjOS1iYzY4LTQzYWUtODIxMi1kNjg4NjQxYWY1MDAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0bnZpc3RhL3B1ZHVra290dGFpL3RoaXJ1bWF5YW0vdHJtZm9ydC5qcGciLCJpYXQiOjE3NzA0Nzk0ODcsImV4cCI6MTgwMjAxNTQ4N30.LpOwgBZs5eVRIX5-yyuvqdVNeHYhiBXMEjWMoov2v-w",
  },
  {
    id: 4,
    name: "Sittanavasal Cave",
    location: "Pudukkottai, Tamil Nadu",
    tagline: "Ancient Jain paintings & caves",
    image: "https://jeiwwgoxuldwoxurkalo.supabase.co/storage/v1/object/sign/tnvista/pudukkottai/sithanavasal/sovextmain.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kOGUxNWJjOS1iYzY4LTQzYWUtODIxMi1kNjg4NjQxYWY1MDAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0bnZpc3RhL3B1ZHVra290dGFpL3NpdGhhbmF2YXNhbC9zb3ZleHRtYWluLnBuZyIsImlhdCI6MTc3MDQ3OTU0OSwiZXhwIjoxODAyMDE1NTQ5fQ.4qHj7WAnONcU4ugJnbvVc-8mF566EXYSLlSdhNOjDFM",
  },
];

/* ================= CARD SECTION (UNLIMITED) ================= */
const explorePlaces = [
  ...heroPlaces,
  {
    id: 5,
    name: "Museum",
    location: "Pudukkottai, Tamil Nadu",
    image: "https://jeiwwgoxuldwoxurkalo.supabase.co/storage/v1/object/sign/tnvista/pudukkottai/museum/museumin2.jpg",
  },
  {
    id: 6,
    name: "Viralimalai",
    location: "Pudukkottai, Tamil Nadu",
    image: "https://jeiwwgoxuldwoxurkalo.supabase.co/storage/v1/object/sign/tnvista/pudukkottai/viralimalai/vrmext1.jpg",
  },
];

const PdktDist = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(heroPlaces[0]);
  const [prevImage, setPrevImage] = useState(null);
  const [animating, setAnimating] = useState(false);

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
    const nextIndex = (currentIndex + 1) % heroPlaces.length;

    setPrevImage(selected.image);
    setSelected(heroPlaces[nextIndex]);

    setTimeout(() => setAnimating(false), 1200);
  };

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-[70vh] overflow-hidden font-sans">
        <div className="absolute inset-0 -z-10">
          {prevImage && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60"
              style={{ backgroundImage: `url(${prevImage})` }}
            />
          )}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${selected.image})` }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20" />

        <div className="absolute top-10 left-10 z-30 text-white max-w-xl">
          <h1 className="text-6xl font-extrabold mb-3">
            {selected.name}
          </h1>
          <p className="text-2xl text-amber-300 font-semibold">
            {selected.location}
          </p>
          <p className="mt-3 text-lg italic">
            {selected.tagline}
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-6 z-30">
          {heroPlaces.map((place) => (
            <div
              key={place.id}
              onClick={() => {
                if (animating) return;
                setPrevImage(selected.image);
                setSelected(place);
              }}
              className={`rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all duration-500 ${
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
            </div>
          ))}
        </div>
      </div>

      {/* ================= CARD SECTION ================= */}
      <section className="py-24 bg-white">
        <h2 className="text-center text-4xl font-bold mb-14">
          More Places to Explore
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
          {explorePlaces.map((place) => (
            <div
              key={place.id}
              onClick={() => navigate(`/place/${place.id}`)}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition"
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

export default PdktDist;
