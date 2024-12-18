import React from "react";

function Page() {
  return (
    <div className="flex flex-col gap-8 px-4 sm:px-8 lg:px-16 py-8">
      {/* Our Services */}
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-medium text-[#676D73]">Shërbimet Tona</h1>
        <p>
          <span className="text-primary font-semibold">
            Aktivitete Fizike:{" "}
          </span>
          Ne ofrojmë programe të personalizuara për aktivitete fizike që
          përmirësojnë shëndetin dhe mirëqenien e stafit tuaj.
        </p>
        <p>
          <span className="text-primary font-semibold">
            Zgjidhje Inovative:{" "}
          </span>
          Zgjidhje të përshtatura për nevojat specifike të kompanisë suaj, duke
          përfshirë trajnime, programe motivuese dhe më shumë.
        </p>
        <p>
          <span className="text-primary font-semibold">
            Mbështetje e Vazhdueshme:{" "}
          </span>
          Ekipi ynë ofron asistencë të plotë për të siguruar suksesin e çdo
          programi të implementuar.
        </p>
      </div>
      <hr className="border-gray-200" />

      {/* Property Rights */}
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-medium text-[#676D73]">
          Të Drejtat e Pronësisë
        </h1>
        <p>
          <span className="text-primary font-semibold">Pronësia: </span>
          Të gjitha përmbajtjet, programet dhe materialet janë të mbrojtura nga
          ligjet e të drejtave të autorit.
        </p>
        <p>
          <span className="text-primary font-semibold">
            Përdorimi i Kufizuar:{" "}
          </span>
          Nuk lejohet riprodhimi, shpërndarja apo modifikimi i materialeve tona
          pa leje të shkruar.
        </p>
        <p>
          <span className="text-primary font-semibold">Çmimet: </span>
          Çmimet tona janë të qarta dhe transparente, duke ofruar vlerën më të
          mirë për investimin tuaj.
        </p>
      </div>
      <hr className="border-gray-200" />

      {/* Prohibited Activities */}
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-medium text-[#676D73]">
          Aktivitete të Ndaluara
        </h1>
        <p>
          <span className="text-primary font-semibold">
            Përdorim i Paautorizuar:{" "}
          </span>
          Nuk lejohet përdorimi i shërbimeve tona për qëllime të paligjshme ose
          të dëmshme.
        </p>
        <p>
          <span className="text-primary font-semibold">
            Modifikimi i Programeve:{" "}
          </span>
          Nuk lejohet të ndryshoni apo manipuloni programet e ofruara nga Multi
          Active.
        </p>
      </div>
      <hr className="border-gray-200" />

      {/* Services Management */}
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-medium text-[#676D73]">
          Menaxhimi i Shërbimeve
        </h1>
        <p>
          <span className="text-primary font-semibold">Mbështetje: </span>
          Multi Active ofron mbështetje të plotë për të gjitha shërbimet dhe
          programet e implementuara.
        </p>
        <p>
          <span className="text-primary font-semibold">
            Pezullimi i Shërbimeve:{" "}
          </span>
          Ne rezervojmë të drejtën për të pezulluar aksesin në rast të shkeljes
          së rregullave tona.
        </p>
        <p>
          <span className="text-primary font-semibold">
            Ndryshime në Termat:{" "}
          </span>
          Ne mund të përditësojmë këto terma periodikisht për të reflektuar
          ndryshimet në shërbimet tona.
        </p>
      </div>
      <hr className="border-gray-200" />

      {/* Contact Information */}
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-medium text-[#676D73]">
          Informacion Kontakti
        </h1>
        <p>
          Për çdo pyetje apo paqartësi në lidhje me shërbimet tona, ju lutemi na
          kontaktoni nëpërmjet kanaleve tona zyrtare të komunikimit.
        </p>
        <p>
          Duke përdorur shërbimet tona, ju pranoni të respektoni këto terma dhe
          kushtet.
        </p>
      </div>
    </div>
  );
}

export default Page;
