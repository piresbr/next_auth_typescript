//autenticação nativa
import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  image: {
    type: String,
    default:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
  },
  password: { type: String, required: true, minlength: 6 },
  emailVerified: { type: Boolean, default: false },
  role: { type: String, default: "user" },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
