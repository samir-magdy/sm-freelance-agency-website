export const SITE_URL = new URL("https://smweb.studio").origin;
export const SITE_NAME = "SM Web Studio";
export const PHONE_NUMBER = "+201233386157";
export const PHONE_DISPLAY = "+20 123 338 6157";
export const CONTACT_EMAIL = "info@smweb.studio";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/smweb.studio",
  facebook: "https://www.facebook.com/SMWebStudioEgypt",
  whatsapp: "https://wa.me/+201233386157",
  gbp: "https://www.google.com/maps/place/?q=place_id:ChIJvcMWKdK8MGERZCgcuuWWS1c",
  linkedin: "https://www.linkedin.com/company/sm-web-studio-egypt/",
} as const;

export const FOUNDER_LINKS = {
  linkedin: "https://www.linkedin.com/in/samir-magdy-/",
  github: "https://github.com/samir-magdy",
} as const;

export const CURRENT_YEAR = new Date().getFullYear();

export const SCHEMA_IDS = {
  business: `${SITE_URL}#business`,
  founder: `${SITE_URL}#founder`,
  website: `${SITE_URL}#website`,
} as const;