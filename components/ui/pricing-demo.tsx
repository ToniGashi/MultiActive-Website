import { PricingSection } from "@/components/ui/pricing";

const demoPlans = [
  {
    name: "Argjend",
    price: "3900",
    yearlyPrice: "3200",
    period: "muaj",
    features: [
      "Qasje ne nje grup palestrash lokale partnere",
      "Ideale per kompani me partner prane vendndodhjes",
      "Aktivizim i thjeshte per punonjesit",
      "Mbeshtejte fillestare per onboardim",
      "Raportim bazik i perdorimit",
    ],
    description: "Pakete e balancuar per nisje te shpejte.",
    buttonText: "Kerko oferte",
    href: "/contact",
  },
  {
    name: "Flori",
    price: "5900",
    yearlyPrice: "4800",
    period: "muaj",
    features: [
      "Qasje ne te gjitha palestrat partnere",
      "Zbritje ne dyqanet partnere",
      "Perfitime shtese per ekipet aktive",
      "Mbeshtejte prioritare per kompani",
      "Raportim i zgjeruar per HR",
    ],
    description: "Plani me i kerkuar per kompanite ne rritje.",
    buttonText: "Zgjidh Flori",
    href: "/contact",
    isPopular: true,
  },
  {
    name: "Diamant",
    price: "8900",
    yearlyPrice: "7200",
    period: "muaj",
    features: [
      "Perfshin gjithcka nga plani Flori",
      "Zbritje ne aktivitete dhe sherbime shtese",
      "Perfitime premium te rrjetit ne zgjerim",
      "Menaxher i dedikuar per llogarine",
      "Pakete ideale per impact afatgjate",
    ],
    description: "Zgjidhja me e plote per mireqenie korporative.",
    buttonText: "Kontakto shitjet",
    href: "/contact",
  },
];

export default function PricingSectionDemo() {
  return (
    <PricingSection
      plans={demoPlans}
      title="Zgjidh planin ideal per punonjesit tuaj"
      description="Ne ofrojme 3 plane abonimi: Argjend, Flori dhe Diamant. Zgjidh nivelin qe i pershtatet objektivave te kompanise suaj."
    />
  );
}
