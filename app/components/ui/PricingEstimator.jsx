"use client";

import { useState, useMemo, useCallback } from "react";
import { Globe, Layout, Zap } from "lucide-react";
import translations from "@/app/data/translations";
import WhatsAppIcon from "./WhatsAppIcon";

const BASE_ICONS = { landing: Layout, business: Globe, ecommerce: Zap };

export default function PricingEstimator({ lang }) {
  const t = translations.pricingEstimator;
  const USD_EXCHANGE_RATE = t.usdExchangeRate;
  const isRtl = lang === "ar";

  // 1. State: Primitives only
  const [baseId, setBaseId] = useState(t.bases[0].id);
  const [scopeIndex, setScopeIndex] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [currency, setCurrency] = useState("EGP");

  // 2. Derived State
  const baseType = useMemo(
    () => t.bases.find((b) => b.id === baseId) || t.bases[0],
    [baseId],
  );

  // Scopes are now looked up per base type
  const currentScopes = useMemo(() => t.scopesByBase[baseId], [baseId]);
  const currentScope = useMemo(
    () => currentScopes[scopeIndex] ?? currentScopes[0],
    [currentScopes, scopeIndex],
  );

  const availableAddons = useMemo(
    () => t.addons.filter((addon) => addon.appliesTo.includes(baseId)),
    [baseId],
  );

  // 3. Callbacks
  const handleBaseTypeChange = useCallback((id) => {
    setBaseId(id);
    setSelectedAddons([]);
    setScopeIndex(0); // reset scope when base changes
  }, []);

  const toggleAddon = useCallback((id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  }, []);

  // 4. Calculations
  const totalEGP = useMemo(() => {
    let flatAddonsCost = 0;
    let totalMultiplier = 1;

    selectedAddons.forEach((addonId) => {
      const addon = t.addons.find((a) => a.id === addonId);
      if (addon) {
        if (addon.isMultiplier) {
          const bilingualMultiplier = addon.multiplierByBase[baseId] ?? 0.4;
          totalMultiplier += bilingualMultiplier;
        } else {
          flatAddonsCost += addon.price;
        }
      }
    });

    const scopeCost = Math.round(baseType.price * currentScope.multiplier);
    const subTotal = baseType.price + scopeCost + flatAddonsCost;
    return Math.round(subTotal * totalMultiplier);
  }, [baseId, baseType.price, currentScope.multiplier, selectedAddons]);

  const displayPrice =
    currency === "EGP" ? totalEGP : Math.round(totalEGP / USD_EXCHANGE_RATE);
  const currencySymbol = currency === "EGP" ? (isRtl ? "ج.م" : "EGP") : "$";

  const whatsappUrl = useMemo(() => {
    const addonNames =
      selectedAddons.length > 0
        ? selectedAddons
            .map((id) => t.addons.find((a) => a.id === id)?.name[lang])
            .join(isRtl ? "، " : ", ")
        : isRtl
          ? "بدون إضافات"
          : "None";

    const message = isRtl
      ? `مرحباً، لقد قمت بحساب تكلفة مبدئية لمشروعي عبر موقعكم وأريد التأكد من دقتها من خلال مكالمة استشارية.

البيانات المحسوبة:
- نوع الموقع: ${baseType.name.ar}
- حجم المحتوى: ${currentScope.name.ar}
- الإضافات: ${addonNames}
- التكلفة التقديرية: ${displayPrice.toLocaleString()} ${currencySymbol}`
      : `Hello, I just used the price calculator on your website and want to verify the accuracy through a consultation call.

The Calculated Data:
- Type: ${baseType.name.en}
- Size: ${currentScope.name.en}
- Add-ons: ${addonNames}
- Calculated Price: ${displayPrice.toLocaleString()} ${currencySymbol}`;

    return `https://wa.me/201274613331?text=${encodeURIComponent(message)}`;
  }, [
    lang,
    isRtl,
    baseType,
    currentScope,
    selectedAddons,
    displayPrice,
    currencySymbol,
  ]);

  return (
    <>
      <div className="relative max-w-7xl w-full mx-auto px-4 py-3 rounded-3xl bg-surface-card/50 shadow-xl shadow-black/30 border-2 border-border-subtle flex flex-col gap-3.5 sm:gap-8 md:block md:bg-transparent md:shadow-none md:border-0 md:p-0">
        {/* ========================================= */}
        {/* MOBILE ONLY: Original Header & Price      */}
        {/* ========================================= */}
        <div className="flex justify-between items-center relative z-10 md:hidden">
          <div className="flex flex-col gap-2 sm:gap-3 md:pt-4">
            <div className="flex p-1 bg-black/40 rounded-2xl border border-white/5 w-fit">
              <button
                onClick={() => setCurrency("EGP")}
                className={`cursor-pointer px-4 py-1 rounded-lg font-bold transition-all duration-200  ${
                  currency === "EGP"
                    ? "bg-white text-black"
                    : "text-content-muted hover:text-white"
                }`}
              >
                EGP
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`cursor-pointer px-4 py-1 rounded-lg font-bold transition-all duration-200 ${
                  currency === "USD"
                    ? "bg-white text-black"
                    : "text-content-muted hover:text-white"
                }`}
              >
                USD
              </button>
            </div>
          </div>

          <div className="flex gap-1 me-3">
            <div className="flex items-baseline gap-0.5">
              {currency === "USD" && (
                <span className="text-sm order-1 sm:text-base text-content-muted font-medium ms-1">
                  {isRtl ? "دولار" : "USD"}
                </span>
              )}
              <span className="text-[2.5rem] font-bold text-white tracking-tight leading-none">
                {displayPrice.toLocaleString()}
              </span>
              {currency === "EGP" && (
                <span className="text-md text-content-muted font-medium ms-1">
                  {currencySymbol}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* DESKTOP SPLIT CONTAINER - Fixed using Grid */}
        <div className="flex flex-col md:grid md:grid-cols-12 md:gap-8 w-full">
          {/* ========================================= */}
          {/* LEFT COLUMN: Configuration Steps          */}
          {/* ========================================= */}
          <div className="md:col-span-7 flex flex-col gap-2.5 sm:gap-8 md:bg-surface-card/50 md:shadow-xl md:shadow-black/30 md:border-2 md:border-border-subtle md:rounded-3xl md:p-6 md:pt-4">
            {/* Step 1: Base Type */}
            <div className="flex flex-col gap-2">
              <label className="ms-1 text-content-heading font-bold uppercase tracking-wider block lg:text-[1.25rem]">
                {t.baseLabel[lang]}
              </label>
              <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2.5 sm:gap-3">
                {t.bases.map((base) => {
                  const Icon = BASE_ICONS[base.id];
                  const isSelected = baseId === base.id;
                  return (
                    <button
                      key={base.id}
                      onClick={() => handleBaseTypeChange(base.id)}
                      className={`cursor-pointer flex flex-row sm:flex-col items-center sm:items-center text-center p-3 sm:p-4 sm:px-6 rounded-2xl border transition-all duration-200 w-full ${
                        isSelected
                          ? "bg-black/40 text-content-heading shadow-md border-white/60 border-2"
                          : "border-2 border-border-subtle hover:border-border-strong bg-black/15"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 sm:w-7 sm:h-7 sm:mb-2.5 me-3 sm:me-0 shrink-0 transition-colors ${isSelected ? "text-content-heading" : "text-icon"}`}
                      />
                      <span
                        className={`text-sm sm:text-base lg:text-[1.25rem] font-semibold transition-colors ${isSelected ? "text-content-heading" : "text-content-body"}`}
                      >
                        {base.name[lang]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Size/Scope — now context-aware per base type */}
            <div className="flex flex-col gap-2">
              <label className="ms-1 text-content-heading font-bold uppercase tracking-wider lg:text-[1.25rem]">
                {t.scopeLabel[lang]}
              </label>
              <div className="flex flex-wrap gap-2 md:justify-between">
                {currentScopes.map((scope, index) => {
                  const isSelected = scopeIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setScopeIndex(index)}
                      className={`cursor-pointer flex-1 flex md:gap-4 justify-center items-center gap-1 px-2.5 py-2 rounded-2xl border text-sm sm:text-base lg:text-[1.25rem] transition-all ${
                        isSelected
                          ? "bg-black/40 text-content-heading shadow-md border-white/60 border-2"
                          : "border-2 border-border-subtle hover:border-border-strong bg-black/15"
                      }`}
                    >
                      <span>{scope.name[lang]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Add-ons */}
            <div className="flex flex-col gap-2 mb-2 lg:mb-0">
              <label className="ms-1 text-content-heading font-bold uppercase tracking-wider block lg:text-[1.25rem]">
                {t.addonsLabel[lang]}
              </label>
              <div className="flex flex-wrap gap-2">
                {availableAddons.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`cursor-pointer flex flex-1 md:gap-4 justify-center items-center gap-1 px-2.5 py-2 rounded-2xl border text-sm sm:text-base lg:text-[1.25rem] transition-all ${
                        isSelected
                          ? "bg-black/40 text-content-heading shadow-md border-white/60 border-2"
                          : "border-2 border-border-subtle hover:border-border-strong bg-black/15"
                      }`}
                    >
                      <span>{addon.name[lang]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================= */}
            {/* MOBILE ONLY: Original CTA Button          */}
            {/* ========================================= */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary relative overflow-hidden inline-flex md:hidden items-center justify-center gap-3 py-2.5 px-5 rounded-2xl bg-linear-to-b from-gold to-gold-dark text-gray-900 text-lg font-semibold tracking-wide transition-all duration-200"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>{t.cta[lang]}</span>
            </a>
          </div>

          {/* ========================================= */}
          {/* DESKTOP ONLY: Sticky Summary Panel        */}
          {/* ========================================= */}
          <div className="hidden md:block md:col-span-5">
            <div className="h-full sticky top-24 flex flex-col justify-between px-3 pt-3 pb-6 rounded-3xl border-2 border-border-strong bg-black/35 shadow-lg shadow-black/30">
              <div className="flex p-1 bg-black/40 rounded-2xl border border-white/5">
                <button
                  onClick={() => setCurrency("EGP")}
                  className={`cursor-pointer flex-1 py-2 rounded-2xl font-bold transition-all duration-200 ${
                    currency === "EGP"
                      ? "bg-white text-black shadow-sm"
                      : "text-content-muted hover:text-white"
                  }`}
                >
                  EGP
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={`cursor-pointer flex-1 py-2 rounded-2xl font-bold transition-all duration-200 ${
                    currency === "USD"
                      ? "bg-white text-black shadow-sm"
                      : "text-content-muted hover:text-white"
                  }`}
                >
                  USD
                </button>
              </div>

              <div className="flex flex-col gap-1 items-center text-center py-4">
                <div className="flex items-baseline justify-center gap-2">
                  {currency === "USD" && (
                    <span className="text-xl order-1 text-content-muted font-medium">
                      {isRtl ? "دولار" : "USD"}
                    </span>
                  )}
                  <span className="md:text-6xl lg:text-8xl font-bold text-white tracking-tight leading-none">
                    {displayPrice.toLocaleString()}
                  </span>
                  {currency === "EGP" && (
                    <span className="text-xl text-content-muted font-medium ms-1">
                      {currencySymbol}
                    </span>
                  )}
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary relative w-full md:w-[96%] mx-auto overflow-hidden inline-flex items-center justify-center gap-3 py-4 rounded-2xl bg-linear-to-b from-gold to-gold-dark text-gray-900 text-lg font-bold tracking-wide transition-all"
              >
                <WhatsAppIcon className="w-6 h-6" />
                <span>{t.cta[lang]}</span>
              </a>
            </div>
          </div>
        </div>

        <small className="block w-full sm:mt-6 text-center text-xs sm:text-xl font-semibold text-content-muted leading-relaxed tracking-wide">
          * {t.disclaimer[lang]}
        </small>
      </div>
    </>
  );
}
