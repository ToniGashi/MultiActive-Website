"use client";

import { TelephoneIcon } from "@/public/TelephoneIcon";
import { MessageIcon } from "@/public/MessageIcon";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schemas
const partnerFormSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required"),
  contactPerson: Yup.string().required("Contact person is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  businessType: Yup.string().required("Business type is required"),
  message: Yup.string().required("Message is required"),
});

const clientFormSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  serviceInterest: Yup.string().required("Service interest is required"),
  message: Yup.string().required("Message is required"),
});

export default function Page() {
  const [activeTab, setActiveTab] = useState<"partner" | "client">("partner");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [partnerMessage, setPartnerMessage] = useState("");
  const [partnerError, setPartnerError] = useState("");
  const [clientMessage, setClientMessage] = useState("");
  const [clientError, setClientError] = useState("");

  const handlePartnerSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    setIsSubmitting(true);
    try {
      setPartnerMessage("");
      setPartnerError("");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "partner",
          formData: values,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPartnerMessage(result.message);
        resetForm();
      } else {
        setPartnerError(
          result.error ||
            "There was an error submitting the form. Please try again."
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      setPartnerError(
        "There was an error submitting the form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClientSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    setIsSubmitting(true);
    try {
      setClientMessage("");
      setClientError("");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "client",
          formData: values,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setClientMessage(result.message);
        resetForm();
      } else {
        setClientError(
          result.error ||
            "There was an error submitting the form. Please try again."
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      setClientError(
        "There was an error submitting the form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 px-4 sm:px-8 lg:px-16 py-8">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-medium text-[#676D73] mb-4">
          Si mund t'ju ndihmojmë?
        </h1>
        <p className="text-base text-[#676D73] max-w-2xl">
          Keni ndonjë pyetje ose sugjerim? Ju lutem na kontaktoni në metodat e
          kontaktit më poshtë edhe do perpiqemi t'ju pergjigjemi sa më shpejtë
          të jetë e mundur.
        </p>
      </div>

      {/* Contact Forms Section */}
      <div className="w-full">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("partner")}
            className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === "partner"
                ? "bg-primary text-white"
                : "text-[#676D73] hover:text-primary hover:bg-gray-50"
            }`}
          >
            Become a Partner
          </button>
          <button
            onClick={() => setActiveTab("client")}
            className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === "client"
                ? "bg-primary text-white"
                : "text-[#676D73] hover:text-primary hover:bg-gray-50"
            }`}
          >
            Potential Client
          </button>
        </div>

        {/* Partner Form */}
        {activeTab === "partner" && (
          <div className="space-y-6 bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
            <div>
              <h2 className="text-2xl font-medium text-white mb-3">
                Partner Application
              </h2>
              <p className="text-base text-gray-300">
                Interested in partnering with us? Fill out the form below and
                we'll get back to you.
              </p>
            </div>

            <Formik
              initialValues={{
                companyName: "",
                contactPerson: "",
                email: "",
                phone: "",
                businessType: "",
                message: "",
              }}
              validationSchema={partnerFormSchema}
              onSubmit={handlePartnerSubmit}
            >
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Company Name *
                    </label>
                    <Field
                      type="text"
                      id="companyName"
                      name="companyName"
                      className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                      placeholder="Enter company name"
                    />
                    <ErrorMessage
                      name="companyName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contactPerson"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Contact Person *
                    </label>
                    <Field
                      type="text"
                      id="contactPerson"
                      name="contactPerson"
                      className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                      placeholder="Enter contact person name"
                    />
                    <ErrorMessage
                      name="contactPerson"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Email *
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                      placeholder="Enter email address"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Phone *
                    </label>
                    <Field
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                      placeholder="Enter phone number"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="businessType"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Business Type *
                  </label>
                  <Field
                    as="select"
                    id="businessType"
                    name="businessType"
                    className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-800/50 text-white"
                  >
                    <option value="" className="bg-gray-800 text-white">
                      Select business type
                    </option>
                    <option value="fitness" className="bg-gray-800 text-white">
                      Fitness Center
                    </option>
                    <option value="spa" className="bg-gray-800 text-white">
                      Spa & Wellness
                    </option>
                    <option value="yoga" className="bg-gray-800 text-white">
                      Yoga Studio
                    </option>
                    <option value="sports" className="bg-gray-800 text-white">
                      Sports Facility
                    </option>
                    <option value="other" className="bg-gray-800 text-white">
                      Other
                    </option>
                  </Field>
                  <ErrorMessage
                    name="businessType"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message *
                  </label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400 resize-none"
                    placeholder="Tell us about your business and partnership goals"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {partnerMessage && (
                  <div className="text-green-600 bg-green-50 p-4 rounded-lg border border-green-200">
                    {partnerMessage}
                  </div>
                )}
                {partnerError && (
                  <div className="text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
                    {partnerError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-4 px-8 rounded-xl border-2 border-primary hover:bg-primary/90 hover:border-primary/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg hover:shadow-xl active:scale-95"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Submit Partner Application"}
                </button>
              </Form>
            </Formik>
          </div>
        )}

        {/* Client Form */}
        {activeTab === "client" && (
          <div className="space-y-6 bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
            <div>
              <h2 className="text-2xl font-medium text-white mb-3">
                Service Inquiry
              </h2>
              <p className="text-base text-gray-300">
                Interested in our services? Fill out the form below and we'll
                contact you with more information.
              </p>
            </div>

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                serviceInterest: "",
                message: "",
              }}
              validationSchema={clientFormSchema}
              onSubmit={handleClientSubmit}
            >
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      First Name *
                    </label>
                    <Field
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                      placeholder="Enter first name"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Last Name *
                    </label>
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                      placeholder="Enter last name"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Email *
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                      placeholder="Enter email address"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Phone *
                    </label>
                    <Field
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400"
                      placeholder="Enter phone number"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="serviceInterest"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Service Interest *
                  </label>
                  <Field
                    as="select"
                    id="serviceInterest"
                    name="serviceInterest"
                    className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-800/50 text-white"
                  >
                    <option value="" className="bg-gray-800 text-white">
                      Select service of interest
                    </option>
                    <option value="fitness" className="bg-gray-800 text-white">
                      Fitness & Training
                    </option>
                    <option value="spa" className="bg-gray-800 text-white">
                      Spa & Wellness
                    </option>
                    <option value="yoga" className="bg-gray-800 text-white">
                      Yoga & Meditation
                    </option>
                    <option value="sports" className="bg-gray-800 text-white">
                      Sports & Recreation
                    </option>
                    <option
                      value="membership"
                      className="bg-gray-800 text-white"
                    >
                      Membership Plans
                    </option>
                    <option value="other" className="bg-gray-800 text-white">
                      Other
                    </option>
                  </Field>
                  <ErrorMessage
                    name="serviceInterest"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message *
                  </label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-800/50 text-white placeholder-gray-400 resize-none"
                    placeholder="Tell us about your needs and questions"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {clientMessage && (
                  <div className="text-green-600 bg-green-50 p-4 rounded-lg border border-green-200">
                    {clientMessage}
                  </div>
                )}
                {clientError && (
                  <div className="text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
                    {clientError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-4 px-8 rounded-xl border-2 border-primary hover:bg-primary/90 hover:border-primary/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg hover:shadow-xl active:scale-95"
                >
                  {isSubmitting ? "Submitting..." : "Submit Service Inquiry"}
                </button>
              </Form>
            </Formik>
          </div>
        )}
      </div>

      <hr className="border-gray-200" />

      {/* Contact Information Section */}
      <div className="flex flex-col md:flex-row items-center justify-around gap-8">
        <div className="flex gap-4 items-center">
          <div className="h-min rounded-full bg-primary/[0.10] p-4">
            <TelephoneIcon color={"text-primary"} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium text-primary">
              Na shkruani ose telefononi
            </p>
            <p className="text-sm text-[#676D73]">
              Ky është numri ynë i telefonit: 069213111
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="h-min rounded-full bg-primary/[0.10] p-4">
            <MessageIcon color={"text-primary"} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium text-primary">
              Na shkruani në email
            </p>
            <p className="text-sm text-[#676D73]">
              Ky është emaili yne: toni@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
