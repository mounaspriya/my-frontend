"use client"

import { useState } from "react"

const Workstream02Form = () => {
  const [formData, setFormData] = useState({
    store_url: "",
    store_name: "",
    platform: "",
    product_count: "",
    ssl_certificate: "",
    payment_methods: [],
    security_comments: "",
    // Assessment checks A1-A7
    a1: "",
    a1_comments: "",
    a2: "",
    a2_comments: "",
    a3: "",
    a3_comments: "",
    a4: "",
    a4_comments: "",
    a5: "",
    a5_comments: "",
    a6: "",
    a6_comments: "",
    a7: "",
    a7_comments: "",
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? [...prev[name], value] : prev[name].filter((item) => item !== value),
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Workstream 02 Form Data:", formData)
    alert("Workstream 02 form submitted successfully!")
  }

  const assessmentChecks = ["A1", "A2", "A3", "A4", "A5", "A6", "A7"]
  const paymentMethods = ["Credit Card", "PayPal", "Apple Pay", "Google Pay", "Bank Transfer"]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Workstream 02 - E-commerce Analysis</h2>
        <p className="text-sm text-gray-600">Complete the form below for e-commerce store assessment</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Store Information Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Store URL</label>
              <input
                type="text"
                name="store_url"
                value={formData.store_url}
                onChange={handleChange}
                placeholder="Enter store URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
              <input
                type="text"
                name="store_name"
                value={formData.store_name}
                onChange={handleChange}
                placeholder="Store name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-commerce Platform</label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select an option</option>
                <option value="Shopify">Shopify</option>
                <option value="WooCommerce">WooCommerce</option>
                <option value="Magento">Magento</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Approximate Product Count</label>
              <input
                type="number"
                name="product_count"
                value={formData.product_count}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Payment & Security Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment & Security</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SSL Certificate</label>
              <div className="flex flex-wrap gap-4">
                {["Valid", "Invalid", "Expired"].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="ssl_certificate"
                      value={option}
                      checked={formData.ssl_certificate === option}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Methods Available</label>
              <div className="flex flex-wrap gap-4">
                {paymentMethods.map((method) => (
                  <label key={method} className="flex items-center">
                    <input
                      type="checkbox"
                      name="payment_methods"
                      value={method}
                      checked={formData.payment_methods.includes(method)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm">{method}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Security Comments</label>
              <textarea
                name="security_comments"
                value={formData.security_comments}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter your comments..."
              />
            </div>
          </div>
        </div>

        {/* Assessment Checks Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Checks</h3>
          <div className="space-y-6">
            {assessmentChecks.map((checkId) => (
              <div key={checkId} className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{checkId}</label>
                  <div className="flex space-x-6">
                    {["yes", "no", "na"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name={checkId.toLowerCase()}
                          value={option}
                          checked={formData[checkId.toLowerCase()] === option}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-sm capitalize">{option === "na" ? "N/A" : option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                  <textarea
                    name={`${checkId.toLowerCase()}_comments`}
                    value={formData[`${checkId.toLowerCase()}_comments`]}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Add your comments here..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-8 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors"
          >
            Submit Workstream 02
          </button>
        </div>
      </form>
    </div>
  )
}

export default Workstream02Form
