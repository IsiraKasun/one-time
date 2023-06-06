const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    subject: {type: String, trim: true, required: true},
    body: {type: String, trim: true, required: true},
    linkId: {type: String, trim: true, required: true},
    status: {type: String, trim: true, required: true}
  },
  { timestamps: true }
  );

messageSchema.statics.checkLinkExists = async (linkId) => {
  const doc = await mongoose.model('Message').findOne({linkId: linkId}).exec();
  return doc;
};

// userSchema.statics.login = async (email, password) => {
//   const doc = await mongoose.model('User').findOne({email: email, password: password}).exec();

//   return doc;
// }

module.exports = mongoose.model('Message', messageSchema);
