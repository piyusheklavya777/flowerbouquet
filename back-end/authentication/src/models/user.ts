/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';
import Password from '../utilities/password';

interface UserAttributes {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttributes): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  toJSON: {
    transform(_, returnDocument) {
      delete returnDocument.password;

      returnDocument.id = returnDocument._id;
      delete returnDocument._id;

      delete returnDocument.__v;
    },
  },
});
userSchema.statics.build = (attrs: UserAttributes) => new User(attrs);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
