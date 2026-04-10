import { TelephoneIcon } from "@/public/TelephoneIcon";
import { MessageIcon } from "@/public/MessageIcon";

function phoneTelHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

type ContactClientProps = {
  email: string;
  phone: string;
};

export default function ContactClient({ email, phone }: ContactClientProps) {
  return (
    <div className="flex flex-col gap-8 px-4 py-8 sm:px-8 lg:px-16">
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Si mund t&apos;ju ndihmojmë?
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Keni ndonjë pyetje ose sugjerim? Na kontaktoni përmes telefonit ose
          emailit më poshtë; do përpiqemi t&apos;ju përgjigjemi sa më shpejt të
          jetë e mundur.
        </p>
      </div>

      <div className="mx-auto mb-4 flex w-full max-w-3xl flex-col items-stretch justify-center gap-4 sm:flex-row sm:gap-8">
        <div className="flex flex-1 flex-col items-center rounded-2xl border border-white/10 bg-card/80 p-6 shadow-[0_0_40px_-18px_rgba(59,130,246,0.15)] backdrop-blur-sm">
          <TelephoneIcon color="text-primary" />
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Na telefononi
          </h3>
          <p className="text-center text-muted-foreground">
            Jemi këtu për t&apos;ju ndihmuar nga e Hëna deri të Premten, 9:00 –
            17:00
          </p>
          <a
            href={phoneTelHref(phone)}
            className="mt-3 font-semibold text-primary transition-colors hover:text-primary/80"
          >
            {phone}
          </a>
        </div>

        <div className="flex flex-1 flex-col items-center rounded-2xl border border-white/10 bg-card/80 p-6 shadow-[0_0_40px_-18px_rgba(59,130,246,0.15)] backdrop-blur-sm">
          <MessageIcon color="text-primary" />
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Na shkruani
          </h3>
          <p className="text-center text-muted-foreground">
            Dërgoni një email dhe ne do t&apos;ju përgjigjemi brenda 24 orëve.
          </p>
          <a
            href={`mailto:${email}`}
            className="mt-3 break-all text-center font-semibold text-primary transition-colors hover:text-primary/80"
          >
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}
