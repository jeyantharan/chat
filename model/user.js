const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  Username: {
    type: String,
 
  },


});

module.exports = mongoose.model("User", UserSchema);
