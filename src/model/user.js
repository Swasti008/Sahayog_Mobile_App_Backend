import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  belongsToOrganization: { type: Boolean, required: true },
  organizationSector: { type: String, required: function () { return this.belongsToOrganization; } },
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
