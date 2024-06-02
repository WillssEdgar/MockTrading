
export default function AboutUs() {
  return (
    <div className="container mx-auto py-10 px-4 min-h-screen">
      <div className=" w-full max-w-4xl mx-auto p-10 ">
        <h1 className="text-5xl font-bold text-start text-blue-600 mb-6">About Us</h1>
        <p className="text-lg text-gray-700 mb-6 font-semibold">
          At StockSim, our mission is to empower individuals
          to become confident and informed traders through risk-free trading simulations and comprehensive
          educational resources. We believe that financial literacy and hands-on experience are key to
          success in the stock market.
        </p>

        {/* Our Mission Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            Our mission is to make stock market trading accessible to everyone, regardless of their
            experience level. By providing a platform that combines real-time data with interactive
            learning tools, we aim to bridge the gap between theoretical knowledge and practical
            application.
          </p>
        </div>

        {/* Our Team Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Team</h2>
          <p className="text-lg text-gray-700 mb-4">
            Our team is composed of passionate professionals with diverse backgrounds in finance,
            technology, and education. Together, we work towards creating an innovative and
            user-friendly platform that meets the needs of our users.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-600 p-6 shadow-lg rounded-lg">
              <h3 className="font-semibold text-xl text-white mb-2">Jane Doe</h3>
              <p className="text-white">CEO & Founder</p>
              <p className="text-white mt-2">Jane has over 15 years of experience in the financial
                industry and is dedicated to making financial education accessible to all.</p>
            </div>
            <div className="bg-slate-600 p-6 shadow-lg rounded-lg">
              <h3 className="font-semibold text-xl text-white mb-2">John Smith</h3>
              <p className="text-white">CTO</p>
              <p className="text-white mt-2">John leads our technology team with a focus
                on developing cutting-edge tools that enhance the user experience.</p>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li><span className="font-semibold">Integrity:</span> We adhere to the highest
              standards of ethical behavior in all our interactions.</li>
            <li><span className="font-semibold">Innovation:</span> We continuously seek out
              new ways to improve our platform and offer unique solutions to our users.</li>
            <li><span className="font-semibold">Education:</span> We believe in the power
              of education to transform lives and are committed to providing top-notch
              learning resources.</li>
            <li><span className="font-semibold">User-Centric:</span> Our users are at
              the heart of everything we do. We strive to understand their needs and exceed
              their expectations.</li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-700 mb-6">Have any questions or feedback?
            We'd love to hear from you!</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700
            transition duration-300">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}

