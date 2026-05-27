const express = require('express');
const { body, validationResult } = require('express-validator');
const Newsletter = require('../models/Newsletter');
const nodemailer = require('nodemailer');
const { recordNewsletterToExcel } = require('../utils/excelRecorder');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post(
  '/newsletter',
  [
    body('email').isEmail().withMessage('Invalid email address'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email } = req.body;

      const subscription = new Newsletter({ email });
      await subscription.save();

      recordNewsletterToExcel({ email }).catch(() => {});
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to She Can Foundation Newsletter!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #8B5CF6;">Welcome to She Can Foundation! ✦</h2>
            <p>Thank you for subscribing to our newsletter.</p>
            <p>You'll now receive updates on our programs, initiatives, and ways to get involved.</p>
            <hr style="border: 1px solid #f0f0f0;" />
            <p style="color: #666; font-size: 0.85rem;">If you didn't subscribe, you can ignore this email.</p>
          </div>
        `,
      }).catch(() => {});
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Newsletter Subscription',
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subscribed At:</strong> ${new Date().toLocaleString()}</p>
        `,
      }).catch(() => {});

      res.status(201).json({ message: 'Subscribed successfully!' });
    } catch (error) {
      console.error('Error saving subscription:', error);
      res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
  }
);

module.exports = router;
