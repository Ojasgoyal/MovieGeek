import { useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../hooks/getData";
import HeroSection from "../components/Sections/HeroSection";
import DetailsSection from "../components/Sections/DetailsSection";
import CreditsSection from "../components/Sections/CreditsSection";
import PersonDetails from "../components/Sections/PersonDetails";
import SearchBar from "../components/SearchBar/SearchBar";


export default function Detail() {
  const { type, param2: id } = useParams();
  const { data, loading, error } = getData(type, id);
  const [showTrailer, setShowTrailer] = useState(false);

  const { details, credits, movie_credits, tv_credits, videos } = data;

  const trailer = videos?.results?.find(
    (vid) =>
      vid.type === "Trailer" &&
      vid.site === "YouTube" &&
      (vid.name.toLowerCase().includes("trailer") ||
        vid.name.toLowerCase().includes("teaser"))
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <SearchBar />
      {type === "person" ? (
        <div className="mt-[37px] bg-gray-50 min-h-screen">
          <PersonDetails
            details={details}
            movie_credits={movie_credits}
            tv_credits={tv_credits}
          />
        </div>
      ) : (
        <>
          <div className="min-h-screen mt-[37px] bg-gray-50">
            <HeroSection
              details={details}
              trailer={trailer}
              showTrailer={showTrailer}
              setShowTrailer={setShowTrailer}
            />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <DetailsSection details={details} />
                <CreditsSection credits={credits} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
