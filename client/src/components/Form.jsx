export default function FormWrapper({ title, children, onSubmit }) {
  const posters = [
    "/iolc5VLP4PFU0XvjTVRiCb80mUR.jpg",
    "/aM0Bi3IIsmIsWQU5K0Gcr6IUO1L.jpg",
    "/sRNiix3xL00DrGR9ThgT1cQPEjj.jpg",
    "/mqKyzyTr3BauoLvC1rVonleq2CU.jpg",
    "/4Ry8Q4MhQugIAXKbI5UM8rPLP5F.jpg",
  ];

  return (
    <div className="w-full h-[93vh] flex justify-center items-center relative overflow-hidden">
      {/* Poster collage */}
      <div className="absolute inset-0 grid grid-cols-5">
        {posters.map((poster, i) => (
          <img
            key={i}
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            alt="poster"
            className="w-full h-full object-cover"
          />
        ))}
      </div>
      
      {/* Card */}
      <div className="absolute inset-0 bg-black/25 z-5"></div>
      <div className="relative w-[400px] rounded-2xl shadow-md border border-white/75 shadow-black/50 p-6">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          {title}
        </h2>
        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
          {children}
        </form>
      </div>
    </div>
  );
}