export const PRODUCT_CATEGORIES = [
  { value: "MOBILE_PHONES_ACCESSORIES", label: "Mobile Phones & Accessories" },
  { value: "BEAUTY_PERSONAL_CARE", label: "Beauty & Personal Care" },
  { value: "FASHION_APPAREL", label: "Fashion & Apparel" },
  { value: "HOME_KITCHEN", label: "Home & Kitchen" },
  { value: "HEALTH_WELLNESS", label: "Health & Wellness" },
  { value: "BABY_KIDS", label: "Baby & Kids" },
  { value: "AUTOMOTIVE_ACCESSORIES", label: "Automotive Accessories" },
  { value: "GAMING_TECH_ACCESSORIES", label: "Gaming & Tech Accessories" },
  { value: "PET_SUPPLIES", label: "Pet Supplies" },
  { value: "SMART_HOME_PRODUCTS", label: "Smart Home Products" },
] as const;

export type ProductCategoryValue = typeof PRODUCT_CATEGORIES[number]["value"];

export function getCategoryLabel(value: string): string {
  return PRODUCT_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}
