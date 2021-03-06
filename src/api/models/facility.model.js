const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const facilitySchema = new Schema({
  reg_fac_name: {
    type: String,
    required: true,
    trim: true,


  },
  fac_type: {
    type: String,
    required: true,
    trim: true,

  },
  sig_unique_id: {
    type: String,
    required: true
  },
  street_name: {
    type: String,
    required: true,
    trim: true,

  },
  phone_number: {
    type: Number,
  },
  operational_hours: {
    type: String,
    required: true,


  },
  licenseStatus: {
    type: String,
  },
  operationalStatus: {
    type: String,
  },
  registrationStatus: {
    type: String,
  },
  premises: {
    type: String,
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
    required: true,
    trim: true,

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
  facility_website: {
    type: String,
    trim: true

  },
  daysOfOperations: {
    type: Array,
  },
  specilizations: {
    type: Array,
  },
  humanResources: {
    type: Object
  },
  CouncilRegistrationNumber: { type: String },
  fac_email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    trim: true,
    lowercase: true,
  },

  cacImageUrl: {
    type: String,
  },
  profileImageUrl: {
    type: String,
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