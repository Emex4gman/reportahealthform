const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const facilitySchema = new Schema({
  reg_fac_name: {
    type: String,
    required: true
  },
  fac_type: {
    type: String,
    required: true
  },
  sig_unique_id: {
    type: String,
    required: true
  },
  street_name: {
    type: String,
    required: true
  },
  phone_number: {
    type: Number,
    required: true
  },
  operational_hours: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  lganame: {
    type: String,
    required: true
  },
  statename: {
    type: String,
    required: true
  },
  ownership: {
    type: String,
    required: true
  },
  facility_level: {
    type: String,
    required: true
  },
  services: {
    type: Array,
    required: true
  },
  cacImage: {
    type: Array,
    required: true
  },
  average_rating: {
    type: String,
    default: null
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }


}, {
  timestamps: true,
})

module.exports = mongoose.model('Facility', facilitySchema)