import React, { useState, useRef } from "react";
import { Modal, Box, Typography, Checkbox, Button } from "@mui/material";
import useServices from "../../hooks/useServices";
import Cookies from "js-cookie";
import vendorApi from "../../services/vendorApi";
import { toast } from "react-toastify";
const TermsModal = ({ open, handleClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    bgcolor: "background.paper",
    border: "2px solid transparent",
    outline: "2px solid transparent",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
  };
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const scrollContainerRef = useRef(null);
  const acceptTermsAndCondition = useServices(
    vendorApi.vendorAcceptTermsAndcondition
  );
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const isBottom =
        Math.round(container.scrollTop + container.clientHeight) >=
        container.scrollHeight;
      setIsAtBottom(isBottom);
    }
  };

  const handleCheckboxChange = (event) => {
    console.log(event.target.checked)
    setIsChecked(event.target.checked);
  };
  const handleAcceptTermsAndConditions = async () => {
    try {
      const userId = Cookies.get("userId");
      const response = await acceptTermsAndCondition.callApi(userId);
      console.log(response, "response");
      toast.success(response?.message);
    } catch (error) {
      toast.error("Failed to Get Form Value. Please try again.");
    }
  };

  return (
    <Modal open={open}>
      <Box sx={style} className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%]">
        <h1
          variant="h6"
          gutterBottom
          className="font-bold text-xl text-primary py-1"
        >
          Vendor Terms and Conditions
        </h1>
        <Box
          ref={scrollContainerRef}
          onScroll={handleScroll}
          sx={{
            overflowY: "auto",
            maxHeight: "350px",
            p: 2,
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <div className="flex flex-col h-screen my-2">
            <main className="flex-grow  p-2 space-y-4">
              <p className="text-textGray">
                <strong className="text-primary font-bold text-xl">
                  Effective Date:
                </strong>{" "}
                The date of e-signature by the Vendor (selecting "I Agree" or
                "Submit" constitutes acceptance).
              </p>
              <p className="text-textGray">
                Welcome to Evaga Entertainment Pvt. Ltd. ("Evaga," "we," or
                "us"). By registering as a vendor and using our platform, you
                ("Vendor," "you," or "your") agree to abide by the following
                Terms and Conditions. Acceptance of these terms is mandatory for
                maintaining your profile on the Evaga platform. Please read them
                carefully.
              </p>
              {/* Section 1 */}
              <section className=" rounded-md text-textGray">
                <h2 className="text-xl font-bold mb-2 text-primary">
                  1. Registration and Vendor Responsibilities
                </h2>
                <ul className=" ml-1 text-textGray space-y-2">
                  <li>
                    1.1 You must provide accurate, complete, and up-to-date
                    information during the registration process.
                  </li>
                  <li>
                    1.2 You are responsible for the accuracy and authenticity of
                    the services, pricing, and other information listed on your
                    profile.
                  </li>
                  <li>
                    1.3 Vendors must have all necessary licenses, permits, and
                    approvals required to provide the services listed on the
                    platform.
                  </li>
                  <li>
                    1.4 Vendors are prohibited from:
                    <ul className="list-disc ml-6">
                      <li>Misrepresenting their services.</li>
                      <li>
                        Sharing offensive, defamatory, or inappropriate content.
                      </li>
                      <li>Engaging in fraudulent activities.</li>
                    </ul>
                  </li>
                  <li>
                    Vendors must maintain professionalism and decorum when
                    interacting with customers and clients.
                  </li>
                </ul>
              </section>
              <hr style={{ borderTop: "2px solid #ccc" }} />
              <section className=" ">
                <h2 className="text-xl text-primary font-bold mb-2">
                  2. Service Fulfilment
                </h2>
                <ul className=" ml-1 text-textGray space-y-2">
                  <li>
                    2.1 Vendors are obligated to deliver services as promised,
                    adhering to the agreed-upon terms with customers.
                  </li>
                  <li>
                    2.2 Timely communication with customers and Evaga is
                    mandatory to ensure a seamless event experience.
                  </li>
                  <li>
                    2.3 Evaga reserves the right to take appropriate action,
                    including but not limited to removing your profile, for
                    repeated customer complaints or non-compliance with
                    commitments.
                  </li>
                </ul>
              </section>
              <hr style={{ borderTop: "2px solid #ccc" }} />
              <section className=" ">
                <h2 className="text-xl text-primary font-bold mb-2">
                  3. Fees and Payments
                </h2>
                <ul className=" ml-1 text-textGray space-y-2">
                  <li>
                    3.1 Vendors agree to a commission structure where Evaga will
                    deduct 12% of the payment received from customers for the
                    services or products listed on the platform. Additionally,
                    2% will be deducted for payment gateway charges if incurred
                    by Evaga.
                  </li>
                  <li>
                    3.2 Payments from customers will be made directly to Evaga.
                    After deducting the commission, applicable payment gateway
                    fees, TDS, and GST (if applicable), the remaining amount
                    will be transferred to the Vendor via net banking.
                  </li>
                  <li>
                    3.3 Payments will be structured as follows:
                    <ul className="list-disc ml-6">
                      <li>
                        Advance Payment: 20% to 50% of the payment will be
                        released as an advance before the service date.
                      </li>
                      <li>
                        Final Payment: The remaining amount will be disbursed to
                        the Vendor after successful completion of the service.
                      </li>
                    </ul>
                  </li>
                  <li>
                    3.4 In case of a refund, Vendors must return the refunded
                    amount to Evaga within two (2) days of receiving a
                    notification of refund.
                  </li>
                  <li>
                    3.5 Vendors have the flexibility to adjust their service
                    pricing based on seasonality and demand trends.
                  </li>
                  <li>
                    3.6 Evaga offers optional premium features such as top
                    listings or e-banner advertisements for an additional fee.
                  </li>
                  <li>
                    3.7 Any payment disputes must be reported to Evaga within
                    seven (7) days of receiving the payment to initiate
                    resolution.
                  </li>
                </ul>
              </section>
              <hr style={{ borderTop: "2px solid #ccc" }} />
              <section className=" ">
                <h2 className="text-xl text-primary font-bold mb-2">
                  4. Content Usage and Promotion
                </h2>
                <ul className=" ml-1 text-textGray space-y-2">
                  <li>
                    4.1 Vendors grant Evaga the right to use their photos,
                    videos, and other promotional content on various platforms,
                    including but not limited to the web app, mobile app, and
                    social media channels such as Instagram, Facebook, Twitter,
                    and LinkedIn.
                  </li>
                  <li>
                    4.2 Evaga reserves the right to shoot videos or photos of
                    Vendor services and use them for promotional purposes on our
                    platform.
                  </li>
                  <li>
                    4.3 Vendors agree that Evaga may use their content without
                    additional compensation, except where explicitly agreed
                    otherwise.
                  </li>
                  <li>
                    4.4 Evaga may charge Vendors for premium promotional
                    features, including but not limited to featured listings and
                    e-banners.
                  </li>
                </ul>
              </section>
              <hr style={{ borderTop: "2px solid #ccc" }} />
              <section className=" ">
                <h2 className="text-xl text-primary font-bold mb-2">
                  5. Compliance with Laws
                </h2>
                <ul className=" ml-1 text-textGray space-y-2">
                  <li>
                    5.1 Vendors must comply with all applicable local, state,
                    and national laws, including but not limited to tax laws,
                    labour laws, and safety regulations.
                  </li>
                  <li>
                    5.2 Vendors are solely responsible for ensuring the legality
                    of their operations and services offered on the platform.
                  </li>
                </ul>
              </section>
              <hr style={{ borderTop: "2px solid #ccc" }} />
              <section className=" ">
                <h2 className="text-xl text-primary font-bold mb-2">
                  6. Liability and Indemnification
                </h2>
                <ul className=" ml-1 text-textGray space-y-2">
                  <li>
                    6.1 Evaga is not responsible for any damages, losses, or
                    liabilities arising from services provided by Vendors.
                  </li>
                  <li>
                    6.2 Evaga has no responsibility for any mishaps or incidents
                    occurring at the event from either the Vendor’s side or the
                    customer/client’s side, as we act solely as a platform
                    connecting the final customer and the service provider.
                  </li>
                  <li>
                    6.3 Vendors agree to indemnify and hold harmless Evaga, its
                    employees, directors, and affiliates from any claims,
                    damages, or expenses resulting from their actions or
                    omissions.
                  </li>
                </ul>
              </section>
              <hr style={{ borderTop: "2px solid #ccc" }} />
              <section className=" ">
                <h2 className="text-xl text-primary font-bold mb-2">
                  7. Profile Suspension or Termination
                </h2>
                <ul className=" ml-1 text-textGray space-y-2">
                  <li>
                    7.1 Evaga reserves the right to suspend or terminate a
                    Vendor’s profile for reasons including but not limited to
                    breach of these Terms and Conditions, misconduct, fraudulent
                    activity, non-compliance with applicable laws, or repeated
                    customer complaints. Prior to suspension or termination,
                    Evaga will provide the Vendor with a written notice
                    outlining the reason(s) for the action and will offer a
                    reasonable period (typically 7 days) for the Vendor to
                    resolve the issue or present their case. If the issue is not
                    resolved satisfactorily, Evaga may proceed with the
                    suspension or termination of the Vendor’s profile. In the
                    case of termination, the Vendor must fulfill any outstanding
                    commitments and resolve any pending disputes with customers
                    before the profile can be fully deactivated.
                  </li>
                  <li>
                    7.2 Vendors may terminate their profile by providing written
                    notice to Evaga. Termination does not absolve the Vendor
                    from fulfilling prior commitments or resolving outstanding
                    disputes.
                  </li>
                </ul>
              </section>
              <hr style={{ borderTop: "2px solid #ccc" }} />
              <section className=" ">
                <h2 className="text-xl text-primary font-bold mb-2">
                  8. Dispute Resolution
                </h2>
                <ul className=" ml-1 text-textGray space-y-2">
                  <li>
                    8.1 Evaga will mediate disputes between Vendors and
                    customers in good faith to attempt to resolve any issues
                    related to service delivery, payment, or other contractual
                    matters. Should mediation fail to resolve the dispute to the
                    satisfaction of both parties, the dispute may be escalated
                    to a formal arbitration process. Arbitration will be
                    conducted in accordance with the rules of the Indian
                    Arbitration and Conciliation Act, and the decision of the
                    arbitrator will be binding on both parties. Any arbitration
                    proceedings shall take place in Bangalore, Karnataka, India,
                    unless otherwise agreed upon.
                  </li>
                </ul>
              </section>
              <hr style={{ borderTop: "2px solid #ccc" }} />
              <section className=" ">
                <h2 className="text-xl text-primary font-bold mb-2">
                  9. Modifications to Terms
                </h2>
                <ul className=" ml-1 text-textGray space-y-2">
                  <li>
                    9.1 Evaga reserves the right to update or modify these Terms
                    and Conditions at any time. Vendors will be notified of
                    significant changes via email or platform notification.
                    Continued use of the platform after such notification
                    constitutes acceptance of the updated terms.
                  </li>
                </ul>
              </section>
              <hr style={{ borderTop: "2px solid #ccc" }} />
              <section className=" ">
                <h2 className="text-xl text-primary font-bold mb-2">
                  10. Governing Law
                </h2>
                <ul className=" ml-1 text-textGray space-y-2">
                  <li>
                    10.1 These Terms and Conditions shall be governed by and
                    construed in accordance with the laws of India. Any disputes
                    arising under these terms shall be subject to the exclusive
                    jurisdiction of the courts located in Bangalore, Karnataka,
                    India.
                  </li>
                </ul>
              </section>
              <hr style={{ borderTop: "2px solid #ccc" }} />
              <section className=" ">
                <h2 className="text-xl text-primary font-bold mb-2">
                  11. Force Majeure
                </h2>
                <ul className=" ml-1 text-textGray space-y-2">
                  <li>
                    11.1 Definition of Force Majeure: Neither party shall be
                    held liable for any failure or delay in performance of their
                    obligations under these Terms and Conditions if such failure
                    or delay is caused by events beyond their reasonable
                    control, including, but not limited to, natural disasters,
                    acts of government, war, terrorism, pandemics, civil
                    disturbances, strikes, supply chain disruptions, or other
                    unforeseeable events that prevent the party from performing
                    their obligations.
                  </li>
                  <li>
                    11.2 Notice of Force Majeure: The affected party must notify
                    the other party in writing as soon as possible after the
                    occurrence of a force majeure event, describing the nature
                    and anticipated duration of the event.
                  </li>
                  <li>
                    11.3 Mitigation of Impact: Both parties agree to take all
                    reasonable steps to mitigate the impact of the force majeure
                    event and resume their obligations as soon as reasonably
                    possible.
                  </li>
                  <li>
                    11.4 Termination of Agreement: If the force majeure event
                    persists for more than 30 days, either party may terminate
                    the agreement with written notice, without any further
                    liability.
                  </li>
                </ul>
              </section>
              <hr style={{ borderTop: "2px solid #ccc" }} />
              <section className=" ">
                <h2 className="text-xl text-primary font-bold mb-2">
                  12. Vendor Support
                </h2>
                <ul className=" ml-1 text-textGray space-y-2">
                  <li>
                    12.1 Vendor Support Services: Evaga will provide ongoing
                    support to vendors through various channels, including
                    email, phone, and the vendor dashboard on the platform.
                  </li>
                  <li>
                    12.2 Response Time: Evaga aims to respond to support
                    inquiries within 48 hours of receipt. For urgent matters,
                    vendors should contact the support team via phone, email, or
                    chat.
                  </li>
                  <li>
                    12.3 Support Scope: Evaga will assist in mediating disputes
                    between Vendors and customers related to service quality,
                    delays, cancellations, and any issues that arise during or
                    after the event. The platform will provide a neutral and
                    objective approach to resolving these disputes. However,
                    Evaga will not assume liability for the outcome of the
                    dispute, as our role is limited to facilitating
                    communication and providing guidance. In cases of unresolved
                    disputes, Evaga may recommend alternative dispute resolution
                    methods but is not obligated to enforce any final
                    resolutions.
                  </li>
                  <li>
                    12.4 Availability: Vendor support is available during
                    regular business hours, from 9:00 AM to 6:00 PM, Monday to
                    Saturday. Our support team will not be available on public
                    holidays. Evaga will inform vendors of any planned service
                    disruptions or updates in advance.
                  </li>
                </ul>
              </section>
              <hr style={{ borderTop: "2px solid #ccc" }} />
            </main>
          </div>
        </Box>
        <div className="flex items-center justify-start gap-1 py-2">
          <Checkbox
            checked={isChecked}
            disabled={!isAtBottom}
            onChange={handleCheckboxChange}
            sx={{
              width: 24, // Adjust as needed
              height: 24, // Adjust as needed
              padding: 0, // Remove default padding
            }}
           
          />
          <p className="text-sm text-textGray">
            By selecting "I Agree" or "Submit," you acknowledge that you have
            read, understood, and agree to abide by these Terms and Conditions.
            Failure to accept or comply with these terms will result in the
            suspension or termination of your vendor profile.
          </p>
        </div>

        <button
          variant="contained"
          disabled={!isChecked}
          onClick={() => {
            handleAcceptTermsAndConditions();
            handleClose();
          }}
          sx={{ mt: 2 }}
          className="btn-primary px-2 w-fit"
        >
          Accept
        </button>
      </Box>
    </Modal>
  );
};

export default TermsModal;
