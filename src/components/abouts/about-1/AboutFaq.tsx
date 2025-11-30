 import  { useState } from "react";

interface FaqItem {
  title: string;
  year: string;
  description: string;
  image: string;
}

const faqData: FaqItem[] = [
  {
    title: "Awwwards",
    year: "2024",
    description:
      "Recognized for outstanding creativity and usability in our work with Glowiq, a vibrant e-commerce experience for a skincare brand.",
    image: "/assets/images/svg/faq1.svg",
  },
  {
    title: "Best UI Design",
    year: "2023",
    description:
      "Awarded for our intuitive, user-focused interface design for Voltive, a SaaS productivity platform.",
    image: "/assets/images/svg/faq2.svg",
  },
  {
    title: "Best Visual Design",
    year: "2022",
    description:
      "Our bold rebranding of Froqlo, a fashion startup, was honored for exceptional visual storytelling and interactivity.",
    image: "/assets/images/svg/faq3.svg",
  },
  {
    title: "Top Creative Agency",
    year: "2020",
    description:
      "Voted by clients for exceptional service, innovation, and results in branding, design, and development.",
    image: "/assets/images/svg/faq4.svg",
  },
];

export default function AboutFaq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="wionsection-padding bg-heading wiondefault-bg">
      <div className="container">
        <div className="row">
          {/* Left Content */}
          <div className="col-lg-6 d-flex align-items-center">
            <div className="wiondefault-content content2">
              <div
                className="wionsub-title title2 aos-init"
                data-aos-delay="400"
                data-aos="fade-up"
              >
                <p>We're proud to present our awards</p>
              </div>
              <h2
                className="pb-0 aos-init"
                data-aos-delay="500"
                data-aos="fade-up"
              >
                Awards and recognition
              </h2>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="col-lg-6">
            <div className="wionfaq-wrap1">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className={`wionfaq-item item2 ${
                    activeIndex === index ? "open" : ""
                  }`}
                >
                  <div
                    className="wionfaq-header header2"
                    onClick={() => toggleFaq(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <h3>{faq.title}</h3>
                    <h3>{faq.year}</h3>
                  </div>
                  {activeIndex === index && (
                    <div className="wionfaq-body body2">
                      <div className="wionfaq-data">
                        <p>{faq.description}</p>
                        <img src={faq.image} alt={faq.title} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
