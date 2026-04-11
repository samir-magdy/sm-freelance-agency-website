// import { Check, Clock, Sparkles } from "lucide-react";
// import WhatsAppIcon from "./WhatsAppIcon";

// export default function PricingCard({
//   tier,
//   lang,
//   isHighlighted,
//   mostPopularLabel,
//   ctaLabel,
//   whatsappMessage,
//   deliveryLabel,
//   currency,
// }) {
//   const message = whatsappMessage.replace("{{package}}", tier.name[lang]);
//   const whatsappUrl = `https://wa.me/201274613331?text=${encodeURIComponent(message)}`;

//   return (
//     <div
//       className={`relative flex flex-col rounded-2xl border transition-all duration-300${
//         isHighlighted
//           ? " border-gold/40 bg-linear-to-b from-gold/10 via-surface-card via-5% to-surface-card shadow-[0_10px_20px_-15px_color-mix(in_oklch,var(--color-gold)_10%,transparent)] lg:scale-[1.01] px-6 md:px-8 pt-10 md:pt-12 pb-6 md:pb-8"
//           : " border-border-subtle bg-surface-card/80 hover:border-border-strong p-6 md:p-8"
//       }`}
//     >
//       {/* Best Value badge */}
//       {isHighlighted && (
//         <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
//           <div className="flex items-center gap-1.5 rounded-full bg-linear-to-b from-gold to-gold-dark px-4 py-1.5 shadow-[0_4px_10px_-4px_color-mix(in_oklch,var(--color-gold)_254%,transparent)]">
//             <Sparkles
//               className="w-3.5 h-3.5 text-gray-900"
//               strokeWidth={2.5}
//               aria-hidden="true"
//             />
//             <span className="text-xs font-bold text-gray-900 tracking-wide whitespace-nowrap">
//               {mostPopularLabel}
//             </span>
//           </div>
//         </div>
//       )}

//       {/* Delivery pill */}
//       <div
//         className={`-ms-1 inline-flex self-start items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium${
//           isHighlighted
//             ? " border-gold/30 bg-gold/10 text-gold"
//             : " border-border-subtle bg-surface-low/50 text-content-muted"
//         }`}
//       >
//         <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
//         <span>
//           {deliveryLabel}: {tier.delivery[lang]}
//         </span>
//       </div>

//       {/* Tier name */}
//       <h3 className="font-bold text-subheading text-content-heading mt-4">
//         {tier.name[lang]}
//       </h3>

//       {/* Tagline */}
//       <p className="mt-2 text-content-body text-caption leading-relaxed">
//         {tier.tagline[lang]}
//       </p>

//       {/* Price */}
//       <div className="mt-5 flex items-baseline gap-1.5">
//         <span className="text-4xl md:text-5xl font-bold text-content-heading tracking-tight">
//           {tier.price}
//         </span>
//         <span className="text-content-muted text-caption font-medium">
//           {currency}
//         </span>
//       </div>

//       {/* Divider */}
//       <div className="my-6 h-px bg-border-subtle" />

//       {/* Features */}
//       <ul className="flex-1 space-y-3">
//         {tier.features.map((feature, i) => (
//           <li key={i} className="flex items-start gap-2.5">
//             <Check
//               className={`w-5 h-5 mt-0.5 shrink-0${
//                 isHighlighted ? " text-gold" : " text-icon"
//               }`}
//               aria-hidden="true"
//               strokeWidth={2.5}
//             />
//             <span className="text-content-body text-caption leading-relaxed">
//               {feature[lang]}
//             </span>
//           </li>
//         ))}
//       </ul>

//       {/* CTA */}
//       <a
//         {...(isHighlighted ? { id: "pricing-cta" } : {})}
//         href={whatsappUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className={`mt-8 flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light${
//           isHighlighted
//             ? " relative overflow-hidden bg-linear-to-b from-gold to-gold-dark text-gray-900"
//             : " border border-border-strong text-content-heading hover:border-gold/40 hover:text-gold"
//         }`}
//       >
//         <WhatsAppIcon />
//         {ctaLabel}
//       </a>
//     </div>
//   );
// }
