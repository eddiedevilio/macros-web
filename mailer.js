import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors());

// Function to send data to Telegram
async function sendToTelegram(message) {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    try {
        await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown"
        });
        console.log('✅ Message sent to Telegram');
        return true;
    } catch (error) {
        console.error('❌ Error sending to Telegram:', error.response?.data || error.message);
        return false;
    }
}

// Contact Form Submission
app.post('/submit-contact-form', async (req, res) => {
    const { firstName, lastName, email, subject, message } = req.body;

    // Send to Telegram
    const telegramMessage = `📧 *New Contact Form Submission*  
📅 *Date:* ${new Date().toLocaleString()}  
👤 *Name:* ${firstName} ${lastName}  
📧 *Email:* ${email}  
📌 *Subject:* ${subject}  
📝 *Message:*  
${message}`;

    const telegramSent = await sendToTelegram(telegramMessage);

    if (!telegramSent) {
        return res.status(500).send('Error sending form data to Telegram');
    }

    // Optionally, send via email
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
        subject: `New Contact Form Submission - ${subject}`,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong><br>${message}</p>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending contact form email: ' + error.message);
        }
        console.log('Contact form email sent:', info.response);
        res.status(200).send('Contact form data sent to Telegram and email');
    });
});

// Booking Form Submission
app.post('/submit-booking-form', async (req, res) => {
    const { fullName, contactInfo, date, numberOfPassengers, destinationFrom, destinationTo } = req.body;

    // Send to Telegram
    const telegramMessage = `📧 *New Booking Form Submission*  
📅 *Date:* ${new Date().toLocaleString()}  
👤 *Name:* ${fullName}  
📧 *Contact Info:* ${contactInfo}  
📅 *Booking Date:* ${date}  
👥 *Number of Passengers:* ${numberOfPassengers}  
📍 *From:* ${destinationFrom}  
📍 *To:* ${destinationTo}`;

    const telegramSent = await sendToTelegram(telegramMessage);

    if (!telegramSent) {
        return res.status(500).send('Error sending form data to Telegram');
    }

    // Optionally, send via email
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
        subject: 'Booking Inquiry Form Submission',
        text: `Full Name: ${fullName}\nContact Info: ${contactInfo}\nDate: ${date}\nNumber of Passengers: ${numberOfPassengers}\nDestination From: ${destinationFrom}\nDestination To: ${destinationTo}`,
        html: `
            <h2>Booking Inquiry Form Submission</h2>
            <p><strong>Full Name:</strong> ${fullName}</p>
            <p><strong>Contact Info:</strong> ${contactInfo}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Number of Passengers:</strong> ${numberOfPassengers}</p>
            <p><strong>Destination From:</strong> ${destinationFrom}</p>
            <p><strong>Destination To:</strong> ${destinationTo}</p>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending booking form email: ' + error.message);
        }
        console.log('Booking form email sent:', info.response);
        res.status(200).send('Booking form data sent to Telegram and email');
    });
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});