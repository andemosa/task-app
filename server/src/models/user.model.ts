import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  _doc: Omit<this, "_doc">;
}

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "http://res.cloudinary.com/dantown-test-fe/image/upload/v1709861900/to-do/co0t1fwirekhnqr5akzg.webp",
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);

  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;

  return next();
});

schema.method(
  "comparePassword",
  async function comparePassword(candidatePassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (e) {
      return false;
    }
  }
);

// 3. Create a Model.
const User = model<IUser, UserModel>("User", schema);

export { User, IUser };
