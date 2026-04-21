import { Check, Clock } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

export default function PricingCard({
  tier,
  lang,
  ctaLabel,
  whatsappMessage,
  deliveryLabel,
  currency,
  includesLabel,
}) {
  const message = whatsappMessage.replace("{{package}}", tier.name[lang]);
  const whatsappUrl = `https://wa.me/201274613331?text=${encodeURIComponent(message)}`;

  return (
    <div className="relative flex flex-col gap-4 h-full p-6 rounded-2xl bg-surface-card shadow shadow-black/5 border border-content-muted/20">

      <div className="mb-5">
        {/* Tier name */}
        <h3 className="text-content-heading font-semibold mb-6 text-3xl">
          {tier.name[lang]}
        </h3>

        {/* Price */}
        <div className="inline-flex items-baseline mb-6">
          <span className="text-content-heading font-bold text-5xl">
            {tier.price}
          </span>
          <span className="text-content-muted font-medium ms-1.5">
            {currency}
          </span>
        </div>

        {/* Tagline */}
        <p className="text-lg text-content-muted mb-6">
          {tier.tagline[lang]}
        </p>

        {/* CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden w-full inline-flex justify-center items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-3.5 text-md sm:text-lg font-medium shadow-sm shadow-black/10 transition-colors duration-150 focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light cta-primary bg-linear-to-b from-gold to-gold-dark text-gray-900"
        >
          <WhatsAppIcon />
          {ctaLabel}
        </a>
      </div>


      {/* Includes label */}
      <div className="text-content-heading font-medium">
        {includesLabel}
      </div>

      {/* Features */}
      <ul className="text-content-body text-md space-y-3 grow mb-4">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <Check
              className="w-3 h-3 shrink-0"
         
              strokeWidth={3}
              aria-hidden="true"
            />
            <span>{feature[lang]}</span>
          </li>
        ))}
      </ul>

      {/* Delivery pill */}
      <div
        className="inline-flex self-start items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium border-border-subtle bg-surface-low/50 text-content-muted"
        
      >
        <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>
          {deliveryLabel}: {tier.delivery[lang]}
        </span>
      </div>
    </div>
  );
}
