import React from 'react';

const TermsAndPolicy = () => {
  return (
    <main className="max-w-4xl mx-auto px-8 py-12 ">
      <h1 className="text-4xl font-bold font-playfairdisplay text-center mb-12 text-[#213824]">
  Terms & Privacy policy
</h1>


      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2 font-playfairdisplay text-[#4B5E4B]">
          1. Introduction:
        </h2>
        <p className="text-base leading-relaxed">
          Welcome to Binaa! Our platform is dedicated to preserving and documenting Algerian
          architectural heritage through collaboration and knowledge sharing. We prioritize user
          privacy and security while ensuring a transparent and fair environment for all members.
          <br /><br />
          By accessing or using Binaa, you agree to comply with the terms outlined in this document.
          If you do not agree with any part of these terms, please refrain from using our platform.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2 font-playfairdisplay text-[#4B5E4B]">
          2. Terms of Service
        </h2>
        <ul className="list-disc list-inside text-base leading-relaxed space-y-2 font-montserrat">
          <li><strong>User Responsibilities:</strong> Users must provide accurate information, respect intellectual property, and avoid harmful content.</li>
          <li><strong>Content Ownership:</strong> Users own their content but grant Binaa permission to display it. We may remove content violating guidelines.</li>
          <li><strong>Account Usage:</strong> Users must secure their accounts. Violations may result in suspension.</li>
          <li><strong>Disclaimers:</strong> Binaa is not responsible for the accuracy of user content or external links.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2 font-playfairdisplay text-[#4B5E4B]">
          3. Privacy Policy
        </h2>
        <ul className="list-disc list-inside text-base leading-relaxed space-y-2 font-montserrat">
          <li><strong>Data Collection & Use:</strong> We collect user-provided data (e.g., name, email) and usage analytics to enhance the platform.</li>
          <li><strong>Data Sharing:</strong> We don’t sell data but may share it with trusted service providers or legal authorities if required.</li>
          <li><strong>Security & Rights:</strong> We protect user data and allow users to access, modify, or delete it. Contact us for data-related requests.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2 font-playfairdisplay text-[#4B5E4B]">
          4. Cookies & Tracking
        </h2>
        <p className="text-base leading-relaxed">
          We use cookies for authentication and analytics. Users can adjust their browser settings to manage cookies.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 font-playfairdisplay text-[#4B5E4B]">
          5. Contact Information
        </h2>
        <p className="text-base leading-relaxed">
          For inquiries, contact us at <a className="text-blue-700 underline" href="mailto:binaateam.dz@gmail.com">binaateam.dz@gmail.com</a> or <a className="text-blue-700 underline" href="tel:+213987098765">+213 987 098 765</a>.
          <br /><br />
          Thank you for being part of <strong>BinaA!</strong>
        </p>
      </section>
    </main>
  );
};

export default TermsAndPolicy;
