"use client";
import { useState, useEffect } from "react";
import Banner from "@/components/Banner";
import { CallToAction2 } from "@/components/CallToAction";
import PlaxAccordion from "@/components/PlaxAccordion";
import Testimonials1 from "@/components/Testimonials";
import PlaxLayout from "@/layouts/PlaxLayout";
import Link from "next/link";

const page = () => {
  const [showAllBusiness, setShowAllBusiness] = useState(false);
  const [showAllIndividual, setShowAllIndividual] = useState(false);
  let services = [
    {
      individuals: [
        {
          title: "Private Limited Company – Big Growth, Small Risks",
          description:
            "A great choice for growing your brand with built-in shareholder protection",
          icon: "img/home-1/icons/3.svg",
        },
        {
          title: "One Person Company (OPC) – All You, All Legal",
          description:
            "Run your business solo but with the perks of a company setup",
          icon: "img/home-1/icons/3.svg",
        },
        {
          title:
            "Limited Liability Partnership (LLP) – Shared Ideas, Limited Liability",
          description:
            "Partner up while keeping your assets safe. Best of both worlds!",
          icon: "img/home-1/icons/3.svg",
        },
        {
          title: "Partnership Firm – Stronger Together",
          description:
            "Join forces and share the rewards—classic partnership with shared ownership.",
          icon: "img/home-1/icons/3.svg",
        },
        {
          title: "Sole Proprietorship – Business, Uncomplicated",
          description:
            "Perfect for one-person ventures. You’re the boss, and it’s all yours.",
          icon: "img/home-1/icons/3.svg",
        },
        {
          title: "Section 8 Company – Profit in Purpose",
          description:
            "For nonprofits with a cause—get the benefits of a registered entity.",
          icon: "img/home-1/icons/3.svg",
        },
        {
          title: "Producer Company – For Farmers, By Farmers",
          description:
            "Ideal for agriculture-based businesses that thrive in collaboration.",
          icon: "img/home-1/icons/3.svg",
        },
        {
          title: "Nidhi Company – Community Savings, Simplified",
          description:
            "For those who believe in the power of mutual savings and lending.",
          icon: "img/home-1/icons/3.svg",
        },
      ],
      business: [
        {
          title: "GST – Taxes Made Painless",
          description:
            "We’ll handle GST filing so you stay compliant without any stress.",
          icon: "img/home-1/icons/2.svg",
        },
        {
          title: "TDS/TCS – Tax? Done!",
          description:
            "We make TDS/TCS easy, helping you avoid penalties and keep cash flow smooth.",
          icon: "img/home-1/icons/2.svg",
        },
        {
          title: "Income Tax Filings – Save, File, Relax",
          description: "Get your taxes filed right—on time and stressfree!",
          icon: "img/home-1/icons/2.svg",
        },
        {
          title: "Payroll Compliances – Keeping Payroll on Point",
          description:
            "Stay compliant and keep your team happy with worry-free payroll services.",
          icon: "img/home-1/icons/2.svg",
        },
        {
          title: "ROC Filings – Stay Official, Stay Clear",
          description:
            "All your company’s filings, handled professionally and right on schedule.",
          icon: "img/home-1/icons/3.svg",
        },
        {
          title: "Accounting – Organized Numbers, Peace of Mind",
          description:
            "We make sure every rupee is accounted for—no surprises.",
          icon: "img/home-1/icons/3.svg",
        },
        {
          title: "Audit – Confidence in Every Check",
          description:
            "Get thorough audits that boost trust and keep your business in top shape.",
          icon: "img/home-1/icons/3.svg",
        },
      ],
    },
  ];

  const individualsToDisplay = showAllIndividual
    ? services[0].individuals
    : services[0].individuals.slice(0, 4);
  const businessToDisplay = showAllBusiness
    ? services[0].business
    : services[0].business.slice(0, 4);

  return (
    <PlaxLayout bg={false}>
      <Banner
        title={
          <>
            Making Finance Make Sense, <br />
            Minus the Nonsense
          </>
        }
        img="img/home-1/finance4.jpg"
        style={{
          transform: "translateX(10%)",
          borderRadius: "20px",
        }}
      />
      {/* banner end */}
      {/* features */}
      <div className="mil-features mil-p-160-80">
        <div className="container">
          <div className="row flex-sm-row-reverse justify-content-between align-items-center">
            <div className="col-xl-6 mil-mb-80">
              <h2 className="mil-mb-30 mil-up">
                Why use Tara? <br />
              </h2>
              <ul className="mil-list-1">
                <li>
                  <div className="mil-up">
                    <h5 className="mil-mb-15 mil-up">File Your Taxes</h5>
                    <p className="mil-text-m mil-soft mil-up">
                      Stress-Free, Every Time Get your taxes filed with ease,
                      accuracy, and zero hassle.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="mil-up">
                    <h5 className="mil-mb-15 mil-up">Insure Yourself </h5>
                    <p className="mil-text-m mil-soft mil-up">
                      Because You Matter Most Stay protected with simple,
                      affordable insurance tailored to you.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="mil-up">
                    <h5 className="mil-mb-15 mil-up">Maintain Your Accounts</h5>
                    <p className="mil-text-m mil-soft mil-up">
                      Keep Every Rupee in Check, organize, track, and manage
                      your finances without breaking a sweat.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-xl-5 mil-mb-80">
              <div className="mil-image-frame mil-visible-overflow">
                <img src="img/home-1/tax.jpg" alt="image" className="mil-up" />
                <div className="mil-img-box mil-accent-box mil-up">
                  <div>
                    <h2 className="mil-light mil-mb-15">100%</h2>
                    <p className="mil-text-s mil-light">
                      Security in your <br />
                      payments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* features end */}
      {/* facts */}
      <div className="mil-facts mil-p-0-80">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-xl-6">
              <div className="row">
                <div className="col-xl-6 mil-sm-text-center mil-mb-30 mil-up">
                  <p className="h1 mil-display mil-mb-15">
                    <span className="mil-accent mil-counter" data-number={7}>
                      7
                    </span>
                    <span className="mil-pale">m</span>
                  </p>
                  <h5>Registered Users</h5>
                </div>
                <div className="col-xl-6 mil-sm-text-center mil-mb-80 mil-up">
                  <p className="h1 mil-display mil-mb-15">
                    <span className="mil-accent mil-counter" data-number={170}>
                      170
                    </span>
                    <span className="mil-pale">+</span>
                  </p>
                  <h5>Countries with our coverage</h5>
                </div>
              </div>
            </div>
            <div className="col-xl-5 mil-mb-80">
              <p className="mil-text-m mil-soft mil-up">
                Dive into the data behind Tara's success. From the number of
                users to the extent of our global network, these facts and
                figures highlight Tara's impact on the world of finance and how
                we have managed
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* facts end */}
      {/* call to action */}
      <div className="mil-cta mil-up">
        <div className="container">
          <div className="mil-out-frame mil-p-100-100">
            <div className="row align-items-end">
              <div className="col-xl-8 mil-mb-80-adaptive-30">
                <h2 className="mil-up">Our Services </h2>
              </div>
              {/* <div className="col-xl-4 mil-mb-80 mil-up">
                <Link
                  href="/services"
                  className="mil-btn mil-m mil-add-arrow mil-adaptive-right"
                >
                  Learn More
                </Link>
              </div> */}
            </div>
            <div className="row">
              <div className="services-container">
                {/* Individual Services */}
                <div className="individual-services">
                  <h3 style={{ color: "rgb(242, 116, 87)", fontSize: "2rem" }}>
                    For Individual
                  </h3>{" "}
                  <br />
                  {individualsToDisplay.map((service, index) => (
                    <div key={index} className="service-card">
                      <div className="service-header">
                        <img
                          src={service.icon}
                          alt={`${service.title} icon`}
                          className="service-icon"
                        />
                        <h6 className="service-title">{service.title}</h6>
                      </div>
                      <p className="service-description">
                        {service.description}
                      </p>
                    </div>
                  ))}
                  <div style={{ paddingBottom: 10 }}>
                    {!showAllIndividual && (
                      <button
                        onClick={() => setShowAllIndividual(true)}
                        className="mil-btn mil-m mil-add-arrow"
                      >
                        Show More
                      </button>
                    )}
                  </div>
                </div>
                {/* Business Services */}
                <div className="business-services">
                  <h3 style={{ color: "rgb(242, 116, 87)", fontSize: "2rem" }}>
                    For Business
                  </h3>{" "}
                  <br />
                  {businessToDisplay.map((service, index) => (
                    <div key={index} className="service-card">
                      <div className="service-header">
                        <img
                          src={service.icon}
                          alt={`${service.title} icon`}
                          className="service-icon"
                        />
                        <h6 className="service-title">{service.title}</h6>
                      </div>
                      <p className="service-description">
                        {service.description}
                      </p>
                    </div>
                  ))}
                  <div style={{ paddingBottom: 10 }}>
                    {!showAllBusiness && (
                      <button
                        onClick={() => setShowAllBusiness(true)}
                        className="mil-btn mil-m mil-add-arrow"
                      >
                        Show More
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* call to action end */}
      {/* features */}
      {/* <div className="mil-features mil-p-160-80">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-xl-6 mil-mb-80">
              <h2 className="mil-mb-30 mil-up">
                Services we offer -
                <span style={{ color: "rgb(242, 116, 87)" }}>
                  for Corporates
                </span>
              </h2>
              <p className="mil-text-m mil-soft mil-mb-60 mil-up">
                Explore the convenience of Plax Consumer and <br />
                make your personal transfers quick and easy.
              </p>
              <ul className="mil-list-2">
                <li>
                  <div className="mil-up">
                    <h5 className="mil-mb-15">GST – Taxes Made Painless</h5>
                    <p className="mil-text-m mil-soft">
                      We’ll handle GST filing so you stay compliant without any
                      stress.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="mil-up">
                    <h5 className="mil-mb-15">TDS/TCS – Tax? Done!</h5>
                    <p className="mil-text-m mil-soft">
                      We make TDS/TCS easy, helping you avoid penalties and keep
                      cash flow smooth.
                    </p>
                  </div>
                </li>

                <li>
                  <div className="mil-up">
                    <h5 className="mil-mb-15">
                      Income Tax Filings – Save, File, Relax
                    </h5>
                    <p className="mil-text-m mil-soft">
                      Get your taxes filed right—on time and stressfree!
                    </p>
                  </div>
                </li>

                <li>
                  <div className="mil-up">
                    <h5 className="mil-mb-15">
                      Payroll Compliances – Keeping Payroll on Point
                    </h5>
                    <p className="mil-text-m mil-soft">
                      Stay compliant and keep your team happy with worry-free
                      payroll services.{" "}
                    </p>
                  </div>
                </li>

                <li>
                  <div className="mil-up">
                    <h5 className="mil-mb-15">
                      ROC Filings – Stay Official, Stay Clear
                    </h5>
                    <p className="mil-text-m mil-soft">
                      All your company’s filings, handled professionally and
                      right on schedule.
                    </p>
                  </div>
                </li>

                <li>
                  <div className="mil-up">
                    <h5 className="mil-mb-15">
                      Accounting – Organized Numbers, Peace of Mind
                    </h5>
                    <p className="mil-text-m mil-soft">
                      We make sure every rupee is accounted for— no surprises.
                    </p>
                  </div>
                </li>

                <li>
                  <div className="mil-up">
                    <h5 className="mil-mb-15">
                      Audit – Confidence in Every Check
                    </h5>
                    <p className="mil-text-m mil-soft">
                      Get thorough audits that boost trust and keep your
                      business in top shape.{" "}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-xl-5 mil-mb-80">
              <div className="mil-image-frame mil-visible-overflow">
                <img
                  src="img/home-1/services.jpg"
                  alt="image"
                  className="mil-up"
                />
                <div className="mil-img-box mil-right-max mil-soft-box mil-up">
                  <img src="img/home-1/icons/4.svg" alt="icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* features end */}
      {/* testimonials */}
      <div className="mil-testimonials mil-p-0-160">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 mil-relative">
              {/* <Testimonials1 /> */}
            </div>
          </div>
        </div>
      </div>
      {/* testimonials end */}
      {/* brands */}
      <div className="mil-brands mil-p-0-160">
        <div className="container">
          <h5 className="mil-text-center mil-soft mil-mb-60 mil-up">
            Join over 7,000 satisfied customers who enjoy our service!
          </h5>
          <div className="row justify-content-center">
            <div className="col-6 col-md-2 mil-text-center">
              <div className="mil-brand">
                <img src="img/brands/1.svg" alt="brand" className="mil-up" />
              </div>
            </div>
            <div className="col-6 col-md-2 mil-text-center">
              <div className="mil-brand">
                <img src="img/brands/2.svg" alt="brand" className="mil-up" />
              </div>
            </div>
            <div className="col-6 col-md-2 mil-text-center">
              <div className="mil-brand">
                <img src="img/brands/3.svg" alt="brand" className="mil-up" />
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="mil-brand mil-text-center">
                <img src="img/brands/4.svg" alt="brand" className="mil-up" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* brands end */}
      {/* call to action */}
      <div className="mil-cta mil-up">
        <div className="container">
          <div className="mil-out-frame mil-bg-1">
            <div className="mil-gradient-plus" />
            <div className="row justify-content-between align-items-center">
              <div className="col-xl-7 mil-mt-60">
                <h2 className="mil-mb-30 mil-up">
                  Bring Tara onboard and watch your finances
                  <br /> turn out to be meaningful!
                </h2>
                <p className="mil-text-m mil-mb-60 mil-up">
                  Tara will be the perfect interface between you and your
                  Chartered Accountant & Finance teams!
                </p>
                <div className="mil-up">
                  <Link
                    href="register"
                    className="mil-btn mil-md mil-add-arrow"
                  >
                    Register now
                  </Link>
                </div>
              </div>
              <div className="col-xl-5 mil-mt-60">
                <img
                  src="img/home-1/handshake.jpg"
                  alt="img"
                  style={{
                    width: "100%",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    position: "relative",
                    // display: "inline-block",
                    maskImage:
                      "linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)) ",
                  }}
                  className="mil-up"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* call to action end */}
      {/* faq */}
      <div className="mil-faq mil-p-160-130">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="mil-text-center">
                <h2 className="mil-mb-30 mil-up">FAQs</h2>
                <p className="mil-text-m mil-soft mil-mb-60 mil-up">
                  Find quick and clear answers to the most common <br />
                  questions about Tara
                </p>
              </div>
              <PlaxAccordion />
            </div>
          </div>
        </div>
      </div>
      {/* faq end */}
      {/* call to action */}
      <CallToAction2 />
      {/* call to action end */}
    </PlaxLayout>
  );
};
export default page;
