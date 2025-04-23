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
    foodNutrients?: any[];
    finalFoodInputFoods?: any[];
    foodMeasures?: any[];
    foodAttributes?: any[];
    foodAttributeTypes?: any[];
    foodVersionIds?: any[];
  }
  
  export interface FoodSearchResponse {
    foods: Food[];
    totalHits: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  }