import React, { useRef, useState } from "react";
import "./contact.css";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const formRef = useRef();
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_cvsbdtv",
        "template_8781v0b",
        formRef.current,
        "user_k8XMgvWkZThzIO7dKBfKI"
      )
      .then(
        (result) => {
          console.log(result.text);
          setDone(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
    clear();
  };
  const clear = () => {
    setFormData({ name: "", email: "", message: "" });
  };
  return (
    <>
      <section className="forms top">
        <div className="container">
          <div className="sign-box">
            <p>CONTACT </p>
            <form ref={formRef} onSubmit={handleSubmit}>
              <p className="sent">{done && "Thank you!..."}</p>
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <input
                type="text"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <textarea
                cols="30"
                rows="10"
                required
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              ></textarea>

              <button type="submit" className="primary-btn">
                SEND <i className="fa fa-long-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
