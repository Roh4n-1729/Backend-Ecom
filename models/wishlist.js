//order model refer to wishlist.
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  product:{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  } ,
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
