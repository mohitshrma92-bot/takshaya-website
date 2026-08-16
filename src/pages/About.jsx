import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../Styles/public.css";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="public-page">

        <section className="public-page-hero">

          <div className="public-page-hero-inner">

            <span className="public-eyebrow">
              ABOUT TAKSHAYA
            </span>

            <h1>
              Building India's
              Manufacturing Backbone.
            </h1>

            <p>
              Takshaya is building a trusted digital ecosystem that
              connects manufacturers, OEMs, brands, tool rooms and
              tooling owners.
            </p>

          </div>

        </section>

        <section className="public-content">

          <div className="public-container">

            <div className="about-intro">

              <h2>
                Why Takshaya?
              </h2>

              <p>
                Manufacturing businesses often have valuable tools,
                moulds, dies, machines and capabilities that remain
                underutilized, while another manufacturer may be
                searching for exactly the same capability.
              </p>

              <br />

              <p>
                Takshaya is being built to bridge that gap by creating
                easier access to manufacturing resources and trusted
                industrial connections.
              </p>

            </div>

            <div className="public-grid">

              <div className="public-info-card">

                <div className="public-info-icon">
                  01
                </div>

                <h3>
                  Access
                </h3>

                <p>
                  Make manufacturing capabilities and tooling easier
                  to discover and access.
                </p>

              </div>

              <div className="public-info-card">

                <div className="public-info-icon">
                  02
                </div>

                <h3>
                  Utilization
                </h3>

                <p>
                  Help businesses unlock value from underutilized
                  moulds, dies, tools and industrial capabilities.
                </p>

              </div>

            </div>

            <div className="public-grid" style={{ marginTop: "24px" }}>

              <div className="public-info-card">

                <div className="public-info-icon">
                  03
                </div>

                <h3>
                  Trust
                </h3>

                <p>
                  Build stronger business relationships through
                  structured company information and verification.
                </p>

              </div>

              <div className="public-info-card">

                <div className="public-info-icon">
                  04
                </div>

                <h3>
                  Collaboration
                </h3>

                <p>
                  Connect businesses across the manufacturing
                  ecosystem to create new opportunities.
                </p>

              </div>

            </div>

            <div
              className="public-card"
              style={{ marginTop: "30px" }}
            >

              <h2>
                Our Vision
              </h2>

              <p>
                To create a connected manufacturing ecosystem where
                businesses can discover, access and collaborate around
                industrial capabilities with greater speed,
                transparency and confidence.
              </p>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}