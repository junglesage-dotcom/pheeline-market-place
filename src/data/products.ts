import { Product, PriceRange } from '../types';

export const productCategories = [
  {
    id: 'agriculture',
    name: 'Agriculture',
    subcategories: [
      { id: 'roots-tubers', name: 'Roots & Tubers' },
      { id: 'cereals', name: 'Cereals & Grains' },
      { id: 'vegetables', name: 'Vegetables' },
      { id: 'fruits', name: 'Fruits' },
      { id: 'legumes', name: 'Legumes & Pulses' },
      { id: 'livestock', name: 'Livestock' },
      { id: 'fish', name: 'Fish & Seafood' },
      { id: 'farm-inputs', name: 'Farm Inputs' },
      { id: 'oils', name: 'Oils & Fats' },
    ]
  },
  {
    id: 'food',
    name: 'Food & Beverages',
    subcategories: [
      { id: 'processed', name: 'Processed Foods' },
      { id: 'spices', name: 'Spices & Seasonings' },
      { id: 'beverages', name: 'Beverages' },
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion & Textiles',
    subcategories: [
      { id: 'fabrics', name: 'Fabrics' },
      { id: 'ready-made', name: 'Ready-made Clothing' },
      { id: 'footwear', name: 'Footwear' },
      { id: 'accessories', name: 'Accessories' },
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    subcategories: [
      { id: 'phones', name: 'Phones & Accessories' },
      { id: 'appliances', name: 'Home Appliances' },
      { id: 'computer', name: 'Computer & Accessories' },
    ]
  },
  {
    id: 'building',
    name: 'Building Materials',
    subcategories: [
      { id: 'cement', name: 'Cement & Blocks' },
      { id: 'iron', name: 'Iron & Steel' },
      { id: 'wood', name: 'Wood & Timber' },
      { id: 'paints', name: 'Paints & Finishes' },
    ]
  },
  {
    id: 'household',
    name: 'Household',
    subcategories: [
      { id: 'kitchen', name: 'Kitchen Items' },
      { id: 'furniture', name: 'Furniture' },
      { id: 'cleaning', name: 'Cleaning Supplies' },
    ]
  }
];

export const products: Product[] = [
  // Roots & Tubers
  { id: 'p1', name: 'Cassava', category: 'Agriculture', subcategory: 'Roots & Tubers', aliases: ['Manioc', 'Mandu', 'Akpu'], commonUnits: ['tuber', 'bag', 'tonne', 'derica'] },
  { id: 'p2', name: 'Yam', category: 'Agriculture', subcategory: 'Roots & Tubers', aliases: ['Isubu', 'Ji'], commonUnits: ['tuber', 'bundle', 'sack'] },
  { id: 'p3', name: 'Sweet Potato', category: 'Agriculture', subcategory: 'Roots & Tubers', aliases: ['Batata'], commonUnits: ['kg', 'basket', 'sack'] },
  { id: 'p4', name: 'Plantain', category: 'Agriculture', subcategory: 'Fruits', aliases: ['Ogede', 'Uniqua'], commonUnits: ['bunch', 'hand', 'finger'] },
  
  // Cereals
  { id: 'p5', name: 'Rice', category: 'Agriculture', subcategory: 'Cereals & Grains', aliases: ['Iresi', 'Osikaba', 'Shinkafa'], commonUnits: ['bag', 'sack', 'kg', 'mudu'] },
  { id: 'p6', name: 'Maize', category: 'Agriculture', subcategory: 'Cereals & Grains', aliases: ['Corn', 'Okpo', 'Masara'], commonUnits: ['bag', 'sack', 'kg', 'mudu', 'basket'] },
  { id: 'p7', name: 'Sorghum', category: 'Agriculture', subcategory: 'Cereals & Grains', aliases: ['Guinea corn', 'Dawa'], commonUnits: ['bag', 'sack', 'mudu'] },
  { id: 'p8', name: 'Millet', category: 'Agriculture', subcategory: 'Cereals & Grains', aliases: ['Gero'], commonUnits: ['bag', 'mudu', 'kg'] },
  
  // Vegetables
  { id: 'p9', name: 'Tomatoes', category: 'Agriculture', subcategory: 'Vegetables', aliases: ['Tomato', 'Tumatir'], commonUnits: ['basket', 'crate', 'kg', 'paint rubber'] },
  { id: 'p10', name: 'Pepper', category: 'Agriculture', subcategory: 'Vegetables', aliases: ['Ata rodo', 'Ose', 'Barkono'], commonUnits: ['basket', 'kg', 'paint rubber', 'bag'] },
  { id: 'p11', name: 'Onions', category: 'Agriculture', subcategory: 'Vegetables', aliases: ['Alubosa', 'Yaba', 'Albasa'], commonUnits: ['bag', 'sack', 'kg'] },
  { id: 'p12', name: 'Cabbage', category: 'Agriculture', subcategory: 'Vegetables', aliases: [], commonUnits: ['piece', 'basket', 'kg'] },
  { id: 'p13', name: 'Carrots', category: 'Agriculture', subcategory: 'Vegetables', aliases: [], commonUnits: ['kg', 'basket', 'sack'] },
  
  // Legumes
  { id: 'p14', name: 'Beans', category: 'Agriculture', subcategory: 'Legumes & Pulses', aliases: ['Ewa', 'Agwa', 'Wake'], commonUnits: ['bag', 'sack', 'mudu', 'kg', 'paint rubber'] },
  { id: 'p15', name: 'Groundnut', category: 'Agriculture', subcategory: 'Legumes & Pulses', aliases: ['Peanut', 'Okpa', 'Gyada'], commonUnits: ['bag', 'sack', 'kg', 'mudu'] },
  
  // Fish
  { id: 'p16', name: 'Fresh Fish', category: 'Agriculture', subcategory: 'Fish & Seafood', aliases: ['Eja tuntun', 'Azụ ohuru'], commonUnits: ['kg', 'piece', 'basin'] },
  { id: 'p17', name: 'Smoked Fish', category: 'Agriculture', subcategory: 'Fish & Seafood', aliases: ['Eja gbigbe'], commonUnits: ['kg', 'basket', 'piece'] },
  { id: 'p18', name: 'Stockfish', category: 'Agriculture', subcategory: 'Fish & Seafood', aliases: ['Okporoko', 'Panla'], commonUnits: ['kg', 'piece', 'bundle'] },
  
  // Oils
  { id: 'p19', name: 'Palm Oil', category: 'Agriculture', subcategory: 'Oils & Fats', aliases: ['Bode', 'Mmanu nkwu', 'Mai'], commonUnits: ['litre', 'gallon', 'derica', 'basin'] },
  { id: 'p20', name: 'Groundnut Oil', category: 'Agriculture', subcategory: 'Oils & Fats', aliases: [], commonUnits: ['litre', 'gallon', 'bottle'] },
  
  // Processed
  { id: 'p21', name: 'Garri', category: 'Agriculture', subcategory: 'Processed Foods', aliases: ['Cassava flakes', 'Eba'], commonUnits: ['bag', 'sack', 'kg', 'mudu', 'paint rubber'] },
  { id: 'p22', name: 'Semovita/Semolina', category: 'Agriculture', subcategory: 'Processed Foods', aliases: ['Semolina'], commonUnits: ['bag', 'kg'] },
  
  // Livestock
  { id: 'p23', name: 'Cattle', category: 'Agriculture', subcategory: 'Livestock', aliases: ['Cow', 'Shanu', 'Ehi'], commonUnits: ['head', 'piece'] },
  { id: 'p24', name: 'Goats', category: 'Agriculture', subcategory: 'Livestock', aliases: ['Ewure', 'Ewu'], commonUnits: ['head', 'piece'] },
  { id: 'p25', name: 'Poultry', category: 'Agriculture', subcategory: 'Livestock', aliases: ['Chicken', 'Akwa', 'Kaza'], commonUnits: ['piece', 'dozen', 'crate'] },
  
  // Farm Inputs
  { id: 'p26', name: 'Fertilizer', category: 'Agriculture', subcategory: 'Farm Inputs', aliases: ['NPK', 'Urea'], commonUnits: ['bag', 'sack', 'kg'] },
  { id: 'p27', name: 'Palm Kernel', category: 'Agriculture', subcategory: 'Oils & Fats', aliases: ['PKC'], commonUnits: ['bag', 'tonne', 'kg'] },
  
  // Textiles
  { id: 'p28', name: 'Ankara Fabric', category: 'Fashion & Textiles', subcategory: 'Fabrics', aliases: ['African print', 'Wax print'], commonUnits: ['yard', 'piece', '6 yards'] },
  { id: 'p29', name: 'Aso Oke', category: 'Fashion & Textiles', subcategory: 'Fabrics', aliases: ['Top textile'], commonUnits: ['yard', 'set'] },
];

export const priceRanges: PriceRange[] = [
  { productId: 'p9', productName: 'Tomatoes', unit: 'basket', lowest: 8000, highest: 15000, median: 11000, average: 11500, reportCount: 42, lastUpdated: '2 hours ago', freshness: 'VERY_RECENT' },
  { productId: 'p10', productName: 'Pepper', unit: 'basket', lowest: 6000, highest: 12000, median: 8500, average: 9000, reportCount: 38, lastUpdated: '3 hours ago', freshness: 'VERY_RECENT' },
  { productId: 'p11', productName: 'Onions', unit: 'bag', lowest: 25000, highest: 38000, median: 31000, average: 32000, reportCount: 56, lastUpdated: '1 hour ago', freshness: 'VERY_RECENT' },
  { productId: 'p5', productName: 'Rice', unit: 'bag (50kg)', lowest: 45000, highest: 62000, median: 52000, average: 53000, reportCount: 89, lastUpdated: '4 hours ago', freshness: 'VERY_RECENT' },
  { productId: 'p14', productName: 'Beans', unit: 'bag (100kg)', lowest: 55000, highest: 78000, median: 65000, average: 66000, reportCount: 67, lastUpdated: '5 hours ago', freshness: 'RECENT' },
  { productId: 'p6', productName: 'Maize', unit: 'bag', lowest: 22000, highest: 32000, median: 27000, average: 28000, reportCount: 45, lastUpdated: '6 hours ago', freshness: 'RECENT' },
  { productId: 'p1', productName: 'Cassava', unit: 'derica', lowest: 3000, highest: 5500, median: 4000, average: 4200, reportCount: 34, lastUpdated: '1 day ago', freshness: 'RECENT' },
  { productId: 'p2', productName: 'Yam', unit: 'tuber', lowest: 2500, highest: 5000, median: 3500, average: 3700, reportCount: 52, lastUpdated: '8 hours ago', freshness: 'RECENT' },
  { productId: 'p4', productName: 'Plantain', unit: 'bunch', lowest: 2000, highest: 4000, median: 3000, average: 3100, reportCount: 28, lastUpdated: '12 hours ago', freshness: 'RECENT' },
  { productId: 'p19', productName: 'Palm Oil', unit: '25 litres', lowest: 18000, highest: 28000, median: 22000, average: 23000, reportCount: 31, lastUpdated: '1 day ago', freshness: 'RECENT' },
  { productId: 'p21', productName: 'Garri', unit: 'bag (100kg)', lowest: 35000, highest: 48000, median: 40000, average: 41000, reportCount: 44, lastUpdated: '2 days ago', freshness: 'RECENT_ISH' },
  { productId: 'p16', productName: 'Fresh Fish', unit: 'kg', lowest: 3500, highest: 6000, median: 4500, average: 4700, reportCount: 22, lastUpdated: '3 hours ago', freshness: 'VERY_RECENT' },
  { productId: 'p26', productName: 'Fertilizer (NPK)', unit: 'bag (50kg)', lowest: 18000, highest: 25000, median: 21000, average: 21500, reportCount: 15, lastUpdated: '3 days ago', freshness: 'RECENT_ISH' },
  { productId: 'p23', productName: 'Cattle', unit: 'head', lowest: 350000, highest: 650000, median: 480000, average: 490000, reportCount: 12, lastUpdated: '1 day ago', freshness: 'RECENT' },
  { productId: 'p25', productName: 'Poultry (Broiler)', unit: 'piece', lowest: 8000, highest: 14000, median: 11000, average: 11200, reportCount: 38, lastUpdated: '6 hours ago', freshness: 'RECENT' },
];
