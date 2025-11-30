 import  { useState } from 'react'

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faq_data: FaqItem[] = [
  {
    id: 1,
    question: "What services do you offer?",
    answer:
      "We specialize in branding, UI/UX design, web development, and digital strategy. From logo design to full-scale digital experiences, we offer end-to-end creative solutions.",
  },
  {
    id: 2,
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope, but most branding projects take 3–4 weeks, and full website projects take 6–8 weeks. We’ll give you a clear timeline before we start.",
  },
  {
    id: 3,
    question: "What is your pricing structure?",
    answer:
      "We offer flexible pricing based on project needs — from fixed packages for startups to custom quotes for larger engagements. Let’s chat and find the best fit for you.",
  },
  {
    id: 4,
    question: "Can you work with existing brand assets or websites?",
    answer:
      "Absolutely. We can refresh and expand on your current assets or work from the ground up, depending on your needs and goals.",
  },
  {
    id: 5,
    question: "What industries do you work with?",
    answer:
      "We’ve worked with a wide range—from tech and wellness to fashion and finance. Our creative process adapts to any industry with a user-first approach.",
  },
  {
    id: 6,
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes! We offer post-launch support, retainer plans, and optimization services to ensure your brand and site continue to perform and evolve.",
  },
  {
    id: 7,
    question: "What tools or platforms do you use?",
    answer:
      "We use industry-standard tools like Figma, Webflow, Adobe Suite, and Notion. Our development stack is modern, scalable, and tailored to your tech needs.",
  },
  {
    id: 8,
    question: "How involved will I be in the process?",
    answer:
      "Very! We believe in collaboration. You’ll be involved at every major milestone—from discovery and feedback rounds to final approvals.",
  },
  {
    id: 9,
    question: "Do you work with international clients?",
    answer:
      "Yes, we work with clients around the globe. Our fully remote setup makes time zones and borders easy to manage.",
  },
  {
    id: 10,
    question: "How do we get started?",
    answer:
      "Simple! Just fill out our contact form or drop us an email. We’ll schedule a call to learn more about your project and see if we’re a good fit.",
  },
];




export default function FaqArea() {

  const [activeId, setActiveId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };


  return (
    <section className="wionabout-section1 wiondefault-bg">
      <div className="container">
        <div className="wionsection-title center max-width-1080">
          <div className="wionsub-title aos-init" data-aos-delay="400" data-aos="fade-up">
            <p>Clarity Builds Confidence</p>
          </div>
          <h1 className="aos-init" data-aos-delay="500" data-aos="fade-up">Common inquiries</h1>
        </div>
        <div className="wionfaq-wrap1 aos-init" data-aos-delay="700" data-aos="fade-up">

          {faq_data.map((faq) => (
            <div
              key={faq.id}
              className={`wionfaq-item ${activeId === faq.id ? "open" : ""
                }`}
            >
              <div
                className="wionfaq-header"
                onClick={() => toggleFaq(faq.id)}
              >
                <h3>{faq.id < 10 ? '0' : ''}{faq.id}. {faq.question}</h3>
                <div className="wionactive-icon">
                  <img className="mynusicon" src="/assets/images/svg/plas.svg" alt="" />
                </div>
              </div>

              <div
                className="wionfaq-body"
                style={{
                  display: activeId === faq.id ? "block" : "none",
                }}
              >
                <p>{faq.answer}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
