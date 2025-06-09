// src/pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero">
        <h1>Empower Your Financial Freedom</h1>
        <p>
          Join our vibrant community and unlock the power of earning from anywhere, anytime!  
          We're dedicated to helping you achieve financial independence through diverse and rewarding opportunities.
        </p>
        <Link to="/register" className="btn-primary">Join Our Community Today!</Link>
      </section>

      {/* Why Section */}
      <section className="why">
        <h2>Be Part of Something Bigger</h2>
        <p>
          Our community thrives on the contributions of individuals like you. With state-of-the-art technology  
          and high safety standards, we guarantee a stable and secure platform for you to work and earn.
        </p>
      </section>

      {/* Opportunities Section */}
      <section className="opportunities">
        <h2>Variety of Opportunities</h2>
        <p>Explore our wide range of remote jobs, including:</p>
        <ul>
          <li>Data Entry Clerk</li>
          <li>Virtual Assistant</li>
          <li>Online Tutoring</li>
          <li>Freelance Writing</li>
          <li>Transcription Services</li>
          <li>Customer Service Representative</li>
          <li>Social Media Management</li>
          <li>Online Survey Taker</li>
          <li>Website Testing</li>
          <li>Virtual Bookkeeping</li>
          <li>Online Language Translation</li>
          <li>Graphic Design</li>
          <li>Digital Marketing</li>
          <li>Online Content Moderation</li>
          <li>Typing/Word Processing</li>
          <li>Virtual Event Planning</li>
          <li>Online Research Assistant</li>
          <li>E-commerce Selling</li>
          <li>Web Development</li>
          <li>Online Test Scoring</li>
          <li>…and more!</li>
        </ul>
      </section>

      {/* Flexibility Section */}
      <section className="flexibility">
        <h2>Work on Your Terms</h2>
        <p>
          Enjoy the flexibility to work from anywhere, at any time. Our platform is designed  
          to provide you with a seamless experience, ensuring high availability and performance.
        </p>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Stay Ahead with Our Platform Features</h2>
        <ul>
          <li>Push notifications for new job opportunities</li>
          <li>Track your account balance and earnings</li>
          <li>Work offline and submit jobs when you're online</li>
          <li>Secure environment for your data</li>
        </ul>
      </section>

      {/* Payments & Support Section */}
      <section className="payments-support">
        <div className="box">
          <h3>Regular Payments</h3>
          <p>Get paid regularly and securely via Crypto. You decide when you get paid!</p>
        </div>
        <div className="box">
          <h3>Find Your Perfect Job</h3>
          <p>
            Access a wide range of tasks that fit your schedule and skills,  
            whether you're on-the-go or working from home.
          </p>
        </div>
        <div className="box">
          <h3>Support</h3>
          <p>Our helpdesk is here to assist you with any questions or concerns.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="call-to-action">
        <h2>Join our community today and start earning money on your terms!</h2>
        <Link to="/register" className="btn-secondary">Sign Up Now</Link>
      </section>

    </main>
  );
}
