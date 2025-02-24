import React from "react";
import { motion } from "framer-motion";
function PrivacyAndPolicy() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };
  return (
    <motion.div
      className="lg:max-w-[70%] mx-auto p-6 cursor-pointer"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h1 className="lg:text-3xl text-2xl font-semibold mb-6 text-primary">
        Privacy Policy
      </h1>
      <p className="text-textGray font-semibold mb-2">
        Effective Date: 24th Feb 2025
      </p>{" "}
      <p className="text-textGray font-medium mb-4">
        <span className="text-textGray font-semibold">
          {" "}
          Evaga Entertainment Pvt Ltd
        </span>{" "}
        ("Evaga," "we," "our," "us") respects your privacy and is committed to
        protecting the personal information you share with us. This Privacy
        Policy explains how we collect, use, disclose, and safeguard your
        information when you visit our website, use our services, or interact
        with us.
      </p>
      <div className="space-y-8 text-textGray">
        <section className="border-b border-gray-400 pb-4 cursor-pointer">
          <h2 className="text-xl font-semibold mb-4">
            1. Information We Collect
          </h2>{" "}
          <h2 className="text-base font-medium mb-4">
            1.1 Personal Information
          </h2>
          <p>
            We may collect the following personal information when you register
            on our platform, book services, or interact with us:
          </p>
          <ul className="list-disc pl-8">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Billing and shipping address</li>{" "}
            <li>Event details and preferences</li>
          </ul>{" "}
          <h2 className="text-base font-medium mt-3 mb-4">
            1.2 Non-Personal Information
          </h2>
          <p>
            We may collect non-personal data through cookies, web beacons, and
            tracking technologies, including:
          </p>
          <ul className="list-disc pl-8">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Pages visited on our website</li>{" "}
            <li>Interaction with our services</li>
          </ul>
        </section>

        <section className="border-b border-gray-400 pb-4 cursor-pointer">
          <h2 className="text-xl font-semibold mb-4">
            2. How We Use Your Information
          </h2>
          <p>We use the information collected for the following purposes:</p>
          <br />
          <ul className="list-disc pl-8">
            <li>To provide and improve our event planning services</li>
            <li>To process transactions and payments</li>
            <li>To send booking confirmations and service updates</li>
            <li>To respond to customer inquiries and support requests</li>{" "}
            <li>To personalize user experience and enhance our platform</li>
            <li>
              To send promotional emails and marketing updates (with user
              consent)
            </li>
            <li>To comply with legal obligations and prevent fraud</li>
          </ul>
        </section>

        <section className="border-b border-gray-400 pb-4 cursor-pointer">
          <h2 className="text-xl font-semibold mb-4">3. Consent</h2>
          <p>
            By providing your personal information, you consent to its
            collection and use for the specified purposes. If we request
            additional information for marketing or other purposes, we will seek
            your explicit consent.
          </p>
          <br />
          <p>
            You may withdraw your consent at any time by contacting us at
            [info@evagaentertainment.com].
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4 cursor-pointer">
          <h2 className="text-xl font-semibold mb-4">
            4. Disclosure of Information
          </h2>
          <p>
            We do not sell, rent, or trade your personal information. However,
            we may disclose your information:
          </p>
          <br />
          <ul className="list-disc pl-8">
            <li>To comply with legal obligations</li>
            <li>
              To service providers and vendors who assist in operating our
              platform
            </li>
            <li>
              To payment gateways and financial institutions for processing
              transactions
            </li>
            <li>
              In the event of a merger, acquisition, or sale of company assets
            </li>{" "}
          </ul>
        </section>

        <section className="border-b border-gray-400 pb-4 cursor-pointer">
          <h2 className="text-xl font-semibold mb-4">5. Payment Processing</h2>
          <p>
            We use secure third-party payment gateways like Razorpay. Payment
            data is encrypted and handled per PCI-DSS standards. We do not store
            your credit/debit card details on our servers.
          </p>
          <br />
          <p>
            For more details, please refer to the Razorpay Privacy Policy at
            [https://razorpay.com].
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4 cursor-pointer">
          <h2 className="text-xl font-semibold mb-4">
            6. Third-Party Services
          </h2>
          <p>
            Certain third-party service providers, such as payment processors,
            have their own privacy policies. We encourage you to review their
            policies before using their services.
          </p>

          <br />
          <p>
            Once you leave our platform or are redirected to a third-party
            website, our Privacy Policy no longer applies.
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4 cursor-pointer">
          <h2 className="text-xl font-semibold mb-4">7. Security Measures</h2>
          <p>
            We implement industry-standard security measures to protect your
            personal information from unauthorized access, misuse, or
            disclosure. However, no online data transmission can be guaranteed
            100% secure.
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4 cursor-pointer">
          <h2 className="text-xl font-semibold mb-4">
            8. Cookies & Tracking Technologies
          </h2>
          <p>
            We use cookies to enhance user experience, track preferences, and
            improve site functionality. You can manage cookie settings in your
            browser.
          </p>
          <br />
        </section>

        <section className="border-b border-gray-400 pb-4 cursor-pointer">
          <h2 className="text-xl font-semibold mb-4">9. Age of Consent</h2>
          <p>
            By using our website, you confirm that you are at least the age of
            majority in your jurisdiction or have parental consent.
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4 cursor-pointer">
          <h2 className="text-xl font-semibold mb-4">
            10. Changes to This Privacy Policy
          </h2>
          <p>
            We reserve the right to update this Privacy Policy at any time.
            Changes will take effect immediately upon posting. We encourage
            users to review this policy periodically.
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4 flex flex-col gap-1 cursor-pointer">
          <h2 className="text-xl font-semibold mb-4">11. Contact Us</h2>
          <p>For any privacy-related inquiries, please contact us at:</p>
      
          <p>Evaga Entertainment Pvt Ltd</p>

          <p>
            Email: info@evagaentertainment.com Address:No10/12, Prestige Atlanta
            , 80 Feet Rd, Koramangala , 1 A Block Koramangala , Bengaluru,
            560034
          </p>
          <p>
            Address:No10/12, Prestige Atlanta , 80 Feet Rd, Koramangala , 1 A
            Block Koramangala , Bengaluru, 560034
          </p>
        </section>
      </div>
    </motion.div>
  );
}

export default PrivacyAndPolicy;
