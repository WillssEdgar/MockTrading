import { ChangeEvent, FormEvent, useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };
  return (
    <div className="container mx-auto py-10 px-4  min-h-screen">
      <div className=" w-full max-w-2xl mx-auto ">
        <h1 className="text-5xl font-bold text-start text-blue-600 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-6 ">
          We’d love to hear from you! Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="5"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300">
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Additional Contact Information Section */}
      <div className="bg-gray-600 w-full max-w-2xl mx-auto p-10 shadow-xl rounded-lg mt-10 ">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Additional Contact Information</h2>
        <div className="text-lg text-gray-700 space-y-4">
          <p className="text-white"><span className="font-semibold ">Email:</span> support@stocksim.com</p>
          <p className="text-white"><span className="font-semibold ">Phone:</span> (123) 456-7890</p>
          <p className="text-white"><span className="font-semibold ">Address:</span> 123 Stock Sim Street, Finance City, FS 12345</p>
          <p className="text-center text-white">Follow us on social media:</p>
          <div className="flex justify-center space-x-4 ">
            <a href="#" className="text-blue-600 hover:text-blue-800 transition duration-300 text-white">
              <i className="fab fa-facebook-f "></i>
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition duration-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition duration-300">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

