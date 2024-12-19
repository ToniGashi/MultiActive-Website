import PartnersClient from "@/components/ui/partners/partnersClient";
import PARTNERS from "@/components/ui/partners/PartnersData";

function PartnerHeader({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <header className="text-center mb-16">
      <h1 className="text-5xl font-bold mb-6">{name}</h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
    </header>
  );
}

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page(props: PageProps) {
  const { id } = await props.params; // params is now synchronous

  const partnerData = PARTNERS.find((p) => p.id === id);

  if (!partnerData) {
    return (
      <div className="container mx-auto px-4 py-2">
        <h1 className="text-5xl font-bold text-center mb-6">
          Partner Not Found
        </h1>
        <p className="text-xl text-gray-600 text-center">
          We couldn't find any partner with the provided ID.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-2 mt-10">
      <PartnerHeader
        name={partnerData.name}
        description={partnerData.description}
      />
      <PartnersClient partnerData={partnerData} />
    </div>
  );
}
