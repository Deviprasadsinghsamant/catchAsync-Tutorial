import { KitchenError } from "../errors/KitchenError";

export const fetchIngredient = async (ingredient: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ingredient === "Secret Spice") {
        reject(
          new KitchenError(
            "Storeroom locked for Secret Spice!",
            403,
            "Try a different ingredient"
          )
        );
      } else {
        resolve(`Fresh ${ingredient}`);
      }
    }, 1500);
  });
};
