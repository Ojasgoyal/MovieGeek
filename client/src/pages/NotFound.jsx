import { Link } from "react-router-dom";

export default function NotFound() {
  const posterUrl =
    "https://image.tmdb.org/t/p/w500/A9A82bca19hu39lXSAQiQ3qEPe6.jpg";

return (
    <div className="relative flex flex-col justify-center items-center w-full h-screen -mt-[42px]">
        <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
                backgroundImage: `url(${posterUrl})`,
                filter: "blur(2px) brightness(0.6)",
            }}
        ></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="bg-white/30 backdrop-blur-md px-16 py-4 rounded-2xl shadow-xl flex flex-col items-center w-[500px] max-w-full">
                <h1 className="text-6xl font-bold mb-2">404</h1>
                <p className="mb-4 text-center text-lg">Not Found</p>
                <Link
                    to="/"
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Home
                </Link>
            </div>
        </div>
    </div>
);
}
