export interface Food {
  calories: number,
  carbs:number,
  carbs_unit: number,
  carbs_unit_protein: number,
  fat: number,
  food_id: number,
  food_name: string,
  protein: number,
  unit: string,
  weight: number,
  serving_id?: number,
  amount_gram?:number,
  amount_portion?:number,
  meal_id?:number,
  user_food_id?:number
}
