
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(express.json({ limit: "10kb" }));

// Allowed frontend origins
const allowedOrigins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:5501",
    "http://127.0.0.1:5501",
    "https://hacki-302.github.io",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    }
}));

// Limit contact form submissions
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many messages. Please try again later."
    }
});

// Basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Escape HTML before inserting user content
function escapeHTML(value) {
    return value.replace(/[&<>"']/g, (char) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[char];
    });
}

// API home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Borif Gido Portfolio API is running."
    });
});

// Contact form endpoint
app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
        const { name, email, subject, message } = req.body || {};

        // Validate required fields
        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof subject !== "string" ||
            typeof message !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields."
            });
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim();
        const cleanSubject = subject.trim();
        const cleanMessage = message.trim();

        if (
            !cleanName ||
            !cleanEmail ||
            !cleanSubject ||
            !cleanMessage
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        if (
            cleanName.length > 100 ||
            cleanEmail.length > 254 ||
            cleanSubject.length > 150 ||
            cleanMessage.length > 5000
        ) {
            return res.status(400).json({
                success: false,
                message: "One or more fields are too long."
            });
        }

        // Check Brevo configuration
        const apiKey = process.env.BREVO_API_KEY;
        const senderEmail = process.env.SENDER_EMAIL;
        const receiverEmail = process.env.RECEIVER_EMAIL;

        if (!apiKey || !senderEmail || !receiverEmail) {
            console.error("Brevo environment variables are missing.");

            return res.status(500).json({
                success: false,
                message: "Email service is not configured."
            });
        }

        const safeName = escapeHTML(cleanName);
        const safeEmail = escapeHTML(cleanEmail);
        const safeSubject = escapeHTML(cleanSubject);
        const safeMessage = escapeHTML(cleanMessage).replace(/\n/g, "<br>");

        const emailData = {
            sender: {
                name: "Borif Gido Portfolio",
                email: senderEmail
            },
            to: [
                {
                    email: receiverEmail,
                    name: "Borif Gido"
                }
            ],
            replyTo: {
                email: cleanEmail,
                name: cleanName
            },
            subject: `Portfolio Contact: ${cleanSubject}`,
            textContent:
                `New message from your portfolio\n\n` +
                `Name: ${cleanName}\n` +
                `Email: ${cleanEmail}\n` +
                `Subject: ${cleanSubject}\n\n` +
                `Message:\n${cleanMessage}`,
            htmlContent: `
                <h2>New Portfolio Contact Message</h2>
                <p><strong>Name:</strong> ${safeName}</p>
                <p><strong>Email:</strong> ${safeEmail}</p>
                <p><strong>Subject:</strong> ${safeSubject}</p>
                <hr>
                <h3>Message</h3>
                <p>${safeMessage}</p>
            `
        };

        // Send email using Brevo HTTPS API
        const brevoResponse = await fetch(
            "https://api.brevo.com/v3/smtp/email",
            {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "api-key": apiKey,
                    "content-type": "application/json"
                },
                body: JSON.stringify(emailData),
                signal: AbortSignal.timeout(20000)
            }
        );

        const responseData = await brevoResponse.json();

        if (!brevoResponse.ok) {
            console.error(
                "Brevo API error:",
                brevoResponse.status,
                responseData
            );

            return res.status(502).json({
                success: false,
                message: "Unable to send your message right now. Please try again."
            });
        }

        console.log("Contact email accepted by Brevo.");

        return res.status(200).json({
            success: true,
            message: "Your message has been sent successfully!"
        });

    } catch (error) {
        console.error("Contact form error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found."
    });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Borif Portfolio API running on port ${PORT}`);
});
