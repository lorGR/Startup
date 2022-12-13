export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum DiabetesTypes {
  ONE = "1",
  TWO = "2",
}

export enum CarbsUnit {
    GRAM = "gram",
    PORTION = "portion"
}

export enum Language {
    HEBREW = "hebrew",
    ENGLISH = "english"
}

export interface User {
  user_id: number,
  first_name: string;
  last_name: string;
  identity_number: number;
  email: string;
  gender?: Gender;
  birth_date?: Date | string; //TODO: check typeof Date in birthdate
  height?: number;
  weight?: number;
  diabetes_type?: DiabetesTypes;
  hmo?: string;
  balance_min?: number;
  balance_max?: number;
  carbs_unit?: CarbsUnit;
  protein_calc?: number | boolean; //TODO: check tiny Int: is boolean or number?
  profile_image?: string,
  language?: Language,
  carbs_goal: number
}
