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
        } else if (addon.scalesWithScope) {
          flatAddonsCost += Math.round(
            addon.price * (1 + currentScope.multiplier),
          );
        } else {
          flatAddonsCost += addon.price;
        }
      }
    });

    const scopeCost = Math.round(baseType.price * currentScope.multiplier);
    const subTotal = baseType.price + scopeCost;
    return Math.round(subTotal * totalMultiplier) + flatAddonsCost;
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
      ? `أنا استخدمت حاسبة الأسعار من خلال موقعكم و حابب اعرف تفاصيل أكتر.

البيانات المحسوبة:
- نوع الموقع: ${baseType.name.ar}
- حجم المحتوى: ${currentScope.name.ar}
- الإضافات: ${addonNames}
- التكلفة التقديرية: ${displayPrice.toLocaleString()} ${currencySymbol}`
      : `Hello, I just used the price calculator on your website.

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
      <div className="relative max-w-[90rem] w-full mx-auto px-4 py-3 rounded-3xl bg-surface-card/50 shadow-xl shadow-black/30 border-2 border-border-strong flex flex-col gap-2.5 sm:gap-8 md:block md:bg-transparent md:shadow-none md:border-0 md:p-0">
        {/* ========================================= */}
        {/* MOBILE ONLY: Original Header & Price      */}
        {/* ========================================= */}
        <div className="flex justify-between items-center relative z-10 md:hidden">
          <div className="flex flex-col">
            <div className="flex p-1 bg-black/40 rounded-xl border border-white/5 w-fit">
              <button
                onClick={() => setCurrency("EGP")}
                className={`px-2.5 py-0.5 rounded-lg text-sm font-bold transition-all duration-200  ${
                  currency === "EGP"
                    ? "bg-white text-black"
                    : "text-content-muted hover:text-white"
                }`}
              >
                EGP
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`text-sm px-2.5 py-0.5 rounded-lg font-bold transition-all duration-200 ${
                  currency === "USD"
                    ? "bg-white text-black"
                    : "text-content-muted hover:text-white"
                }`}
              >
                USD
              </button>
            </div>
          </div>

          <div className="flex items-end gap-1.5">
            <span className="text-sm inline-block mb-0.5 font-semibold tracking-wider text-content-body">
              {t.estimateLabel[lang]}
            </span>
            <div className="flex items-baseline">
              {currency === "USD" && (
                <span className="text-sm order-1 sm:text-base text-content-body font-medium ms-1">
                  {isRtl ? "دولار" : "USD"}
                </span>
              )}
              <span className="text-[2rem] font-bold text-white tracking-tight leading-none">
                {displayPrice.toLocaleString()}
              </span>
              {currency === "EGP" && (
                <span className="text-md text-content-body font-medium ms-1">
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
          <div className="md:col-span-7 flex flex-col gap-2.5 sm:gap-3.5 md:bg-surface-card/50 md:shadow-xl md:shadow-black/30 md:border-2 md:border-border-strong md:rounded-3xl md:p-6 md:pt-4">
            {/* Step 1: Base Type */}
            <div className="flex flex-col gap-2">
              <label className="ms-1 rtl:mb-1 sm:mb-2 text-content-heading font-bold text-base lg:text-[1.2rem] block">
                {t.baseLabel[lang]}
              </label>
              <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2.5 sm:justify-between items-center">
                {t.bases.map((base) => {
                  const Icon = BASE_ICONS[base.id];
                  const isSelected = baseId === base.id;
                  return (
                    <button
                      key={base.id}
                      onClick={() => handleBaseTypeChange(base.id)}
                      className={`cursor-pointer flex flex-row sm:flex-col items-center sm:items-start text-start p-3 sm:p-4 rounded-2xl border transition-all duration-200 w-full gap-3 sm:gap-2 ${
                        isSelected
                          ? "bg-black/40 shadow-md border-white/60 border-2"
                          : "border-2 border-border-subtle hover:border-border-strong bg-black/15"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 shrink-0 transition-colors ${isSelected ? "text-content-heading" : "text-icon"}`}
                      />
                      <div className="flex flex-col gap-1.5">
                        <span
                          className={`text-sm sm:text-base font-semibold leading-tight transition-colors ${isSelected ? "text-content-heading" : "text-content-heading/95"}`}
                        >
                          {base.name[lang]}
                        </span>
                        <span className="text-xs lg:text-[1.2rem] text-content-muted/90 leading-snug">
                          {base.description[lang]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Size/Scope */}
            <div className="flex flex-col gap-2">
              <label className="ms-1 rtl:mb-1 sm:mb-2 text-content-heading font-bold text-base lg:text-[1.2rem] block">
                {t.scopeLabel[lang]}
              </label>
              <div className="flex flex-wrap gap-2 ">
                {currentScopes.map((scope, index) => {
                  const isSelected = scopeIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setScopeIndex(index)}
                      className={`cursor-pointer flex-1 flex flex-col items-center justify-around gap-1.5 md:gap-0 px-3 py-2.5 rounded-2xl border text-sm transition-all ${
                        isSelected
                          ? "bg-black/40 shadow-md border-white/60 border-2"
                          : "border-2 border-border-subtle hover:border-border-strong bg-black/15"
                      }`}
                    >
                      <span
                        className={`font-semibold text-sm sm:text-base lg:text-xl py-0.5 leading-tight ${isSelected ? "text-content-heading" : "text-content-body"}`}
                      >
                        {scope.name[lang]}
                      </span>
                      {/* <span className="text-xs lg:text-[1.12rem] text-content-muted/90 leading-snug">
                        {scope.description[lang]}
                      </span> */}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Add-ons */}
            <div className="flex flex-col gap-2 mb-2 lg:mb-0">
              <label className="ms-1 rtl:mb-1 sm:mb-2 text-content-heading font-bold text-base lg:text-[1.2rem] block">
                {t.addonsLabel[lang]}
              </label>
              <div className="flex flex-wrap gap-2 md:min-h-20">
                {availableAddons.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`cursor-pointer flex flex-1 flex-col items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl border text-sm transition-all ${
                        isSelected
                          ? "bg-black/40 shadow-md border-white/60 border-2"
                          : "border-2 border-border-subtle hover:border-border-strong bg-black/15"
                      }`}
                    >
                      <span
                        className={`font-semibold text-sm sm:text-base lg:text-xl leading-tight ${isSelected ? "text-content-heading" : "text-content-body"}`}
                      >
                        {addon.name[lang]}
                      </span>
                      <span className="text-xs lg:text-[1.2rem] text-content-muted/90 leading-snug">
                        {addon.description[lang]}
                      </span>
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
              className="sm:hidden mt-0.5 w-[98%] mx-auto border border-green-500/40 bg-green-500/20 hover:bg-green-500/40 transition-colors duration-200 py-3 px-6 text-content-body flex items-center justify-center gap-2 rounded-2xl font-bold text-base"
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

              <div className="flex gap-4 items-end justify-center">
                <span className="inline-block lg:text-2xl font-semibold uppercase tracking-wider text-content-body/95 mb-0.5">
                  {t.estimateLabel[lang]}
                </span>
                <div className="flex items-baseline gap-2">
                  {currency === "USD" && (
                    <span className="text-xl order-1 text-content-muted font-medium">
                      {isRtl ? "دولار" : "USD"}
                    </span>
                  )}
                  <span className="md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none">
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
                className="mt-3.5 w-[95%] mx-auto border border-green-500/40 bg-green-500/20 hover:bg-green-500/40 transition-colors duration-200 py-3 px-6 text-content-body flex items-center justify-center gap-2 rounded-2xl font-bold text-base"
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