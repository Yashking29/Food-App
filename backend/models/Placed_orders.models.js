import mongoose from "mongoose";


const statusEnum = ['Pending', 'Processing', 'Completed'];

const PlacedorderSchema = new mongoose.Schema({
    name: { type: String },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Food_items' },
       
      }
    ],
  status:{type:String,
    enum:statusEnum,
    default:"Pending"

  
  },

 
  createdAt: { type: Date, default: Date.now }
});

const PlacedOrder = mongoose.model('PlacedOrder', PlacedorderSchema);


export {PlacedOrder}