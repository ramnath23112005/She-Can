const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const { recordToExcel } = require('../utils/excelRecorder');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post(
  '/contact',
  [
    body('fullName').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { fullName, email, phone, message } = req.body;

      const contact = new Contact({ fullName, email, phone, message });
      await contact.save();

      await recordToExcel({ fullName, email, phone, message });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Volunteer Contact from ${fullName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      res.status(201).json({ message: 'Thank you! We will get back to you soon.' });
    } catch (error) {
      console.error('Error saving contact:', error);
      res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
  }
);

router.get('/submissions', async (req, res) => {
  try {
    const submissions = await Contact.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

module.exports = router;
