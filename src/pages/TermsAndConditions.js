import React from "react";
import { motion } from "framer-motion";
function TermsAndConditions() {
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
      className="lg:max-w-[70%] mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h1 className="lg:text-3xl text-2xl font-semibold mb-6 text-primary">
        Terms & Conditions
      </h1>
      <p className="text-textGray font-semibold mb-4">
        Last updated on Feb 07th 2025
      </p>

      <div className="space-y-8 text-textGray">
        <section className="border-b border-gray-400 pb-4">
          <h2 className="text-xl font-semibold mb-4">1. DEFINITIONS</h2>
          <ul className="list-disc pl-8">
            <li>
              "Platform" refers to Evaga Entertainment’s website and mobile
              application.
            </li>
            <li>
              "User" refers to any individual or entity accessing or using the
              Platform.
            </li>
            <li>
              "Vendor" refers to third-party service providers offering
              event-related services on the Platform.
            </li>
            <li>
              "We," "Us," or "Evaga" refers to Evaga Entertainment Pvt Ltd.
            </li>
          </ul>
        </section>

        <section className="border-b border-gray-400 pb-4">
          <h2 className="text-xl font-semibold mb-4">
            2. SCOPE AND ACCEPTANCE
          </h2>
          <p>
            2.1. These Terms constitute a legally binding agreement between you
            and Evaga. By accessing or using the Platform, you agree to comply
            with all its terms, conditions, and applicable laws.
          </p>
          <br />
          <p>
            2.2. Evaga reserves the right to modify, amend, or update these
            Terms at its sole discretion without prior notice. Continued use of
            the Platform after such modifications constitutes acceptance of the
            revised Terms.
          </p>
          <br />
          <p>
            2.3. Any breach of these Terms shall result in the immediate
            termination of your account, without prejudice to Evaga’s rights to
            seek damages and legal recourse.
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4">
          <h2 className="text-xl font-semibold mb-4">
            3. GOVERNING LAW & JURISDICTION
          </h2>
          <p>
            3.1. These Terms shall be governed by and construed in accordance
            with the laws of India.
          </p>
          <br />
          <p>
            3.2. Any disputes arising from or related to these Terms shall be
            subject to the exclusive jurisdiction of the courts in Bangalore,
            Karnataka.
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4">
          <h2 className="text-xl font-semibold mb-4">
            4. USER ELIGIBILITY AND ACCOUNT REGISTRATION
          </h2>
          <p>
            4.1. You must be at least 18 years old and legally competent to
            enter into a contract under the Indian Contract Act, 1872.
          </p>
          <br />
          <p>
            4.2. Users shall provide accurate and complete registration details.
            Misrepresentation of identity, age, or other information shall
            result in immediate termination of access to the Platform.
          </p>
          <br />
          <p>
            4.3. Users are solely responsible for maintaining the
            confidentiality of their account credentials. Any unauthorized use
            must be reported to Evaga immediately. Evaga shall not be liable for
            losses resulting from unauthorized access due to negligence.
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4">
          <h2 className="text-xl font-semibold mb-4">
            5. ROLE OF EVAGA – MARKETPLACE DISCLAIMER
          </h2>
          <p>
            5.1. Evaga operates as an intermediary marketplace connecting Users
            with independent third-party vendors for event-related services.
          </p>
          <br />
          <p>
            5.2. Evaga does not own, control, endorse, or guarantee the quality,
            availability, legality, or performance of services offered by
            vendors. The contract for services is strictly between the User and
            Vendor, and Evaga bears no liability for any disputes, damages, or
            non-performance.
          </p>
          <br />
          <p>5.3. Evaga shall not be liable for:</p>
          <ul className="list-disc pl-8">
            <li>Service deficiencies, negligence, or breaches by vendors.</li>
            <li>Cancellations, rescheduling, or delays caused by vendors.</li>
            <li>Personal injury, loss, or damage caused by vendor services.</li>
          </ul>
        </section>

        <section className="border-b border-gray-400 pb-4">
          <h2 className="text-xl font-semibold mb-4">6. FORCE MAJEURE</h2>
          <p>
            6.1. Evaga and its vendors shall not be held liable for any failure
            or delay in performance caused by events beyond their reasonable
            control, including but not limited to:
          </p>
          <ul className="list-disc pl-8">
            <li>Acts of God (floods, earthquakes, natural disasters).</li>
            <li>Government actions, laws, or regulations.</li>
            <li>War, terrorism, riots, civil unrest.</li>
            <li>Cyberattacks, data breaches, or internet failures.</li>
            <li>Pandemics, epidemics, or health crises.</li>
          </ul>
          <br />
          <p>
            6.2. If a Force Majeure event prevents service delivery for more
            than 30 days, either party may terminate the agreement without
            liability, subject to applicable refund and cancellation policies.
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4">
          <h2 className="text-xl font-semibold mb-4">
            7. SPECIFIC PENALTIES FOR MISCONDUCT
          </h2>
          <p>
            7.1. Users engaging in fraudulent transactions, misrepresentation,
            abuse of refund policies, or chargebacks shall be subject to:
          </p>
          <ul className="list-disc pl-8">
            <li>Immediate account termination without refund.</li>
            <li>
              Legal action for damages, including financial losses and
              reputation harm.
            </li>
            <li>
              A penalty of the transaction value, for misuse of Evaga's payment
              system.
            </li>
          </ul>
          <br />
          <p>
            7.2. Evaga reserves the right to report fraudulent activities to
            relevant law enforcement authorities.
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4">
          <h2 className="text-xl font-semibold mb-4">
            8. VENDOR LIABILITY CLAUSE
          </h2>
          <p>
            8.1. Vendors listed on the Evaga platform are independent entities
            and bear full legal responsibility for their services, including
            compliance with consumer protection laws.
          </p>
          <br />
          <p>8.2. Users acknowledge that:</p>
          <ul className="list-disc pl-8">
            <li>
              Evaga is not liable for any vendor’s failure to deliver services.
            </li>
            <li>
              Vendors are solely responsible for service quality, fulfillment,
              and any resulting disputes.
            </li>
            <li>
              Any legal claims must be directed towards the vendor, and Evaga
              shall not be named as a party in such disputes.
            </li>
          </ul>
          <br />
          <p>
            8.3. Vendors must ensure compliance with all applicable laws, and
            failure to do so may result in de-listing, penalties, or legal
            action by Evaga.
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4">
          <h2 className="text-xl font-semibold mb-4">
            9. PAYMENT TERMS & TRANSACTIONS
          </h2>
          <p>
            9.1. All payments must be processed through the Platform’s
            designated third-party payment gateways. Users agree to abide by
            their respective terms and policies.
          </p>
          <br />
          <p>
            9.2. Evaga reserves the right to impose service fees, commissions,
            or transactional charges on bookings, which shall be disclosed at
            the time of payment.
          </p>
          <br />
          <p>
            9.3. Evaga is not liable for technical failures, payment processing
            delays, chargebacks, or unauthorized transactions initiated by the
            User’s financial institution.
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4">
          <h2 className="text-xl font-semibold mb-4">
            10. CANCELLATION AND REFUNDS
          </h2>
          <p>
            10.1. For all cancellations and refunds, please refer to our
            Cancellation and Refund Policy.
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4">
          <h2 className="text-xl font-semibold mb-4">
            11. INTELLECTUAL PROPERTY RIGHTS
          </h2>
          <p>
            11.1. All content, trademarks, logos, text, images, and software on
            the Platform are the intellectual property of Evaga or its
            licensors.
          </p>
          <br />
          <p>
            11.2. Users may not copy, reproduce, modify, distribute, or exploit
            any content from the Platform without prior written consent from
            Evaga.
          </p>
          <br />
          <p>
            11.2. Users may not copy, reproduce, modify, distribute, or exploit
            any content from the Platform without prior written consent from
            Evaga.
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4">
          <h2 className="text-xl font-semibold mb-4">
            12. USER-GENERATED CONTENT & REVIEWS
          </h2>
          <p>
            12.1. Users may post reviews, ratings, and comments on the Platform,
            subject to the following conditions:
          </p>
          <ul className="list-disc pl-8">
            <li>Content must be truthful, lawful, and non-defamatory.</li>
            <li>
              Content must not contain hateful, obscene, or misleading
              statements.
            </li>
            <li>
              Evaga reserves the right to remove or modify any content deemed
              inappropriate.
            </li>
          </ul>
          <br />
          <p>
            12.2. Users grant Evaga a non-exclusive, worldwide, royalty-free
            license to use, display, and distribute user-generated content for
            marketing purposes.
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4">
          <h2 className="text-xl font-semibold mb-4">
            13. LIMITATION OF LIABILITY
          </h2>
          <p>
            13.1. To the fullest extent permitted by law, Evaga shall not be
            liable for any:
          </p>
          <ul className="list-disc pl-8">
            <li>Indirect, incidental, or consequential damages.</li>
            <li>Losses due to vendor service failures.</li>
            <li>Technical disruptions or system failures.</li>
          </ul>
        </section>

        <section className="border-b border-gray-400 pb-4">
          <h2 className="text-xl font-semibold mb-4">14. INDEMNIFICATION</h2>
          <p>
            14.1. Users agree to indemnify and hold Evaga harmless from any
            claims, damages, losses, or liabilities arising from:
          </p>
          <ul className="list-disc pl-8">
            <li>Violation of these Terms.</li>
            <li>Misuse of the Platform.</li>
            <li>Third-party disputes.</li>
          </ul>
        </section>

        <section className="border-b border-gray-400 pb-4">
          <h2 className="text-xl font-semibold mb-4">
            15. TERMINATION OF ACCESS
          </h2>
          <p>
            15.1. Evaga reserves the right to suspend or terminate user access
            for any breach of these Terms, fraudulent activity, or misuse of the
            Platform.
          </p>
          <br />
          <p>
            15.2. Termination shall not affect any accrued rights or obligations
            prior to termination.
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4">
          <h2 className="text-xl font-semibold mb-4">16. GENERAL PROVISIONS</h2>
          <p>
            16.1. Severability: If any provision of these Terms is found to be
            unenforceable, the remaining provisions shall remain in full effect.
          </p>
          <br />
          <p>
            16.2. Non-Waiver: Failure to enforce any right under these Terms
            shall not constitute a waiver of such rights.
          </p>
          <br />
          <p>
            16.3. Modifications: Evaga may update these Terms from time to time.
            Continued use of the Platform constitutes acceptance of the modified
            Terms.
          </p>
        </section>

        <section className="border-b border-gray-400 pb-4">
          <p>
            By using the Evaga Platform, you acknowledge that you have read,
            understood, and agreed to these Terms and Conditions. If you have
            any questions, please contact us at info@evagaentertainment.com
          </p>
        </section>
      </div>
    </motion.div>
  );
}

export default TermsAndConditions;
