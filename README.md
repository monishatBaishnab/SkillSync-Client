# **SkillSync: A Collaborative Learning Platform**  

## **Project Overview**  
**SkillSync** is a **peer-to-peer skill-sharing platform** that enables users to connect, teach, and learn new skills. The platform allows users to create profiles, list skills they can teach, and schedule sessions for skills they want to learn. With a structured session booking system, availability management, and a review system, SkillSync provides a seamless collaborative learning experience.  

The application includes:  
- **User Authentication:** Secure signup and login with JWT-based authentication.  
- **Skill Management:** Users can add, update, or remove teachable skills.  
- **Session Booking:** Learners can request sessions based on teacher availability.  
- **Availability Scheduling:** Teachers can set available time slots for booking.   
- **Admin Dashboard:** Manage users, monitor skills, and analyze session trends.  

## **Project Description**  
SkillSync is designed to **simplify skill-sharing** through a structured approach. The platform categorizes skills into multiple category, allowing learners to filter and book sessions efficiently. Teachers set their availability, preventing scheduling conflicts.  

Built with **Next.js (Frontend) and Express.js (Backend)**, SkillSync ensures a **responsive and scalable** user experience. PostgreSQL serves as the **relational database**, optimizing skill and session management. The admin dashboard enables **effective monitoring** of platform activities, ensuring a smooth learning ecosystem.  

### **Key Features:**  
✔ **User Authentication:** Secure authentication with role-based access (Learner, Teacher, Admin).  
✔ **Dashboard:** View available teachers, scheduled sessions, and skill categories.  
✔ **Session Booking:** Book sessions within teacher-set availability slots.  
✔ **Skill Management:** Add, edit, or remove teachable skills with categorization.   
✔ **Conflict-Free Scheduling:** Prevent overlapping bookings with real-time availability checks.  
✔ **Admin Panel:** Manage users, track session trends, and oversee skill distribution.  

### **Tech Stack:**  
- **Frontend:** Next.js, TypeScript, TailwindCSS  
- **Backend:** Node.js, Express.js, Prisma ORM  
- **Database:** PostgreSQL  
- **Authentication:** JWT (JSON Web Token)  

## **Setup Instructions**  
1. **Clone the repository:**  
   ```bash
   git clone https://github.com/monishatBaishnab/SkillSync-Client.git
   cd SkillSync
   ```  
2. **Install dependencies:**  
   ```bash
   npm install
   # or
   yarn install
   ```  
3. **Set up environment variables:**  
   Create a `.env` file and add your database credentials:  

4. **Start the development server:**  
   ```bash
   npm run dev
   ```  
