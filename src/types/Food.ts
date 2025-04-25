export interface Food {
  fdcId: number;
  description: string;
  dataType?: string;
  publishedDate?: string;
  brandOwner?: string;
  foodCategory?: string;
  tags?: string[];
  allHighlightFields?: string;
  score?: number;
  microbes?: any[];
  foodNutrients?: Array<{
    nutrientId: number;
    nutrientName: string;
    nutrientNumber: string;
    unitName: string;
    value: number;
  }>;
  finalFoodInputFoods?: Array<{
    gramWeight: number;
    foodDescription: string;
    unit: number;
  }>;
  foodMeasures?: Array<{
    disseminationText?: String;
    measureUnitName?: String;
    measureUnitId?: number;
    measureUnitAbbreviation?: String;
    id?: number;
    gramWeight?: number;
    
  }>;
  foodAttributes?: any[];
  foodClass?: string;
  startDate?: any;
  endDate?: any;
  publicationDate?: any;
  foodCode?: string;
  foodAttributeTypes?: any[];
  foodVersionIds?: any[];
  brandName?: string;
  ingredients?: string;
  servingSize?: number;
  servingSizeUnit?: string;
}

export interface FoodSearchResponse {
  foods: Food[];
  totalHits: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}
