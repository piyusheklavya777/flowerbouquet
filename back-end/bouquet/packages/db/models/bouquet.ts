/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';

interface BouquetAttributes {
  name: string;
  discount: number;
  isActive: boolean;
  creatorId: string;
  creatorName: string;
  description: string;
  flowers: {
    flowerId: string;
    quantity: number;
  }[];
}

interface BouquetDoc extends mongoose.Document {
  name: string;
  discount: number;
  isActive: boolean;
  creatorId: string;
  description: string;
  flowers: {
    flowerId: string;
    quantity: number;
  }[];
}

interface BouquetModel extends mongoose.Model<BouquetDoc> {
  build(attrs: BouquetAttributes): BouquetDoc;
}

const bouquetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    creatorId: {
      type: String,
      required: true,
    },
    creatorName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    flowers: [
      {
        flowerId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
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

bouquetSchema.set('versionKey', 'version');

bouquetSchema.statics.build = (attrs: BouquetAttributes) => new Bouquet(attrs);

const Bouquet = mongoose.model<BouquetDoc, BouquetModel>('Bouquet', bouquetSchema);

export { Bouquet };
