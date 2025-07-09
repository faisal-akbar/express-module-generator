import { model, Schema } from "mongoose";
import { I__NAME__ } from "./__FILENAME__.interface";

const __FILENAME__Schema = new Schema<I__NAME__>({
  // Define schema fields here
}, {
  timestamps: true,
  versionKey: false
});

export const __FILENAME__Model = model<I__NAME__>("__FILENAME__", __FILENAME__Schema);