import { Check, Clock } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

export default function PricingCard({
  tier,
  lang,
  isHighlighted,
  mostPopularLabel,
  ctaLabel,
  whatsappMessage,
  deliveryLabel,
  currency,
}) {
  const message = whatsappMessage.replace("{{package}}", tier.name[lang]);
  const whatsappUrl = `https://wa.me/201274613331?text=${encodeURIComponent(message)}`;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 md:p-8 transition-all duration-300${
        isHighlighted
          ? " border-gold/30 bg-surface-card shadow-[0_0_20px_-8px_color-mix(in_oklch,var(--color-gold)_10%,transparent)]"
          : " border-border-subtle bg-surface-card/80 hover:border-border-strong"
      }`}
    >
   

      {/* Tier name */}
      <h3 className="font-bold text-subheading text-content-heading mt-1">
        {tier.name[lang]}
      </h3>

      {/* Tagline */}
      <p className="mt-2 text-content-body text-caption leading-relaxed">
        {tier.tagline[lang]}
      </p>

      {/* Price */}
      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="text-4xl md:text-5xl font-bold text-content-heading tracking-tight">
          {tier.price}
        </span>
        <span className="text-content-muted text-caption font-medium">
          {currency}
        </span>
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-border-subtle" />

      {/* Features */}
      <ul className="flex-1 space-y-3">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Check
              className={`w-5 h-5 mt-0.5 shrink-0${
                isHighlighted ? " text-gold" : " text-icon"
              }`}
              aria-hidden="true"
              strokeWidth={2.5}
            />
            <span className="text-content-body text-caption leading-relaxed">
              {feature[lang]}
            </span>
          </li>
        ))}
      </ul>

      {/* Delivery */}
      <div className="mt-6 flex items-center gap-2 text-content-muted text-caption">
        <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>
          {deliveryLabel}: {tier.delivery[lang]}
        </span>
      </div>

      {/* CTA */}
      <a
        {...(isHighlighted ? { id: "pricing-cta" } : {})}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light${
          isHighlighted
            ? " relative overflow-hidden bg-linear-to-b from-gold to-gold-dark text-gray-900"
            : " border border-border-strong text-content-heading hover:border-gold/40 hover:text-gold"
        }`}
      >
        <WhatsAppIcon />
        {ctaLabel}
      </a>
    </div>
  );
}
