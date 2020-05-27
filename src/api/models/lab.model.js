const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LabSchema = new Schema({
  reg_fac_name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,

  },
  fac_type: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  sig_unique_id: {
    type: String,
    required: true
  },
  street_name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone_number: {
    type: Number,
  },
  operational_hours: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
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
    lowercase: true,
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
  daysOfOperations: {
    type: Array,

  },
  specilizations: {
    type: Array,
  },
  fac_email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    trim: true,
    lowercase: true,
  },
  cacImage: {
    type: Array,
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

module.exports = mongoose.model('Lab', LabSchema)