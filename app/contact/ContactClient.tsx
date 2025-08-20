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

export default function ContactClient() {
  const [activeTab, setActiveTab] = useState<"partner" | "client">("partner");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [partnerMessage, setPartnerMessage] = useState("");
  const [partnerError, setPartnerError] = useState("");
  const [clientMessage, setClientMessage] = useState("");
  const [clientError, setClientError] = useState("");

  const handlePartnerSubmit = async (
    values: Record<string, string>,
    { resetForm }: { resetForm: () => void }
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
    values: Record<string, string>,
    { resetForm }: { resetForm: () => void }
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
          Si mund t&apos;ju ndihmojmë?
        </h1>
        <p className="text-base text-[#676D73] max-w-2xl">
          Keni ndonjë pyetje ose sugjerim? Ju lutem na kontaktoni në metodat e
          kontaktit më poshtë edhe do perpiqemi t&apos;ju pergjigjemi sa më
          shpejtë të jetë e mundur.
        </p>
      </div>

      {/* Contact Information */}
      <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 sm:gap-8 mb-8">
        <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg border">
          <TelephoneIcon color="text-blue-600" />
          <h3 className="text-lg font-medium text-[#676D73] mb-2">
            Na telefononi
          </h3>
          <p className="text-[#676D73] text-center">
            Jemi këtu për t&apos;ju ndihmuar nga e Hëna deri të Premten, 9:00 -
            17:00
          </p>
          <a
            href="tel:+355123456789"
            className="mt-3 text-blue-600 font-medium hover:text-blue-800"
          >
            +355 123 456 789
          </a>
        </div>

        <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg border">
          <MessageIcon color="text-blue-600" />
          <h3 className="text-lg font-medium text-[#676D73] mb-2">
            Na shkruani
          </h3>
          <p className="text-[#676D73] text-center">
            Dërgoni një email dhe ne do t&apos;ju përgjigjemi brenda 24 orëve.
          </p>
          <a
            href="mailto:info@multiactivecard.com"
            className="mt-3 text-blue-600 font-medium hover:text-blue-800"
          >
            info@multiactivecard.com
          </a>
        </div>
      </div>

      {/* Forms Section */}
      <div className="max-w-6xl mx-auto w-full">
        {/* Tab Navigation */}
        <div className="flex mb-8">
          <button
            onClick={() => setActiveTab("partner")}
            className={`flex-1 py-3 px-6 text-center font-medium border-b-2 transition-colors ${
              activeTab === "partner"
                ? "border-blue-600 text-blue-600 bg-blue-50"
                : "border-gray-200 text-gray-500 hover:text-gray-700"
            }`}
          >
            Bëhu Partner
          </button>
          <button
            onClick={() => setActiveTab("client")}
            className={`flex-1 py-3 px-6 text-center font-medium border-b-2 transition-colors ${
              activeTab === "client"
                ? "border-blue-600 text-blue-600 bg-blue-50"
                : "border-gray-200 text-gray-500 hover:text-gray-700"
            }`}
          >
            Klient
          </button>
        </div>

        {/* Partner Form */}
        {activeTab === "partner" && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Bashkohu me Rrjetin Tonë të Partnerëve
              </h2>
              <p className="text-base text-gray-300">
                Interested in partnering with us? Fill out the form below and
                we&apos;ll get back to you.
              </p>
            </div>

            {partnerMessage && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                {partnerMessage}
              </div>
            )}

            {partnerError && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {partnerError}
              </div>
            )}

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
              {({ isSubmitting: formikSubmitting }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Emri i Kompanisë *
                      </label>
                      <Field
                        type="text"
                        name="companyName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Personi i Kontaktit *
                      </label>
                      <Field
                        type="text"
                        name="contactPerson"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="contactPerson"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email *
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Telefoni *
                      </label>
                      <Field
                        type="tel"
                        name="phone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="businessType"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Lloji i Biznesit *
                      </label>
                      <Field
                        as="select"
                        name="businessType"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Zgjidhni llojin e biznesit</option>
                        <option value="gym">Palestër</option>
                        <option value="spa">Spa</option>
                        <option value="wellness">Qendër Mirëqenie</option>
                        <option value="yoga">Studio Joge</option>
                        <option value="other">Tjetër</option>
                      </Field>
                      <ErrorMessage
                        name="businessType"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Mesazhi *
                      </label>
                      <Field
                        as="textarea"
                        name="message"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Na tregoni më shumë rreth biznesit tuaj dhe pse doni të bashkoheni me ne..."
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting || formikSubmitting}
                      className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting || formikSubmitting
                        ? "Duke dërguar..."
                        : "Dërgo Kërkesën"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}

        {/* Client Form */}
        {activeTab === "client" && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Na Kontaktoni për Shërbimet Tona
              </h2>
              <p className="text-base text-gray-300">
                Interested in our services? Fill out the form below and
                we&apos;ll contact you with more information.
              </p>
            </div>

            {clientMessage && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                {clientMessage}
              </div>
            )}

            {clientError && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {clientError}
              </div>
            )}

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
              {({ isSubmitting: formikSubmitting }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Emri *
                      </label>
                      <Field
                        type="text"
                        name="firstName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Mbiemri *
                      </label>
                      <Field
                        type="text"
                        name="lastName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email *
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Telefoni *
                      </label>
                      <Field
                        type="tel"
                        name="phone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="serviceInterest"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Interesi për Shërbimin *
                      </label>
                      <Field
                        as="select"
                        name="serviceInterest"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Zgjidhni shërbimin</option>
                        <option value="membership">
                          Anëtarësim Multi Active Card
                        </option>
                        <option value="corporate">Shërbime Korporative</option>
                        <option value="personal">Trajnim Personal</option>
                        <option value="wellness">Programe Mirëqenie</option>
                        <option value="other">Tjetër</option>
                      </Field>
                      <ErrorMessage
                        name="serviceInterest"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Mesazhi *
                      </label>
                      <Field
                        as="textarea"
                        name="message"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Na tregoni më shumë rreth nevojave tuaja dhe si mund t'ju ndihmojmë..."
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting || formikSubmitting}
                      className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting || formikSubmitting
                        ? "Duke dërguar..."
                        : "Dërgo Mesazhin"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
}
