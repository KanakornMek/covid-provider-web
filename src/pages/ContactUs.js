import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./CSS/ContactUs.css";
import { Link } from "react-router-dom";

export default function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <div className="Biggest">
      <div className="ContactUsCard">
        <form ref={form} onSubmit={sendEmail}>
          <div className="Header">Contact Us</div>
          <div className="FormName">
            <input
              type="text"
              autoComplete="off"
              name="from_name"
              placeholder="Name"
              required
            ></input>
          </div>
          <div className="FormSubject">
            <input
              type="text"
              autoComplete="off"
              name="subject"
              placeholder="Subject"
              required
            ></input>
          </div>
          <div className="FormMessage">
            <textarea
              type="text"
              autoComplete="off"
              name="message"
              placeholder="Message"
              required
            ></textarea>
          </div>
          <div className="SendButton">
            <input type="submit" value="Send Message" />
          </div>
          <div className="BackToLanding">
            <Link to="/">Back to Home</Link>
          </div>
        </form>
      </div>
      <div className="Developer">
        <a href="https://www.linkedin.com/in/nattapon-howong-7819761bb/">Nattapon Howong</a>
      </div>
    </div>
  );
}
