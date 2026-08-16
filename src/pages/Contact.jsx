import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../Styles/public.css";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <main className="public-page">

        <section className="public-page-hero">

          <div className="public-page-hero-inner">

            <span className="public-eyebrow">
              CONTACT TAKSHAYA
            </span>

            <h1>
              Let's build better
              manufacturing connections.
            </h1>

            <p>
              Whether you are a manufacturer, OEM, brand, tool room
              or industrial partner, we'd like to hear from you.
            </p>

          </div>

        </section>

        <section className="public-content">

          <div className="public-container">

            <div className="contact-layout">

              {/* CONTACT OPTIONS */}

              <div>

                <div className="about-intro">

                  <h2>
                    How can we help?
                  </h2>

                  <p>
                    Select the area closest to your requirement,
                    or send us a general enquiry.
                  </p>

                </div>

                <div className="contact-options">

                  <a
                    href="mailto:support@takshaya.com?subject=Manufacturer%20Enquiry"
                    className="contact-option"
                  >
                    <strong>
                      Manufacturer / OEM
                    </strong>

                    <span>
                      Looking for tooling, manufacturing capacity
                      or industrial partners?
                    </span>
                  </a>

                  <a
                    href="mailto:support@takshaya.com?subject=Tool%20Room%20or%20Mould%20Owner%20Enquiry"
                    className="contact-option"
                  >
                    <strong>
                      Tool Room / Mould Owner
                    </strong>

                    <span>
                      Want to make your moulds, dies or tooling
                      accessible to manufacturers?
                    </span>
                  </a>

                  <a
                    href="mailto:support@takshaya.com?subject=Partnership%20Enquiry"
                    className="contact-option"
                  >
                    <strong>
                      Partnership
                    </strong>

                    <span>
                      Interested in collaborating with Takshaya?
                    </span>
                  </a>

                  <a
                    href="mailto:support@takshaya.com?subject=General%20Enquiry"
                    className="contact-option"
                  >
                    <strong>
                      General Enquiry
                    </strong>

                    <span>
                      Have a question about Takshaya?
                    </span>
                  </a>

                </div>

              </div>

              {/* FORM */}

              <div className="contact-form">

                <h2>
                  Send us a message
                </h2>

                <p>
                  Tell us a little about your requirement and
                  our team will get back to you.
                </p>

                {submitted ? (

                  <div className="public-card">

                    <h2>
                      Thank you.
                    </h2>

                    <p>
                      Your enquiry has been recorded. Our team
                      will get back to you.
                    </p>

                  </div>

                ) : (

                  <form onSubmit={handleSubmit}>

                    <div className="public-form-group">

                      <label htmlFor="name">
                        Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                      />

                    </div>

                    <div className="public-form-group">

                      <label htmlFor="company">
                        Company
                      </label>

                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Company name"
                      />

                    </div>

                    <div className="public-form-group">

                      <label htmlFor="email">
                        Business Email
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                      />

                    </div>

                    <div className="public-form-group">

                      <label htmlFor="type">
                        Enquiry Type
                      </label>

                      <select
                        id="type"
                        name="type"
                        defaultValue=""
                        required
                      >

                        <option value="" disabled>
                          Select enquiry type
                        </option>

                        <option value="manufacturer">
                          Manufacturer / OEM
                        </option>

                        <option value="toolroom">
                          Tool Room / Mould Owner
                        </option>

                        <option value="brand">
                          Brand Owner
                        </option>

                        <option value="partnership">
                          Partnership
                        </option>

                        <option value="general">
                          General Enquiry
                        </option>

                      </select>

                    </div>

                    <div className="public-form-group">

                      <label htmlFor="message">
                        Message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Tell us about your requirement..."
                      />

                    </div>

                    <button
                      type="submit"
                      className="public-submit-button"
                    >
                      Send Enquiry →
                    </button>

                  </form>

                )}

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}