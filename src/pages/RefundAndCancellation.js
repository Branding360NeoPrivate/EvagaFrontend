import React from "react";
import { motion } from "framer-motion";
function RefundAndCancellation() {
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
        Refund & Cancellation Policy
      </h1>
      <p className="text-textGray font-semibold mb-4">
        Last updated on Feb 07th 2025
      </p>
      <p className="text-textGray mb-4">
        At Evaga Entertainment, we strive to provide a seamless and enjoyable
        event planning experience. However, we understand that unforeseen
        circumstances may arise, necessitating cancellations or refunds. This
        policy outlines our approach to cancellations, refunds, and rescheduling
        to ensure fairness to both customers and vendors.
      </p>

      <div className="space-y-6 text-textGray">
        <section className="pb-4">
          <h2 className="text-xl font-semibold mb-4">
            1. General Cancellation Policy
          </h2>
          <ul className="list-disc pl-10">
            <li>
              Cancellations must be made in writing via email to
              info@evagaentertainment.com with the booking details.
            </li>
            <li>
              The refund eligibility depends on the type of service booked and
              the time of cancellation prior to the event date.
            </li>
            <li>
              A cancellation request will only be processed if it adheres to the
              timeline and terms specified below.
            </li>
            <li>
              A processing fee of 5% will be deducted from all refunds and
              rescheduling to cover administrative costs.
            </li>
          </ul>
        </section>

        <section className="pb-4">
          <h2 className="text-xl font-semibold mb-4">
            2. Cancellation & Refund Structure
          </h2>
          <p>
            For <strong>Vendor-Provided Services</strong>
          </p>
          <ul className="list-disc pl-10">
            <li>More than 30 days before the event: 100% refund</li>
            <li>15-30 days before the event: 75% refund</li>
            <li>7-14 days before the event: 60% refund</li>
            <li>
              Less than 7 days but before 48 hours of the event: 25% refund
            </li>
            <li>Less than 48 hours before the event: No refund</li>
          </ul>
        </section>

        <section className="pb-4">
          <h2 className="text-xl font-semibold mb-4">3. For Venue Bookings</h2>
          <ul className="list-disc pl-10">
            <li>More than 60 days before the event: 80% refund</li>
            <li>30-60 days before the event: 50% refund</li>
            <li>Less than 30 days before the event: No refund</li>
          </ul>
        </section>

        <section className="pb-4">
          <h2 className="text-xl font-semibold mb-4">
            4. Short Notice Cancellation
          </h2>
          <ul className="list-disc pl-10">
            <li>
              If a booking is made within 7 days of the scheduled service date,
              it will be considered a short-notice booking.
            </li>
            <li>
              If canceled before 48 hours of the event date, 50% of the amount
              will be refunded.
            </li>
            <li>
              If canceled within 48 hours of the event date, no refund will be
              provided.
            </li>
            <li>
              Rescheduling requests for short-notice bookings will be subject to
              vendor approval and may incur additional charges.
            </li>
            <li>
              A non-refundable deposit of 10% will apply to all short-notice
              bookings.
            </li>
          </ul>
        </section>

        <section className="pb-4">
          <h2 className="text-xl font-semibold mb-4">5. Rescheduling Policy</h2>
          <ul className="list-disc pl-10">
            <li>
              Requests for rescheduling must be made at least 15 days prior to
              the event.
            </li>
            <li>
              Rescheduling is subject to vendor availability and may involve
              additional charges.
            </li>
            <li>
              If rescheduling is not feasible, the cancellation policy will
              apply
            </li>
          </ul>
        </section>

        <section className="pb-4">
          <h2 className="text-xl font-semibold mb-4">
            6. Force Majeure & Exceptional Cases
          </h2>
          <ul className="list-disc pl-10">
            <li>
              If an event is canceled due to unforeseen circumstances beyond
              control (natural disasters, pandemics, government restrictions),
              Evaga Entertainment will work with vendors to facilitate
              rescheduling or offer partial refunds based on vendor policies.
            </li>
            <li>
              Refunds or credits will be provided on a case-by-case basis after
              discussion with all involved parties.
            </li>
            <li>
              Customers may be eligible for a 10-15% refund even for
              cancellations within 48 hours due to extreme emergencies (medical,
              legal, etc.), subject to verification.
            </li>
          </ul>
        </section>

        <section className="pb-4">
          <h2 className="text-xl font-semibold mb-4">
            7. Vendor-Initiated Cancellations
          </h2>
          <ul className="list-disc pl-10">
            <li>
              If a vendor cancels a service, Evaga Entertainment will either:
            </li>
            <ul className="list-[square] pl-10">
              <li>Offer a full refund.</li>
              <li>
                Arrange a replacement vendor of similar quality and pricing
              </li>
            </ul>
            <li>
              In cases where replacement services are provided, no additional
              refund will be issued.
            </li>
          </ul>
        </section>

        <section className="pb-4">
          <h2 className="text-xl font-semibold mb-4">8. Refund Processing</h2>
          <ul className="list-disc pl-10">
            <li>
              Approved refunds will be processed within 5-7 business days.
            </li>
            <li>
              Refunds will be issued to the original payment method used at the
              time of booking.
            </li>
            <li>
              Evaga Entertainment is not responsible for delays due to bank
              processing times.
            </li>
          </ul>
        </section>

        <section className="pb-4">
          <h2 className="text-xl font-semibold mb-4">9. Contact & Support</h2>
          <ul className="list-disc pl-10">
            <li>
              For any queries related to cancellations or refunds, please
              contact our support team at:
            </li>
            <ul className="list-[square] pl-10">
              <li>
                <b>Email:</b> info@evagaentertainment.com
              </li>
              <li>
                <b>Helpline:</b> +91 8296157611 (Available 10 AM – 7 PM IST)
              </li>
            </ul>
          </ul>
        </section>

        <section className="pb-4">
          <h2 className="text-xl font-semibold mb-4">
            10. Refund & Cancellation Policy for Partial Payments
          </h2>
          <ul className="list-disc pl-10">
            <li>For cancellations before the final payment is made:</li>
            <ul className="list-[square] pl-10">
              <li>
                The refund will be calculated based on the total booking value,
                and any deduction will be made from the amount already paid.
              </li>
            </ul>
            <li>For cancellations after full payment:</li>
            <ul className="list-[square] pl-10">
              <li>The standard refund policy applies.</li>
            </ul>
            <li>Processing Fee: A 5% fee will be deducted from all refunds.</li>
            <li>
              Rescheduling: Customers can reschedule instead of canceling
              (subject to vendor approval), with a nominal fee instead of a full
              deduction.
            </li>
            <li>
              Late payments may attract 3% surcharge or risk booking
              cancellation (based on vendor terms)
            </li>
            <li>
              Gifting and customized memorabilia require full payment at the
              time of booking and are non-refundable due to the nature of
              customization.
            </li>
          </ul>
        </section>
      </div>
    </motion.div>
  );
}

export default RefundAndCancellation;
