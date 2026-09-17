function BusinessDetails({
    business,
    setBusiness,
    onContinue,
}) {

    const handleChange = (field, value) => {
        setBusiness({
            ...business,
            [field]: value,
        });
    };

    return (
        <div className="min-h-screen bg-[#080808] text-white p-6">

            <div className="max-w-2xl mx-auto">

                <h1 className="text-3xl font-bold">
                    Business Details
                </h1>

                <p className="text-gray-400 mt-2">
                    Enter your business information.
                </p>

                <div className="mt-8 space-y-5">

                    {/* Business Name */}
                    <div>

                        <label className="block text-sm text-gray-300 mb-2">
                            Business Name *
                        </label>

                        <input
                            type="text"
                            placeholder="ABC Furniture"
                            value={business.name}
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
                            value={business.phone}
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
                            placeholder="business@example.com"
                            value={business.email}
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
                            placeholder="Business address"
                            rows="3"
                            value={business.address}
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
                            value={business.gst}
                            onChange={(e) =>
                                handleChange("gst", e.target.value)
                            }
                            className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30"
                        />

                    </div>

                    {/* Website */}
                    <div>

                        <label className="block text-sm text-gray-300 mb-2">
                            Website
                        </label>

                        <input
                            type="text"
                            placeholder="www.example.com"
                            value={business.website}
                            onChange={(e) =>
                                handleChange("website", e.target.value)
                            }
                            className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30"
                        />

                    </div>

                    {/* Continue */}
                    <button
                        onClick={onContinue}
                        className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
                    >
                        Continue →
                    </button>

                </div>

            </div>

        </div>
    );
}

export default BusinessDetails;