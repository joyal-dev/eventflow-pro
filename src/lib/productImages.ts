import chairsImg from "@/assets/product-chairs.jpg";
import tablesImg from "@/assets/product-tables.jpg";
import tentsImg from "@/assets/product-tents.jpg";
import speakersImg from "@/assets/product-speakers.jpg";
import microphonesImg from "@/assets/product-microphones.jpg";
import projectorImg from "@/assets/product-projector.jpg";
import dinnerwareImg from "@/assets/product-dinnerware.jpg";
import cakestandImg from "@/assets/product-cakestand.jpg";
import backdropImg from "@/assets/product-backdrop.jpg";
import popcornImg from "@/assets/product-popcorn.jpg";
import chocolateImg from "@/assets/product-chocolate.jpg";
import smokeImg from "@/assets/product-smoke.jpg";
import lightsImg from "@/assets/product-lights.jpg";

export const productImageMap: Record<string, string> = {
  "1": chairsImg,
  "2": tablesImg,
  "3": tentsImg,
  "4": speakersImg,
  "5": microphonesImg,
  "6": projectorImg,
  "7": chairsImg, // fallback for linens
  "8": dinnerwareImg,
  "9": cakestandImg,
  "10": backdropImg,
  "11": popcornImg,
  "12": chocolateImg,
  "13": smokeImg,
  "14": lightsImg,
};

export function getProductImage(id: string, customImage?: string): string {
  if (customImage && customImage.length > 0) return customImage;
  return productImageMap[id] || chairsImg;
}
