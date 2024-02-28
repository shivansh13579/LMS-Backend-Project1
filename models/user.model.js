import { Schema,model } from "mongoose";

const userSchema = new Schema({
       fullName: {
        type: 'String',
        required: [true,'Name is required'],
        minLength: [5, 'Name must be at least 5 character'],
        maxLength: [50, 'Name should be less than 50 characters'],
        lowercase: true,
        trim: true
       },
       email: {
        type: 'String',
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true
       },

       password: {
        type: 'String',
        required: [true, 'Password is required'],
        minLength: [8,'Password must be at least 8 characters'],
        select: false
       },

       avatar: {
          public_id: {
            type: 'String'
          },
          secure_url: {
            type: 'String'
          }
       },
       role: {
        type: 'String',
        enum: ['USER','ADMIN'],
        default: 'USER'
       },

       forgotPasswordToken: String,
       forgotPasswordExpiry: Date
},{
    timestamps: true
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    return next();
  }
  this.password =await bcrypt.hash(this.password,10);
})
const User = model('User',userSchema);

export default User;