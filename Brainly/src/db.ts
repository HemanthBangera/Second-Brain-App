import mongoose from "mongoose"

mongoose.connect("mongodb+srv://Hemanth:YZGhWSZoUAOJnyev@cluster0.lbhyr.mongodb.net/brainly");

const UserSchema =new mongoose.Schema({
   username: {
    type:String,
    required:true,
    unique:true
},
   password:{
    type:String,
    required:true     
}
})

const TagSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
}
})

const contentTypes = ['youtube','twitter','linkedin','instagram','reddit'];

const ContentSchema =new mongoose.Schema({
    link:{type:String, required:true},
    type: {type: String, enum: contentTypes, required:true},
    title: {type: String, required: true},
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Tag",
        required:true,
    }],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const LinkSchema = new mongoose.Schema({
    hash:{type:String, required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

export const User = mongoose.model("User",UserSchema)
export const Tag = mongoose.model("Tag",TagSchema)
export const Content = mongoose.model("Content",ContentSchema)
export const Link = mongoose.model("Link",LinkSchema)
