import { Schema, model, models } from "mongoose"; //will helpus to interact with mongodb database

//models provide by mongooose library registers all model

//creating modal named user
const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists!'],
      required: [true, 'Email is required!'],

    },
    username: {
      type: String,            
      match: [
        /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
      required: [true, 'Email is required!'],
    }, 
    image: {
      type: String
    }

  }
);

//in nextjs, if model name user exist then it assign to user variable, if not create new modal, this is imp to resuing the existing modal and prevent redefining the modal
const User = models.User || model("User" , UserSchema);
export default User;
