import {Schema, model, models} from "mongoose";

const PromptSchema = new Schema({
  creator:{
    type: Schema.Types.ObjectId,
    ref:'User',
  },
  prompt:{
    type: String,
    required: [true, 'Prompt is required.'],
  }, 
  tag:{
    type: String,
    required: [true, 'Tag is required.'],
  }
});
//either get prompt that already exist or if doesnot exist create a new model called promt based on promptSchema 
const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;