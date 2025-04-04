import express from "express";
import { catchAsync } from "../middlewares/catchAsync";
import { fetchIngredient } from "../domains/kitchen/actions/fetchIngredients";

const router = express.Router();

router.get(
  "/order-safe",
  catchAsync(async (req, res) => {
    const ingredient = await fetchIngredient("Secret Spice");
    res.send(`Here is your dish with ${ingredient}!`);
  })
);

export default router;
