import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    question: "What are your general OPD timings?",
    answer: "Our general OPD timings are from 8:00 AM to 8:00 PM, Monday through Saturday. Emergency services are fully operational 24/7, every day of the year."
  },
  {
    question: "How do I book an appointment with a specialist?",
    answer: "Booking is easy! You can book an appointment directly through our website by clicking 'Book Appointment', chatting with our Sparsh AI Assistant, or by calling our 24/7 helpdesk."
  },
  {
    question: "Do you accept health insurance and cashless claims?",
    answer: "Yes, we are empaneled with all major health insurance providers, government schemes, and TPA networks to offer seamless cashless hospitalization. Please contact our billing desk for a complete list."
  },
  {
    question: "Is emergency and trauma care available 24/7?",
    answer: "Absolutely. Our state-of-the-art Emergency and Trauma care center is fully operational 24 hours a day, 365 days a year, backed by advanced life support and expert intensivists."
  },
  {
    question: "Do you offer video or tele-consultation services?",
    answer: "Yes, we understand the need for remote care. We offer secure video consultations with our top specialists for patients who prefer to consult from the comfort of their home."
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-white-lux faq-section">
      <div className="container-fluid max-w-4xl">
        <div className="text-center mb-12">
          <span className="sub-title-lux">GOT QUESTIONS?</span>
          <h2 className="section-title-lux">Frequently Asked <span className="text-glow">Questions</span></h2>
          <p className="text-muted">Everything you need to know about our hospital, services, and billing.</p>
        </div>

        <div className="faq-container animate-fade-in-up">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item glass ${openIndex === index ? 'active' : ''}`}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleFAQ(index)}
              >
                <h3>{faq.question}</h3>
                <span className="faq-icon-wrap">
                  {openIndex === index ? (
                    <ChevronUp size={20} className="faq-icon text-primary" />
                  ) : (
                    <ChevronDown size={20} className="faq-icon text-muted" />
                  )}
                </span>
              </button>
              
              <div 
                className="faq-answer-wrapper" 
                style={{ 
                  maxHeight: openIndex === index ? '200px' : '0px',
                  opacity: openIndex === index ? 1 : 0
                }}
              >
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
