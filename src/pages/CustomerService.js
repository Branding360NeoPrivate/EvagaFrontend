import React, { useState } from "react";
import AccordionCard from "../components/Cards/AccordionCard";
import { Link } from "react-router-dom";
import NonOrderRelatedQuery from "../components/Cards/NonOrderRelatedQuery";
import useServices from "../hooks/useServices";
import commonApis from "../services/commonApis";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
function CustomerService() {
  const [activeTab, setActiveTab] = useState("faq");
  const [expanded, setExpanded] = useState(null);
  const userId = Cookies.get("userId");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };
  const email = "info@evagaentertainment.com";
  const subject = "Support Request";
  const body = "Hello Support Team,\n\nI need assistance with...";

  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const faqData = [
    {
      question: "What is Evaga Entertainment?",
      answer:
        "Evaga Entertainment is an online marketplace that connects customers with the best event vendors and services. Whether you're planning a wedding, corporate event, birthday, or any special occasion, we help you find the right professionals to bring your event to life.",
    },
    {
      question: "How does Evaga Entertainment work?",
      answer:
        "Evaga allows you to browse and book vendors across various event categories. Simply search for the service you need, compare options, and book directly through our platform.",
    },
    {
      question: "Is Evaga Entertainment free to use?",
      answer:
        "Yes! Browsing and exploring vendors is completely free. You only pay for the services you book.",
    },
    {
      question: "What types of events does Evaga cover?",
      answer:
        "Evaga Entertainment caters to personal and corporate events, including weddings, birthdays, corporate functions, concerts, exhibitions, and more.",
    },
    {
      question: "How do I book a vendor?",
      answer:
        "To book a vendor: \n● Browse available vendors for your event category. \n● Compare profiles, services, and pricing. \n● Click 'Book Now' and follow the steps to confirm your reservation.",
    },
    {
      question: "How do payments work?",
      answer:
        "We currently offer all major payment channels, including: \n● Cards (Credit/Debit) \n● UPI \n● Wallets \n● Net Banking \nNote: We only accept online payments—Cash on Delivery (COD) is not available.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, cancellation policies vary by vendor. Please check our Cancellation Policy before making a booking.",
    },
    {
      question: "Are there any additional charges?",
      answer:
        "Evaga is a fully transparent platform, redefining how India plans and executes events. Before making the full payment, you will receive a complete cost breakdown, ensuring there are no hidden charges.",
    },
    {
      question:
        "I need a package, not an individual service. How can I book one?",
      answer:
        "If you need a customized event package: \n● Contact our team, and we’ll curate the best package based on your budget and requirements. \n● We are also launching Auto-Built Packages and AI-Enabled Event Packages soon to make planning even easier!",
    },
    {
      question: "How do I know if a vendor is reliable?",
      answer:
        "We thoroughly verify our vendors and feature customer reviews and ratings to help you make an informed decision.",
    },
    {
      question: "What if I need multiple services for my event?",
      answer:
        "You can book multiple vendors across different categories to ensure all your event needs are met.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach out to us via: \n● Email: info@evagaentertainment.com \n● Phone: +91 82961 57611 \n● Live Chat: Available on our website",
    },
    {
      question: "What if a vendor cancels my booking?",
      answer:
        "In case of a vendor cancellation, we will assist you in finding an alternative vendor or provide a full refund as per the vendor’s cancellation policy.",
    },
    {
      question: "Can I leave a review after my event?",
      answer:
        "Yes! We encourage customers to share their experiences to help others make informed decisions.",
    },
  ];

  const CreateQueryApi = useServices(commonApis.CreateQuery);
  const CreateQueryApiHandle = async (data) => {
    if (!userId) {
      toast.warn("Please log in to create a query.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("role", "Venders");
      formData.append("subject", data?.subject);
      formData.append("query", data?.query);

      const response = await CreateQueryApi.callApi(formData);

      if (response) {
        toast.success("Query Submitted successfully!");
      } else {
        toast.error("Failed to create query. Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-start justify-between px-[2%] py-[2%] w-full">
      <div className="flex-[0.28] flex flex-col gap-2">
        <h3 className="text-primary text-xl font-semibold">Evaga Support</h3>
        <hr />
        {/* <p
          className={
            activeTab === "orderRelQry"
              ? "text-primary cursor-pointer font-medium"
              : "text-textGray cursor-pointer font-medium"
          }
          onClick={() => setActiveTab("orderRelQry")}
        >
          Order Related Query
        </p>{" "} */}
        <p
          className={"text-textGray cursor-pointer font-medium"}
          // onClick={() => setActiveTab("orderRelQry")}
        >
          <Link
            to={"https://whatsapp.com/channel/0029VaWXX585fM5adzGAzC1C"}
            target="_blank"
          >
            Whatsapp Support
          </Link>
        </p>{" "}
        <p
          className={"text-textGray cursor-pointer font-medium"}
          onClick={() => window.open(gmailLink, "_blank")}
        >
          Email Support
        </p>{" "}
        <p
          className={"text-textGray cursor-pointer font-medium"}
          onClick={() => (window.location.href = "tel:+918296157611")}
        >
          Click To Call
        </p>
        <p
          className={
            activeTab === "nonOrderRelQry"
              ? "text-primary cursor-pointer font-medium"
              : "text-textGray cursor-pointer font-medium"
          }
          onClick={() => setActiveTab("nonOrderRelQry")}
        >
          Send Your Query
        </p>
        <hr />
        <p
          className={
            activeTab === "faq"
              ? "text-primary cursor-pointer font-medium"
              : "text-textGray cursor-pointer font-medium"
          }
          onClick={() => setActiveTab("faq")}
        >
          Frequently Asked Questions(FAQs)
        </p>
      </div>
      <div className="flex-[0.67]">
        {activeTab === "nonOrderRelQry" && (
          <NonOrderRelatedQuery saveForm={CreateQueryApiHandle} />
        )}
        {activeTab === "faq" &&
          faqData?.map((item, index) => (
            <AccordionCard
              key={index}
              title={item.question}
              summary={item.answer}
              isExpanded={expanded === index}
              onToggle={handleChange(index)}
              panelId={index}
              sn={index + 1}
            />
          ))}
      </div>
    </div>
  );
}

export default CustomerService;
