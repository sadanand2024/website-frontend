"use client";
import { useState } from "react";

const PlaxAccordion = ({ dark }) => {
  const accordionData = [
    {
      id: 1,
      title: "How do I get in touch with Tara?",
      desc: "Easy! You can reach us via phone, email,or chat. Just head to our Contact page, and pick the way that’s most convenient for you.",
    },
    {
      id: 2,
      title: "Can I get a free consultation?",
      desc: "Absolutely! We offer a free initial consultation to understand your needs and discuss how we can help. Just drop us a message to set it up.",
    },
    {
      id: 3,
      title: " How can Tara make my life easier?",
      desc: "From tax filings to payroll, we turn complex tasks into smooth, worry-free services so you can focus on what matters.",
    },
    {
      id: 4,
      title: "Does this really work for beginners?",
      desc: "100%! Tara is built to support everyone, especially if you're new to finance and need guidance minus the technical lingo.",
    },
  ];
  const [active, setActive] = useState(0);
  return (
    <div className={`mil-accordion`}>
      {accordionData.map((item) => (
        <div
          className={`mil-accordion-group mil-up ${
            active == item.id ? " mil-active" : ""
          }`}
          key={item.id}
        >
          <div
            className={`mil-accordion-menu `}
            onClick={() => setActive(active == item.id ? null : item.id)}
          >
            <h5 className={dark ? "mil-light" : ""}>{item.title}</h5>
            <div className="mil-accordion-icon">
              <i className="fas fa-chevron-up" />
            </div>
          </div>
          <div className="mil-accordion-content">
            <p
              className="mil-text-m mil-soft"
              dangerouslySetInnerHTML={{ __html: item.desc }}
            ></p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PlaxAccordion;
