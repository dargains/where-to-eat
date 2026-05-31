import mongoose, { Schema, Document } from "mongoose";

export interface LunchPlace extends Document {
  name: string;
  address: string;
  price: 1 | 2 | 3;
  distance: number;
  createdAt: Date;
}

const lunchPlaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
    },
    distance: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const LunchPlaceModel =
  mongoose.models.LunchPlace ||
  mongoose.model<LunchPlace>("LunchPlace", lunchPlaceSchema);
