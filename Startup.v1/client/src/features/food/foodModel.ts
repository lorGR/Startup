export interface Food {
  calories: number,
  carbs:number,
  carbs_unit: number,
  carbs_unit_protein: number,
  fat: number,
  food_id: number,
  food_name: string,
  protien: number,
  unit: string,
  weight: number,
  serving_id?: number,
  amount?:number,
  meal_id?:number
}
