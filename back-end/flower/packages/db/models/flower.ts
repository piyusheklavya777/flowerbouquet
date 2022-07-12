/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';

interface FlowerAttributes {
  name: string;
  price: string;
  quantityAvailable: string;
  isActive: boolean;
  vendorId: string;
  description: string;
  creatorName: string;
}

interface FlowerDoc extends mongoose.Document {
  name: string;
  price: string;
  quantityAvailable: string;
  isActive: boolean;
  vendorId: string;
  description: string;
  creatorName: string;
}

interface FlowerModel extends mongoose.Model<FlowerDoc> {
  build(attrs: FlowerAttributes): FlowerDoc;
}

const flowerSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    quantityAvailable: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    vendorId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    creatorName: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_, returnDocument) {
        returnDocument.id = returnDocument._id;
        delete returnDocument._id;
      },
    },
  },
);

flowerSchema.set('versionKey', 'version');

flowerSchema.statics.build = (attrs: FlowerAttributes) => new Flower(attrs);

flowerSchema.virtual('flowerId').get(function () {
  return this._id;
});

const Flower = mongoose.model<FlowerDoc, FlowerModel>('Flower', flowerSchema);

export { Flower };
