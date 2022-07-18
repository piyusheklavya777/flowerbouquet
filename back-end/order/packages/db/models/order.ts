/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';
import { OrderStatus } from '../../../common';

interface OrderAttributes {
  isActive: boolean;
  customerId: string;
  status: string;
  price: number;
  customerName: string;
  bouquets: {
    bouquetId: string;
    discount: number;
    name: string;
    flowers: {
      flowerId: string;
      name: string;
      price: number;
      quantity: number;
    }[];
  }[];
}

interface OrderDoc extends mongoose.Document {
  isActive: boolean;
  customerId: string;
  customerName: string;
  status: string;
  price: number;
  bouquets: {
    bouquetId: string;
    discount: number;
    name: string;
    flowers: {
      flowerId: string;
      name: string;
      price: number;
      quantity: number;
    }[];
  }[];
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttributes): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: OrderStatus,
      default: OrderStatus.CREATED,
    },
    bouquets: [
      {
        name: {
          type: String,
          required: true,
        },
        discount: {
          type: Number,
          default: 0,
        },
        bouquetId: {
          type: String,
          required: true,
        },
        flowers: [
          {
            flowerId: {
              type: String,
              required: true,
            },
            name: {
              type: String,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
          },
        ],
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

orderSchema.set('versionKey', 'version');

orderSchema.statics.build = (attrs: OrderAttributes) => new Order(attrs);

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
