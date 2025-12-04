import { useState } from 'react';

interface PolicyItem {
  id: number;
  section: string;
  content: string;
}

const policy_data: PolicyItem[] = [
  {
    id: 1,
    section: "Introduction",
    content:
      "Welcome to CP Nails Manager (the 'App'). This Privacy Policy explains how CP Nails LLC ('we', 'us', or 'our') collects, uses, discloses, and safeguards your information when you use our mobile application. We are committed to protecting your privacy and ensuring the security of your personal data. By using the App, you agree to the terms of this Privacy Policy.",
  },
  {
    id: 2,
    section: "Information We Collect",
    content:
      "We collect information to provide and improve our services. This includes: Personal Information (e.g., name, email, phone number, salon address provided during registration); Usage Data (e.g., appointment scheduling, customer logs, service preferences); Device Information (e.g., IP address, device ID, operating system); and Financial Data (e.g., payment details processed via third-party gateways like Stripe, which we do not store directly). We only collect what is necessary for app functionality.",
  },
  {
    id: 3,
    section: "How We Use Your Information",
    content:
      "Your information is used to: Manage salon operations (e.g., booking appointments, tracking inventory); Personalize your experience (e.g., recommending services based on past bookings); Communicate with you (e.g., reminders, updates); Analyze usage to improve the App; and Comply with legal obligations. We do not use your data for marketing without consent.",
  },
  {
    id: 4,
    section: "Sharing Your Information",
    content:
      "We do not sell your personal information. We may share it with: Service providers (e.g., cloud hosting like AWS, payment processors); Legal authorities if required by law; or Business partners (e.g., integrated booking systems) under strict confidentiality agreements. All sharing is limited to what is necessary and compliant with applicable laws.",
  },
  {
    id: 5,
    section: "Data Security",
    content:
      "We implement reasonable security measures, including encryption (e.g., HTTPS, data at rest encryption), access controls, and regular audits to protect your information from unauthorized access, alteration, or destruction. However, no system is completely secure, and we cannot guarantee absolute security.",
  },
  {
    id: 6,
    section: "Your Rights and Choices",
    content:
      "You have rights regarding your data, including: Access, correction, or deletion of your information; Opting out of communications; and Withdrawing consent. To exercise these, contact us via the App's support feature or email. Depending on your location (e.g., GDPR for EU users, CCPA for California residents), additional rights may apply.",
  },
  {
    id: 7,
    section: "Children's Privacy",
    content:
      "The App is not intended for children under 13 (or 16 in some jurisdictions). We do not knowingly collect data from children. If we discover such data, we will delete it promptly. Parents or guardians should contact us if they believe their child has provided information.",
  },
  {
    id: 8,
    section: "Third-Party Links and Services",
    content:
      "The App may contain links to third-party sites (e.g., payment gateways, mapping services). We are not responsible for their privacy practices. Review their policies before providing information.",
  },
  {
    id: 9,
    section: "Changes to This Privacy Policy",
    content:
      "We may update this Policy periodically. Changes will be posted in the App with the updated 'Last Revised' date. Continued use after changes constitutes acceptance. For material changes, we will notify you via email or in-app notification.",
  },
  {
    id: 10,
    section: "Contact Us",
    content:
      "If you have questions about this Privacy Policy, please contact us at: CP Nails LLC, [Your Salon Address], [Email: support@cpnails.com], [Phone: (123) 456-7890]. Last Revised: December 5, 2025.",
  },
];

export default function PolicyArea() {
  const [activeId, setActiveId] = useState<number | null>(null); // Start with none open for policy

  const toggleSection = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="wionabout-section1 wiondefault-bg">
      <div className="container">
        <div className="wionsection-title center max-width-1080">
          <div className="wionsub-title aos-init" data-aos-delay="400" data-aos="fade-up">
            <p>Privacy Policy</p>
          </div>
          <h1 className="aos-init" data-aos-delay="500" data-aos="fade-up">CP Nails Spa</h1>
        </div>
        <div className="wionfaq-wrap1 aos-init" data-aos-delay="700" data-aos="fade-up">
          {policy_data.map((policy) => {
            const isOpen = activeId === policy.id;
            return (
              <div
                key={policy.id}
                className={`wionfaq-item ${isOpen ? "open" : ""}`}
              >
                <div
                  className="wionfaq-header"
                  onClick={() => toggleSection(policy.id)}
                >
                  <h3>{policy.id < 10 ? '0' : ''}{policy.id}. {policy.section}</h3>
                  <div className="wionactive-icon">
                    <img 
                      className="mynusicon" 
                      src="/assets/images/svg/plas.svg" 
                      alt="" 
                      style={{
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease-in-out',
                      }}
                    />
                  </div>
                </div>

                <div
                  className="wionfaq-body"
                  style={{
                    maxHeight: isOpen ? '500px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease-in-out, padding 0.3s ease-in-out',
                    padding: isOpen ? '1rem 0' : '0',
                  }}
                >
                  <p>{policy.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}