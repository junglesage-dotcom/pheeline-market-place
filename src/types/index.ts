export type MarketPermanence = 'PERMANENT' | 'PERIODIC' | 'SEASONAL' | 'TEMPORARY' | 'MOBILE';
export type MarketFunction = 'RETAIL' | 'WHOLESALE' | 'FARM_GATE' | 'AGGREGATION' | 'MIXED';
export type MarketEnvironment = 'URBAN' | 'SUBURBAN' | 'RURAL' | 'REMOTE' | 'ROADSIDE';
export type CommoditySpecialization = 'GENERAL' | 'FOOD' | 'AGRICULTURAL' | 'LIVESTOCK' | 'FISH' | 'TEXTILE' | 'ELECTRONICS' | 'AUTOMOTIVE' | 'BUILDING_MATERIALS' | 'PHARMACEUTICAL' | 'OTHER';

export type MarketDayCycle = 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | 'FOUR_DAY_CYCLE' | 'FIVE_DAY_CYCLE' | 'CUSTOM_CYCLE' | 'SEASONAL' | 'IRREGULAR';

export type MarketActivity = 'ACTIVE_NOW' | 'ACTIVE_TODAY' | 'RECENTLY_ACTIVE' | 'POSSIBLY_ACTIVE' | 'NO_RECENT_CONFIRMATION' | 'CLOSED' | 'SEASONAL';

export type PriceFreshness = 'VERY_RECENT' | 'RECENT' | 'RECENT_ISH' | 'HISTORICAL' | 'STALE';

export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'OUTLIER' | 'PENDING_REVIEW';

export interface Market {
  id: string;
  name: string;
  localName?: string;
  slug: string;
  description: string;
  type: MarketPermanence;
  function: MarketFunction;
  environment: MarketEnvironment;
  specialization: CommoditySpecialization;
  state: string;
  lga: string;
  nearestSettlement: string;
  lat: number;
  lng: number;
  marketDays: string[];
  dayCycle: MarketDayCycle;
  activity: MarketActivity;
  communityConfirmations: number;
  products: string[];
  vendors: number;
  truckAccess: string;
  roadCondition: string;
  lastUpdated: string;
  verified: boolean;
  photos: number;
  reports: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  aliases: string[];
  commonUnits: string[];
  image?: string;
}

export interface PriceObservation {
  id: string;
  productId: string;
  productName: string;
  marketId: string;
  marketName: string;
  price: number;
  currency: string;
  unit: string;
  quantity: number;
  quality: string;
  timestamp: string;
  contributor: string;
  verified: boolean;
  status: VerificationStatus;
  freshness: PriceFreshness;
}

export interface PriceRange {
  productId: string;
  productName: string;
  unit: string;
  lowest: number;
  highest: number;
  median: number;
  average: number;
  reportCount: number;
  lastUpdated: string;
  freshness: PriceFreshness;
}

export interface Vendor {
  id: string;
  businessName: string;
  marketId: string;
  marketName: string;
  phone?: string;
  whatsapp?: string;
  products: string[];
  verified: boolean;
  premium: boolean;
  rating: number;
  reviews: number;
}

export interface Contributor {
  id: string;
  displayName: string;
  reports: number;
  verifiedReports: number;
  marketsContributed: number;
  badges: string[];
  joinedDate: string;
}

export interface MarketCondition {
  id: string;
  marketId: string;
  type: string;
  description: string;
  reportedBy: string;
  timestamp: string;
  expiresAt: string;
}
