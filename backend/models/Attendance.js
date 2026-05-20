const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    totalClasses: {
      type: Number,
      required: true,
      min: 0,
    },
    attendedClasses: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

// Virtual percentage field calculated automatically
attendanceSchema.virtual('percentage').get(function () {
  if (this.totalClasses === 0) return 0;
  return Math.round((this.attendedClasses / this.totalClasses) * 100);
});

attendanceSchema.set('toJSON', { virtuals: true });
attendanceSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
