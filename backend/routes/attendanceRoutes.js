const express = require('express');
const Attendance = require('../models/Attendance');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/attendance
router.post('/', protect, async (req, res) => {
  try {
    const { subject, totalClasses, attendedClasses } = req.body;

    if (!subject || totalClasses === undefined || attendedClasses === undefined) {
      return res.status(400).json({ message: 'All attendance fields are required' });
    }

    if (Number(attendedClasses) > Number(totalClasses)) {
      return res.status(400).json({ message: 'Attended classes cannot be greater than total classes' });
    }

    const attendance = await Attendance.create({
      user: req.user._id,
      subject,
      totalClasses,
      attendedClasses,
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/attendance
router.get('/', protect, async (req, res) => {
  try {
    const records = await Attendance.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/attendance/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const record = await Attendance.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!record) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
