import dotenv from 'dotenv';
import Imap from 'imap';
import { simpleParser } from 'mailparser';
import axios from 'axios';
import fs from 'fs';

// Load environment variables
dotenv.config();

const imap = new Imap({
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
});

const chatId = process.env.TELEGRAM_CHAT_ID;
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const sentEmailsFile = 'sentEmails.json';

// Load previously sent email IDs
function loadSentEmails() {
    try {
        if (fs.existsSync(sentEmailsFile)) {
            return JSON.parse(fs.readFileSync(sentEmailsFile, 'utf8'));
        }
    } catch (error) {
        console.error('Error loading sent emails:', error);
    }
    return [];
}

// Save sent email IDs
function saveSentEmails(sentEmails) {
    try {
        fs.writeFileSync(sentEmailsFile, JSON.stringify(sentEmails, null, 2));
    } catch (error) {
        console.error('Error saving sent emails:', error);
    }
}

// Function to open the INBOX
function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
}

// Function to send email content to Telegram
async function sendToTelegram(email) {
    const { subject, from, date, text, messageId } = email;

    const message = `📧 *New Email Received*  
📅 *Date:* ${new Date(date).toLocaleString()}  
📌 *Subject:* ${subject}  
📝 *Message:*  
${text ? text.substring(0, 4000) : 'No text content'}`;

    try {
        await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown"
        });

        console.log(`✅ Email sent to Telegram: ${subject}`);
        return true;
    } catch (error) {
        console.error('❌ Error sending to Telegram:', error.response?.data || error.message);
        return false;
    }
}

// IMAP event handlers
imap.once('ready', () => {
    openInbox((err, box) => {
        if (err) throw err;

        imap.search(['UNSEEN'], (err, results) => {
            if (err) throw err;
            if (!results || results.length === 0) {
                console.log('No new emails.');
                imap.end();
                return;
            }

            // Load previously sent emails
            let sentEmails = loadSentEmails();

            // Get last 3 emails
            const lastThreeEmails = results.slice(-3);

            const f = imap.fetch(lastThreeEmails, { bodies: '', markSeen: true });

            f.on('message', (msg, seqno) => {
                msg.on('body', (stream, info) => {
                    simpleParser(stream, async (err, parsed) => {
                        if (err) throw err;
                        
                        const emailId = parsed.messageId; // Unique email ID

                        // Check if email was already sent
                        if (sentEmails.includes(emailId)) {
                            console.log(`⚠️ Skipping duplicate email: ${parsed.subject}`);
                            return;
                        }

                        console.log(`Processing Email #${seqno}: ${parsed.subject}`);

                        const sent = await sendToTelegram(parsed);
                        if (sent) {
                            sentEmails.push(emailId);
                            saveSentEmails(sentEmails);
                        }
                    });
                });

                msg.once('end', () => {
                    console.log('Finished processing email.');
                });
            });

            f.once('error', (err) => {
                console.log('Fetch error: ' + err);
            });

            f.once('end', () => {
                console.log('Done fetching last 3 messages!');
                imap.end();
            });
        });
    });
});

imap.once('error', (err) => {
    console.log('Connection error: ' + err);
});

imap.once('end', () => {
    console.log('Connection ended');
});

imap.connect();
