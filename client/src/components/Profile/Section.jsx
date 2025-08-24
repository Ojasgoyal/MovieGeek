import Card from "./Card";

function Section({ itemData }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto px-2 pt-6 md:gap-2">
      {itemData &&
        itemData.map((item) => {
          const movie = item.movie;
          if (!movie) return null;
          return <Card type={movie.type} key={movie._id} movie={movie} />;
        })}
    </div>
  );
}

export default Section;