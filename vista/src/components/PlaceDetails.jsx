import { useParams, useNavigate } from "react-router-dom";

const allPlaces = [
  {
    id: 1,
    name: "Kundandarkovil",
    location: "Pudukkottai, Tamil Nadu",
    heroImage:
      "https://jeiwwgoxuldwoxurkalo.supabase.co/storage/v1/object/sign/tnvista/pudukkottai/kundandarkovil/kunint4.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kOGUxNWJjOS1iYzY4LTQzYWUtODIxMi1kNjg4NjQxYWY1MDAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0bnZpc3RhL3B1ZHVra290dGFpL2t1bmRhbmRhcmtvdmlsL2t1bmludDQuanBnIiwiaWF0IjoxNzcwNDg0MTEzLCJleHAiOjE4MDIwMjAxMTN9.RAmO4XhK0IohWfeKrnzIZfPZOQPcDttzNa9Ligvo_ak",
    gallery: [
      "https://jeiwwgoxuldwoxurkalo.supabase.co/storage/v1/object/sign/tnvista/pudukkottai/kundandarkovil/kunint4.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kOGUxNWJjOS1iYzY4LTQzYWUtODIxMi1kNjg4NjQxYWY1MDAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ0bnZpc3RhL3B1ZHVra290dGFpL2t1bmRhbmRhcmtvdmlsL2t1bmludDQuanBnIiwiaWF0IjoxNzcwNDg0MTEzLCJleHAiOjE4MDIwMjAxMTN9.RAmO4XhK0IohWfeKrnzIZfPZOQPcDttzNa9Ligvo_ak",
      "https://jeiwwgoxuldwoxurkalo.supabase.co/storage/v1/object/sign/tnvista/pudukkottai/kundandarkovil/kunint4.jpg",
      "https://jeiwwgoxuldwoxurkalo.supabase.co/storage/v1/object/sign/tnvista/pudukkottai/kundandarkovil/kunint4.jpg",
    ],
    history:
      "Kundandarkovil Temple is an ancient rock-cut Shiva temple dating back to the 8th century CE during the Pallava–Muttaraiyar period. Dedicated to Parvathagiriswarar, the Lord of the Hill, this temple is renowned for its early Chola architectural elements and sacred inscriptions.",
    deity: "Lord Shiva (Parvathagiriswarar)",
    timings: "6:00 AM – 12:30 PM | 4:00 PM – 8:00 PM",
    bestMonth: "December – February",
    festivals: ["Pradosham", "Maha Shivaratri", "Karthigai Deepam"],
    reach:
      "20 km from Pudukkottai town. Accessible via buses, taxis, and private vehicles.",
  },
];

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = allPlaces.find((p) => p.id === Number(id));

  if (!place) return <p className="text-center mt-20">Place not found</p>;

  return (
    <div className="bg-[#f2f2f7] text-gray-900">

      {/* ================= HERO ================= */}
      <div className="relative h-[85vh] overflow-hidden">
        <img
          src={place.heroImage}
          className="w-full h-full object-cover scale-105"
        />

        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

        {/* Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tight">
            {place.name}
          </h1>
          <p className="mt-3 text-lg text-white/80">
            {place.location}
          </p>
        </div>

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 px-5 py-2 rounded-full
                     bg-white/20 backdrop-blur-md border border-white/30
                     text-white hover:bg-white/30 transition"
        >
          ← Back
        </button>
      </div>

      {/* ================= CONTENT WRAPPER ================= */}
      <div className="max-w-6xl mx-auto px-6 -mt-24 space-y-20">

        {/* ================= GLASS INFO CARD ================= */}
        <section className="bg-white/70 backdrop-blur-xl border border-white/40
                            rounded-[28px] shadow-2xl p-10 grid md:grid-cols-2 gap-10">
          <img
            src={place.gallery[0]}
            className="rounded-2xl object-cover h-full"
          />

          <div>
            <h2 className="text-4xl font-semibold mb-4">
              Temple History
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {place.history}
            </p>
          </div>
        </section>

        {/* ================= DEITY ================= */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-3">
            Presiding Deity
          </h2>
          <p className="text-lg text-gray-600">
            {place.deity}
          </p>
        </section>

        {/* ================= MAC STYLE INFO CARDS ================= */}
        <section className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Temple Timings", value: place.timings },
            { title: "Best Time to Visit", value: place.bestMonth },
            { title: "Major Festivals", value: place.festivals.join(", ") },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-xl border border-white/40
                         rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        {/* ================= ARCHITECTURE ================= */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-semibold mb-4">
              Architecture & Heritage
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              The temple showcases early Chola rock-cut architecture with
              granite carvings, sculpted pillars, and sacred mandapams.
            </p>
          </div>

          <img
            src={place.gallery[1]}
            className="rounded-3xl shadow-2xl"
          />
        </section>

        {/* ================= HOW TO REACH ================= */}
        <section className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 text-center shadow-xl">
          <h2 className="text-3xl font-semibold mb-4">
            How to Reach
          </h2>
          <p className="text-gray-700 text-lg">
            {place.reach}
          </p>
        </section>

      </div>

      {/* ================= MAC STYLE GALLERY ================= */}
      <section className="mt-24 px-6 pb-24">
        <h2 className="text-center text-4xl font-semibold mb-12">
          Photo Gallery
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {place.gallery.map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-3xl shadow-xl
                         hover:scale-[1.03] transition"
            >
              <img
                src={img}
                className="w-full h-72 object-cover"
              />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default PlaceDetails;
