import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactUs() {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_0e2xfw6', 'template_5jyqe4m', form.current, 'user_gOSeAx7P2g9j05MORRYOE')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
    };

  return (<div>
    <form ref ={form}onSubmit = {sendEmail}>
        <div></div>
    </form>                     
  </div>);
}
