function Home({ onCreateQuotation }) {
    return (
        <div className="min-h-screen bg-[#080808] text-white overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 blur-[140px] rounded-full" />

            {/* Navbar */}
            <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold text-lg">
                        Q
                    </div>

                    <span className="text-xl font-semibold tracking-tight">
                        Quotely
                    </span>

                </div>

                <button
                    onClick={onCreateQuotation}
                    className="bg-white text-black px-7 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
                >
                    Create Quotation →
                </button>

            </nav>

            {/* Hero */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left */}
                    <div>

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-sm text-gray-300 mb-8">

                            <span className="w-2 h-2 bg-green-400 rounded-full" />

                            Free quotation builder

                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">

                            Create quotations

                            <span className="block text-gray-500">
                                that look professional.
                            </span>

                        </h1>

                        <p className="mt-7 text-lg text-gray-400 max-w-xl leading-relaxed">

                            Create beautiful business quotations, add your products,
                            calculate totals and download a professional PDF — without
                            registration or complicated setup.

                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">

                            <button
                                onClick={onCreateQuotation}
                                className="group px-7 py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-3"
                            >

                                Create Quotation

                                <span className="group-hover:translate-x-1 transition">
                                    →
                                </span>

                            </button>

                            <button
                                className="px-7 py-4 rounded-xl border border-white/10 bg-white/[0.04] text-gray-300 hover:bg-white/[0.08] transition"
                            >
                                See how it works
                            </button>

                        </div>

                        <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-500">

                            <span>✓ No registration</span>
                            <span>✓ Free to use</span>
                            <span>✓ Instant PDF</span>

                        </div>

                    </div>

                    {/* Quotation Preview */}
                    <div className="relative">

                        <div className="absolute inset-0 bg-violet-500/10 blur-3xl" />

                        <div className="relative rounded-3xl border border-white/10 bg-[#111111]/90 backdrop-blur-xl p-5 shadow-2xl">

                            <div className="rounded-2xl bg-[#f5f5f5] text-black p-7">

                                {/* Quotation Header */}
                                <div className="flex justify-between items-start mb-10">

                                    <div>

                                        <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center font-bold mb-4">
                                            A
                                        </div>

                                        <h2 className="text-xl font-bold">
                                            ABC Furniture
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Bengaluru, Karnataka
                                        </p>

                                    </div>

                                    <div className="text-right">

                                        <p className="text-xs text-gray-500 uppercase">
                                            Quotation
                                        </p>

                                        <p className="font-semibold">
                                            Q-0001
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            13 Sep 2026
                                        </p>

                                    </div>

                                </div>

                                {/* Products */}
                                <div className="border-t border-gray-300 pt-5">

                                    <div className="grid grid-cols-4 text-xs text-gray-500 mb-4">

                                        <span className="col-span-2">
                                            ITEM
                                        </span>

                                        <span>
                                            QTY
                                        </span>

                                        <span className="text-right">
                                            AMOUNT
                                        </span>

                                    </div>

                                    <div className="space-y-4">

                                        <div className="grid grid-cols-4 text-sm">

                                            <span className="col-span-2 font-medium">
                                                Premium Sofa
                                            </span>

                                            <span>
                                                2
                                            </span>

                                            <span className="text-right">
                                                ₹50,000
                                            </span>

                                        </div>

                                        <div className="grid grid-cols-4 text-sm">

                                            <span className="col-span-2 font-medium">
                                                Coffee Table
                                            </span>

                                            <span>
                                                1
                                            </span>

                                            <span className="text-right">
                                                ₹10,000
                                            </span>

                                        </div>

                                    </div>

                                </div>

                                {/* Total */}
                                <div className="border-t border-gray-300 mt-7 pt-5">

                                    <div className="flex justify-between text-sm mb-2">

                                        <span className="text-gray-500">
                                            Subtotal
                                        </span>

                                        <span>
                                            ₹60,000
                                        </span>

                                    </div>

                                    <div className="flex justify-between text-sm mb-2">

                                        <span className="text-gray-500">
                                            Discount
                                        </span>

                                        <span>
                                            -₹3,000
                                        </span>

                                    </div>

                                    <div className="flex justify-between text-sm mb-4">

                                        <span className="text-gray-500">
                                            GST
                                        </span>

                                        <span>
                                            ₹10,260
                                        </span>

                                    </div>

                                    <div className="flex justify-between text-xl font-bold">

                                        <span>
                                            Total
                                        </span>

                                        <span>
                                            ₹67,260
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Home;