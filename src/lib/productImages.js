import chairsImg from "@/assets/product-chairs.jpg";
import tablesImg from "@/assets/product-tables.jpg";
import linensImg from "@/assets/product-linens.jpg";
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

export const productImageMap = {
  "1": chairsImg,
  "2": tablesImg,
  "3": tentsImg,
  "4": speakersImg,
  "5": microphonesImg,
  "6": projectorImg,
  "7": linensImg,
  "8": dinnerwareImg,
  "9": cakestandImg,
  "10": backdropImg,
  "11": popcornImg,
  "12": chocolateImg,
  "13": smokeImg,
  "14": lightsImg,
};

/**
 * Resolves a product image, preferring an image picked from the device gallery
 * (e.g. Capacitor Camera/Photos, Expo ImagePicker, or a raw <input type="file">)
 * over the default catalog image.
 *
 * `galleryImage` can be:
 *  - a string (URL or base64 data URI) — used as-is
 *  - an object with a `uri`, `path`, or `webPath` property — common shapes
 *    returned by native gallery pickers
 *  - a File/Blob — converted to an object URL for display
 *
 * @param {string} id - product id, used to fall back to the catalog image
 * @param {string|File|Blob|{uri?:string,path?:string,webPath?:string}} galleryImage
 */
export function getProductImage(id, galleryImage) {
  const resolved = resolveGalleryImage(galleryImage);
  if (resolved) {
    return resolved;
  }
  return productImageMap[id] || chairsImg;
}

function resolveGalleryImage(galleryImage) {
  if (!galleryImage) {
    return null;
  }

  // Plain URL or base64 data URI
  if (typeof galleryImage === "string") {
    return galleryImage.length > 0 ? galleryImage : null;
  }

  // File/Blob selected directly from the device (e.g. <input type="file">)
  if (typeof Blob !== "undefined" && galleryImage instanceof Blob) {
    return URL.createObjectURL(galleryImage);
  }

  // Object shapes returned by native gallery pickers
  if (typeof galleryImage === "object") {
    return galleryImage.webPath || galleryImage.uri || galleryImage.path || null;
  }

  return null;
}