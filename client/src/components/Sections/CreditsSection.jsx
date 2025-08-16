import CreditCard from "../Cards/CreditCard";

export default function CreditsSection({ credits }) {
  return ( 
  (credits?.cast?.length > 0 || credits?.crew?.length > 0) && (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Cast & Crew
        </h2>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {credits?.cast?.slice(0, 6).map((member) => (
            <CreditCard
              key={member.id}
              person={member}
              role={member.character}
            />
          ))}
          {credits?.crew?.slice(0, 4).map((member) => (
            <CreditCard key={member.id} person={member} role={member.job} />
          ))}
        </div>
      </div>
    </div>
  )
  );
}

              

              