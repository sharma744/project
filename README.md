# Pet Profile App - Server

A Node.js backend for managing **user and pet profiles**. This server handles user authentication, pet profile management, and image uploads, providing a smooth and secure experience for your pet management app.

---

## Features

- **OTP-Based Email Verification**  
  Ensures users are verified before accessing the app using one-time passwords sent via email.

- **Image Uploads with Multer & Cloudinary**  
  Users can upload profile pictures for themselves and their pets, stored safely in the cloud.

- **Secure Data Management**  
  User and pet data (names, bio, contact, pet breed, age, gender, vaccination status, weight) are stored securely in MongoDB.

- **JWT Authentication** *(optional)*  
  For secure session management and protecting routes after OTP verification.

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (via Mongoose)  
- **Email Verification:** Nodemailer (Gmail / Ethereal)  
- **File Uploads:** Multer  
- **Cloud Storage:** Cloudinary

---

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/pet-profile-app-server.git

