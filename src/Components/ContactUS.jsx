import React from "react";
import Swal from "sweetalert2";

const handleForm = (e) => {
  e.preventDefault();
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your Form Has been submited",
    showConfirmButton: false,
    timer: 1500,
  });
};
const ContactUS = () => {
  return (
    <div
      id="contact"
      className=" flex justify-center items-center bg-base-200 mb-8 mt-4 max-w-7xl mx-auto"
    >
      <form
        onSubmit={handleForm}
        className="bg-base-100 border border-gray-200/30 rounded-2xl p-4 lg:p-8 w-full max-w-[700px] space-y-5"
      >
        <h2 className="text-2xl text-accent font-bold text-center">
          REQUEST A QUICK QUOTE
        </h2>
        <h2 className=" text-center">
          We love to listen and we are eagerly waiting to talk to you regarding
          your project. Get in touch with us if you have any queries and we will
          get back to you as soon as possible.
        </h2>
        <div className="flex justify-between gap-5">
          <div className="flex-1">
            <label className="block mb-2"> Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-lg p-3 outline-none input "
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 ">Your Email</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-lg p-3 outline-none input"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 "> Your Phone </label>
          <input
            type="number"
            placeholder="+123456789"
            className=" no-spinner w-full rounded-lg p-3 outline-none input"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Message</label>
          <textarea
            rows="4"
            placeholder="Write your message..."
            className="w-full textarea rounded-lg p-3 outline-none resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-accent cursor-pointer text-white font-semibold py-3 rounded-lg hover:bg-accent transition duration-300"
        >
          REQUEST A QUOTE
        </button>
      </form>
    </div>
  );
};

export default ContactUS;
