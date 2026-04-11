// import translations from "@/app/data/translations";
// import PricingCard from "../ui/PricingCard";

// export default function PricingSection({ lang }) {
//   const t = translations.pricingSection;
//   const isRtl = lang === "ar";

//   return (
//     <section
//       id="pricing"
//       className="py-20 md:py-36 px-4"
//       aria-labelledby="pricing-heading"
//       dir={isRtl ? "rtl" : "ltr"}
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* Heading */}
//         <div className="mb-10 md:mb-14 text-center">
//           <h2
//             id="pricing-heading"
//             className="font-bold text-heading"
//           >
//             {t.heading[lang]}
//           </h2>
//         </div>

//         {/* Cards grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-5 max-w-5xl mx-auto lg:items-stretch">
//           {t.tiers.map((tier) => (
//             <PricingCard
//               key={tier.name.en}
//               tier={tier}
//               lang={lang}
//               isHighlighted={tier.highlighted === true}
//               mostPopularLabel={t.mostPopular[lang]}
//               ctaLabel={t.cta[lang]}
//               whatsappMessage={t.whatsappMessage[lang]}
//               deliveryLabel={t.deliveryLabel[lang]}
//               currency={t.currency[lang]}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
