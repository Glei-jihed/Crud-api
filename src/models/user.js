const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




const userSchema = new mongoose.Schema({  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    validate(v){
        if(!validator.isEmail(v)){
            throw new Error('le mail est  pas valide !!')

        }
    }
},
password:{
    type:String,
    required:true,
    trim:true,
    validate(v){
        if(!validator.isLength(v,{min:1,max:12}))throw new Error('votre mot de passe est pas valide !!')
    }


},
authTokens:  [{
    authToken:{
        type:String,
        required:true
    }
}]

});
//verification de user:
userSchema.methods.generateAuthTokenAndSaveUser = async function(){
    const authToken = jwt.sign({_id: this._id.toString() },'foo');
    this.authTokens.push({ authToken });
    await this.save();
    return authToken;

}
// function de verification de mot de passe 
userSchema.statics.findUser = async (email,password) => {
    const user = await User.findOne({ email });
    if(!user){
        throw new Error(' connection impossible : email ou password est invalide !!!');
    } 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid)throw new Error('connection impossible : email ou password est invalide !!!');
    return user;
}

//hashage de modp
userSchema.pre('save',async function () {
    if(this.isModified('password')) this.password = await bcrypt.hash(this.password, 8);
    
});

const User = mongoose.model('User',userSchema);



module.exports = User;