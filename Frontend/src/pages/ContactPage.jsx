import React from "react";
import city from "../assets/city.webp";

const ContactPage = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "182663da-0aaa-46ab-8547-8d9d3bd42c61");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      
      setResult(data.message);
    }
  };

  return (
    <div className="relative h-[580px] w-full">
      {/* Background Image */}
      <img
        src={city}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay and Contact Form */}
      <div className="relative z-10 flex h-full items-center justify-center bg-black bg-opacity-60">
        <div className="w-full max-w-md rounded-lg p-8 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">
            Contact Us
          </h2>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-300"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="text"
                name="email"
                required
                className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-300"
                placeholder="Enter your email"
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white"
              >
                Message
              </label>
              <textarea
                type="text"
                name="message"
                required
                className="mt-1 w-full rounded border border-gray-300 px-4 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-300"
                placeholder="Enter your message"
                rows="4"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-32 rounded bg-white px-3 py-1.5 text-black font-medium hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
              >
                Submit
              </button>
            </div>
          </form>
          <span>{result}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
