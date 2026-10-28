import mongoose from 'mongoose'
const farmSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  location: { type: String, trim: true, default: '' },
  areaAcres: { type: Number, min: 0, default: 0 },
  crops: [{ name: { type: String, trim: true }, variety: String, stage: String, healthPercent: { type: Number, min: 0, max: 100 } }]
}, { timestamps: true })
export default mongoose.model('Farm', farmSchema)
