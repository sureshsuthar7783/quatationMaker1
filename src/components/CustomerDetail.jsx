
function CustomerDetail({
  customer,
  setCustomer,
  onContinue,
  onBack,
}) {
  const handleChange = (field, value) => {
    setCustomer({
      ...customer,
      [field]: value,
    });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white p-6">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold">
          Customer Details
        </h1>

        <p className="text-gray-400 mt-2">
          Enter the customer information for this quotation.
        </p>

        <div className="mt-8 space-y-5">

          {/* Customer Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Customer Name *
            </label>

            <input
              type="text"
              placeholder="John Doe"
              value={customer.name}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
              className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Phone
            </label>

            <input
              type="text"
              placeholder="9876543210"
              value={customer.phone}
              onChange={(e) =>
                handleChange("phone", e.target.value)
              }
              className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="customer@example.com"
              value={customer.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
              className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Address
            </label>

            <textarea
              placeholder="Customer address"
              rows="3"
              value={customer.address}
              onChange={(e) =>
                handleChange("address", e.target.value)
              }
              className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 resize-none"
            />
          </div>

          {/* GST */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              GST Number
            </label>

            <input
              type="text"
              placeholder="GSTIN"
              value={customer.gst}
              onChange={(e) =>
                handleChange("gst", e.target.value)
              }
              className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-3">

            <button
              onClick={onBack}
              className="flex-1 border border-white/10 bg-white/[0.04] text-gray-300 py-3 rounded-xl font-semibold hover:bg-white/[0.08] transition"
            >
              ← Back
            </button>

            <button
              onClick={onContinue}
              className="flex-1 bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              Continue →
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CustomerDetail;

