# Borif Gido — Personal Portfolio Website

<p align="center">
  <strong>Software Engineering Student | Aspiring Full-Stack Developer | Cybersecurity Enthusiast | AI Engineer</strong>
</p>

<p align="center">
  A modern, responsive personal portfolio showcasing my skills, projects, education, and journey in software engineering.
</p>

<p align="center">
  <a href="https://hacki-302.github.io/BorifPortfolio/">🌐 Live Website</a> •
  <a href="https://github.com/Hacki-302/BorifPortfolio">📂 GitHub Repository</a> •
  <a href="mailto:borifhacki302@gmail.com">✉️ Contact Me</a>
</p>

---

## 📌 About the Project

Welcome to my personal portfolio website!

I am **Borif Gido**, a third-year Software Engineering student at **Bule Hora University, Ethiopia**, passionate about building useful software solutions and exploring modern technologies.

This website serves as my professional digital identity, presenting my background, technical skills, academic journey, projects, and contact information in one place.

The portfolio is designed to provide visitors, recruiters, developers, and potential collaborators with an overview of my abilities and development journey.

## 🌐 Live Preview

**Visit my portfolio:**

[https://hacki-302.github.io/BorifPortfolio/](https://hacki-302.github.io/BorifPortfolio/)

## ✨ Features

- **Modern Design:** Professional and visually appealing user interface.
- **Responsive Layout:** Adapted for desktop, tablet, and mobile devices.
- **Home Page:** Introduction, professional headline, and navigation.
- **About Me:** Personal background, interests, and career goals.
- **Education:** Academic background and educational information.
- **Technical Skills:** Programming languages, frameworks, tools, and technologies.
- **Projects Showcase:** Selected software development projects with relevant links.
- **Resume:** View and download my professional CV.
- **Contact Form:** Visitors can send messages through an integrated backend email service.
- **Social Media Links:** Quick access to my professional and developer profiles.
- **Multi-page Navigation:** Separate pages for organized content.

## 🛠️ Technologies Used

### Frontend

| Technology | Purpose |
|---|---|
| HTML5 | Website structure and content |
| CSS3 | Styling, layout, and responsive design |
| JavaScript | Client-side interactivity and form handling |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | Backend API and HTTP request handling |
| CORS | Cross-origin request configuration |
| dotenv | Environment variable management |
| express-rate-limit | API request rate limiting |
| Brevo API | Transactional email delivery |

### Development Tools & Deployment

| Tool / Platform | Purpose |
|---|---|
| Visual Studio Code | Code editor |
| Git | Version control |
| GitHub | Source code hosting |
| GitHub Pages | Frontend hosting |
| Render | Backend hosting |

## 📂 Project Structure

```text
BorifPortfolio/
│
├── index.html
├── about.html
├── education.html
├── skills.html
├── projects.html
├── contact.html
├── resume.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── assets/
│   ├── images/
│   │   └── profile.jpg
│   ├── logo.png
│   └── borif-gido-cv.pdf
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

*Note: The structure above describes the main project organization. Keep the filenames consistent with the actual files in your repository.*

## 🚀 Getting Started

Follow these instructions to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Hacki-302/BorifPortfolio.git
```

### 2. Navigate to the Project

```bash
cd BorifPortfolio
```

### 3. Run the Frontend

You can open `index.html` directly in your browser or use the Live Server extension in Visual Studio Code.

For example, with Live Server:

1. Open the project in VS Code.
2. Install the Live Server extension if necessary.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

### 4. Run the Backend Locally

Open a terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `backend` directory and configure the required variables:

```env
PORT=5000
BREVO_API_KEY=your_brevo_api_key
SENDER_EMAIL=your_verified_sender_email
RECEIVER_EMAIL=your_receiver_email
FRONTEND_URL=http://127.0.0.1:5500
```

**Important:** Replace the example email addresses with your verified sender and receiving email addresses. Never publish your real API key.

Start the development server:

```bash
npm run dev
```

The backend should be available at:

```text
http://localhost:5000
```

The exact local frontend origin in `FRONTEND_URL` must match the origin used by your local development server.

## 📧 Contact Form Architecture

The contact form uses a separate backend API to process visitor messages and deliver them through the Brevo transactional email service.

### How It Works

1. A visitor opens the Contact page.
2. The visitor enters their name, email, subject, and message.
3. JavaScript validates and submits the form data.
4. The Express backend receives the request.
5. The backend validates the submitted information.
6. The Brevo API processes the email request.
7. The message is delivered to the configured receiving email address.

### Production Services

| Component | Deployment |
|---|---|
| Frontend | GitHub Pages |
| Backend API | Render |
| Email Service | Brevo |

**Backend health endpoint:**

[https://borif-portfolio.onrender.com/](https://borif-portfolio.onrender.com/)

**Contact API endpoint:**

```text
https://borif-portfolio.onrender.com/api/contact
```

The backend uses environment variables to protect sensitive configuration. API keys and email credentials must never be committed to GitHub.

## 🚀 Deployment

### Frontend — GitHub Pages

The frontend is deployed using GitHub Pages.

1. Push your website source code to the `main` branch.
2. Open your GitHub repository.
3. Navigate to **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save the configuration.

Live website:

[https://hacki-302.github.io/BorifPortfolio/](https://hacki-302.github.io/BorifPortfolio/)

### Backend — Render

The Express backend is hosted on Render.

1. Connect the GitHub repository to Render.
2. Configure the backend service using the `backend` directory as its root directory.
3. Configure the build and start commands according to `backend/package.json`.
4. Add the required environment variables in Render.
5. Deploy the service.

Backend URL:

[https://borif-portfolio.onrender.com/](https://borif-portfolio.onrender.com/)

*Note: Render's free service may sleep after inactivity, which can cause a delay on the first request.*

## 🔒 Security Considerations

Security is an important part of this project.

- API keys are stored in environment variables.
- `.env` files are excluded through `.gitignore`.
- Backend requests are restricted through CORS configuration.
- Contact form input is validated on the backend.
- API rate limiting helps reduce excessive requests.
- Sensitive information is not included in public source code.

Never commit your real Brevo API key, passwords, or other private credentials.

## 👨‍💻 About Me

**Borif Gido**

Third-Year Software Engineering Student  
Bule Hora University, Ethiopia

I am interested in:

- Frontend Development
- Backend Development
- Full-Stack Software Engineering
- Database Management
- Cybersecurity
- Artificial Intelligence
- Video Editing and Creative Technology

My goal is to continuously improve my technical skills, build practical software projects, and develop solutions that make a positive impact.

## 🔗 Connect With Me

| Platform | Link |
|---|---|
| GitHub | [github.com/Hacki-302](https://github.com/Hacki-302) |
| LinkedIn | [Borif Gido](https://www.linkedin.com/in/borif-gido-856a70389/) |
| Telegram | [@MaadiiB9](https://t.me/MaadiiB9) |
| Email | [borifhacki302@gmail.com](mailto:borifhacki302@gmail.com) |
| Portfolio | [Visit Website](https://hacki-302.github.io/BorifPortfolio/) |

## 🎯 Future Improvements

Some improvements I may introduce as the project evolves:

- Advanced SEO optimization.
- Website analytics and visitor statistics.
- Additional project demonstrations.
- Improved accessibility.
- Further performance optimization.
- Enhanced security and backend monitoring.

## 📄 License

This project is a personal portfolio created by **Borif Gido**.

Unless otherwise specified, the content, personal branding, and original assets are intended for personal use. Please contact me before reusing my personal content, branding, or assets.

---

<p align="center">
  <strong>Built with passion, creativity, and a commitment to continuous learning.</strong>
</p>

<p align="center">
  © 2026 Borif Gido. All Rights Reserved.
</p>