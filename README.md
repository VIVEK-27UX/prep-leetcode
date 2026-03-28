# Prep Leetcode 🚀
> **Engineered for Long-term DSA Mastery through Spaced Repetition.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)](https://www.mongodb.com/)
[![AWS](https://img.shields.io/badge/Cloud-AWS-FF9900?logo=amazon-aws)](https://aws.amazon.com/)

---

## 📖 Table of Contents
- [Introduction](#-introduction)
- [The Science: Spaced Repetition](#-the-science-spaced-repetition)
- [System Architecture](#-system-architecture)
- [Core Features](#-core-features)
- [Installation & Setup](#-installation--setup)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Introduction
**Prep Leetcode** is a full-stack productivity engine designed for competitive programmers. While most platforms focus on *quantity*, this tool focuses on *retention*. It eliminates the "Forgetting Curve" by intelligently scheduling problem revisions based on your past performance.

## 🧠 The Science: Spaced Repetition
Human memory decays exponentially unless information is reinforced at specific intervals. Prep Leetcode implements the **Ebbinghaus Forgetting Curve** logic:
- **Phase 1 (Immediate):** 24-hour review.
- **Phase 2 (Short-term):** 7-day review.
- **Phase 3 (Mid-term):** 30-day review.
- **Phase 4 (Long-term):** 180-day review (6 months).

By the 4th phase, the algorithmic pattern is stored in your permanent memory, making you "Interview Ready" at all times.

---

## 🏗️ System Architecture
The platform is built using the **MERN** stack with a focus on scalability:
- **Frontend:** React.js for a responsive, real-time dashboard.
- **Backend:** Node.js/Express.js handling RESTful APIs and scheduling logic.
- **Database:** MongoDB Atlas for persistent storage of user progress and revision metadata.
- **Task Runner:** `node-cron` (Development) / **AWS Lambda** (Production) to trigger daily notification events.

---

## ✨ Core Features
- ✅ **One-Click Logging:** Paste a LeetCode URL, and the engine handles the scheduling.
- ✅ **Dynamic Dashboard:** View "Due Today," "Upcoming," and "Mastered" problem sets.
- ✅ **Smart Intervals:** Level-based logic that resets if a problem is marked as "Forgotten."
- ✅ **Automation:** Integrated reminders (Telegram/Email) to ensure 0% missed sessions.

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account
- Git

### Steps
1. **Clone the Project**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/prep-leetcode.git](https://github.com/YOUR_USERNAME/prep-leetcode.git)
   cd prep-leetcode