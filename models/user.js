const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

// Define Model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  name: String,
  address: String,
  city: String,
  state: String,
  country: String,
  phone: String,
});

// On save hook, encrypt password

// userSchema.pre('save', function(next) {
//     const user = this;

//     bcrypt.genSalt(10 , function(err , salt) {
//         if (err) {return next(err);}
//         //hash (encrypt) our password using the salt
//         bcrypt.hash(user.password , salt , null , function(err , hash) {
//             if (err) {return next(err);}

//             //overwrite plain text password with encrupted password
//             user.password = hash;
//             next();
//         });
//     });
// });

userSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

//Create the model class
const model = mongoose.model("user", userSchema);

// export the model
module.exports = model;
