import React from "react";
import binaa from '../assets/images/binaa.png';
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';
import image4 from '../assets/images/image4.png';
import vector from '../assets/images/vector.png';
import direction from '../assets/images/direction.png';
import rectangle from '../assets/images/rectangle.png';
import rectangle2 from '../assets/images/rectangle2.png';
import rectanglesmall from '../assets/images/rectanglesmall.png';

const AboutUs = () => {
  return (
    <div className="bg-[#FFF8E3] text-[#1d2a1f] font-serif pt-24">
      {/* Who We Are Section */}
      <section className="px-6 md:px-20 py-12 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 font-[PlayfairDisplay] text-[#213824]">ABOUT US</h1>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-semibold mb-4 font-[PlayfairDisplay] text-[#213824]">Who We Are:</h2>
            <p className="mb-4 leading-relaxed">
              Welcome to Binaa, a collaborative platform dedicated to documenting and preserving architectural heritage.
              We bring together architects, historians, and researchers to contribute, annotate, and share knowledge about significant structures.
            </p>
          </div>
          <img src={binaa} alt="Binaa Logo" className="w-40 h-auto lg:w-48" />
        </div>
      </section>

      {/* Our Mission Section */}
      <section
        className="text-black py-14 px-6 md:px-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${rectangle})` }}
      >
        <div className="bg-opacity-60 p-8 rounded-xl max-w-7xl mx-auto">
          <h2 className="text-2xl text-center font-semibold mb-6 font-[PlayfairDisplay] text-[#213824]">Our Mission:</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li>Document architectural resources with detailed descriptions and images.</li>
            <li>Collaborate through structured contributions and annotations.</li>
            <li>Resolve conflicts and verify historical accuracy through expert reviews.</li>
          </ul>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[image1, image2, image3, image4].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Architecture ${idx + 1}`}
                className="rounded-lg object-cover w-full h-40"
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 md:px-20 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-12 font-[PlayfairDisplay] text-[#213824]">How It Works:</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              title: "Create & Manage Projects",
              description: "Experts can add architectural documentation.",
            },
            {
              title: "Collaborate & Contribute",
              description: "Contributors can add sections and annotations.",
            },
            {
              title: "Review & Approve",
              description: "Verified professionals moderate content for accuracy.",
            },
            {
              title: "Preserve & Share",
              description: "Export resources as PDFs or web-accessible formats.",
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 text-[#1d2a1f] font-serif flex flex-col items-center justify-center text-center min-h-[250px]"
            >
              <img
                src={rectanglesmall}
                alt="card background"
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
              />
              <div className="relative z-10 flex items-center justify-center bg-[#1d2a1f] text-white w-10 h-10 rounded-full mb-4 text-sm font-semibold">
                {idx + 1}
              </div>
              <h3 className="relative z-10 font-bold text-md mb-2 font-[montserrat] text-[#213824]">{step.title}</h3>
              <p className="relative z-10 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        className="text-black py-14 px-6 md:px-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${rectangle2})` }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mb-6 font-[PlayfairDisplay] text-[#213824]">Why Choose Us?</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li>A structured and user-friendly editor for detailed architectural documentation.</li>
            <li>Expert-driven collaboration with verified contributions.</li>
            <li>Conflict resolution features to maintain historical accuracy.</li>
            <li>Seamless accessibility—access and contribute from anywhere.</li>
          </ul>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 px-6 md:px-20 max-w-7xl mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4 font-[PlayfairDisplay] text-[#213824]">Join Us!</h2>
        <p className="mb-6 text-md max-w-2xl mx-auto">
          Be a part of a growing community dedicated to preserving architectural history. Whether you're an architect, historian, or researcher, your contributions matter!
        </p>
        <div className="flex flex-col items-center space-y-2 text-sm">
          <p className="flex items-center gap-2">
            <img src={vector} alt="email icon" className="w-4 h-4" />
            <span>Contact Us: <a className="underline" href="mailto:binaateam.dz@gmail.com">binaateam.dz@gmail.com</a></span>
          </p>
          <p className="flex items-center gap-2">
            <img src={direction} alt="web icon" className="w-4 h-4" />
            <span>Website: <a className="underline" href="https://binaa.com">Binaa.com</a></span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
