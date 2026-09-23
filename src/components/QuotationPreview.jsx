import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import QuotationPdf from "./QuotationPdf";

function QuotationPreview({
    business,
    customer,
    products,
    onBack,
}) {
    const [addGST, setAddGST] = useState(false);

    // ============================
    // GST
    // ============================

    const gstRate = addGST ? 18 : 0;


    // ============================
    // SUBTOTAL
    // ============================

    const subtotal = products.reduce(
        (total, product) => {
            const measurement =
                product.squareFeet
                    ? Number(product.squareFeet)
                    : Number(product.quantity || 0);

            return (
                total +
                measurement *
                Number(product.rate || 0)
            );
        },
        0
    );


    // ============================
    // TOTAL
    // ============================

    const discount = 0;

    const taxableAmount =
        subtotal - discount;

    const gstAmount =
        taxableAmount * (gstRate / 100);

    const total =
        taxableAmount + gstAmount;


    // ============================
    // DATE
    // ============================

    const today = new Date();

    const quotationDate =
        today.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });


    return (
        <div className="min-h-screen bg-[#080808] text-white px-4 py-8">

            <div className="max-w-5xl mx-auto">


                {/* ============================
                    TOP HEADER
                ============================ */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

                    <div>
                        <h1 className="text-3xl font-bold">
                            Quotation Preview
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Review your quotation before downloading.
                        </p>
                    </div>


                    <button
                        onClick={onBack}
                        className="
                            border border-white/10
                            bg-white/[0.04]
                            hover:bg-white/[0.08]
                            px-5 py-3
                            rounded-xl
                            text-gray-300
                            transition
                        "
                    >
                        ← Edit Products
                    </button>

                </div>


                {/* ============================
                    QUOTATION PREVIEW
                ============================ */}

                <div className="bg-white text-[#222] rounded-2xl shadow-2xl overflow-hidden">

                    <div className="p-6 sm:p-8 md:p-10">


                        {/* ============================
                            HEADER
                        ============================ */}

                        <div className="flex flex-col sm:flex-row justify-between gap-8">

                            {/* BUSINESS */}

                            <div>

                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                                    {business?.name ||
                                        "Your Business"}
                                </h2>

                                {business?.address && (
                                    <p className="text-gray-500 text-sm mt-2">
                                        {business.address}
                                    </p>
                                )}

                                {business?.phone && (
                                    <p className="text-gray-500 text-sm mt-1">
                                        {business.phone}
                                    </p>
                                )}

                                {business?.email && (
                                    <p className="text-gray-500 text-sm mt-1">
                                        {business.email}
                                    </p>
                                )}

                            </div>


                            {/* QUOTATION INFO */}

                            <div className="sm:text-right">

                                <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                                    QUOTATION
                                </h1>

                                <p className="text-gray-500 text-sm mt-2">
                                    Date: {quotationDate}
                                </p>

                                <p className="text-gray-500 text-sm mt-1">
                                    Quote No: Q-0001
                                </p>

                            </div>

                        </div>


                        {/* LINE */}

                        <div className="border-t border-gray-200 my-8" />


                        {/* ============================
                            CUSTOMER
                        ============================ */}

                        <div className="mb-8">

                            <p className="text-xs font-semibold text-gray-400 tracking-widest mb-2">
                                BILL TO
                            </p>

                            <h3 className="text-lg font-bold">
                                {customer?.name ||
                                    "Customer"}
                            </h3>

                            {customer?.phone && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {customer.phone}
                                </p>
                            )}

                            {customer?.email && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {customer.email}
                                </p>
                            )}

                            {customer?.address && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {customer.address}
                                </p>
                            )}

                        </div>


                        {/* ============================
                            PRODUCTS TABLE
                        ============================ */}

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm">

                                <thead>

                                    <tr className="bg-[#111] text-white">

                                        <th className="text-left px-4 py-3 rounded-l-lg">
                                            Product
                                        </th>

                                        <th className="text-center px-4 py-3">
                                            Qty
                                        </th>

                                        <th className="text-right px-4 py-3">
                                            Rate
                                        </th>

                                        <th className="text-right px-4 py-3 rounded-r-lg">
                                            Amount
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {products.map(
                                        (product, index) => {

                                            const measurement =
                                                product.squareFeet
                                                    ? Number(
                                                        product.squareFeet
                                                    )
                                                    : Number(
                                                        product.quantity || 0
                                                    );

                                            const rate =
                                                Number(
                                                    product.rate || 0
                                                );

                                            const amount =
                                                measurement * rate;

                                            return (
                                                <tr
                                                    key={index}
                                                    className="border-b border-gray-100"
                                                >

                                                    <td className="px-4 py-4 font-medium">
                                                        {product.name}
                                                    </td>

                                                    <td className="px-4 py-4 text-center text-gray-600">
                                                        {measurement}
                                                    </td>

                                                    <td className="px-4 py-4 text-right text-gray-600">
                                                        ₹
                                                        {rate.toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-4 text-right font-medium">
                                                        ₹
                                                        {amount.toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </td>

                                                </tr>
                                            );
                                        }
                                    )}

                                </tbody>

                            </table>

                        </div>


                        {/* ============================
                            TOTALS
                        ============================ */}

                        <div className="flex justify-end mt-8">

                            <div className="w-full sm:w-80">

                                <div className="flex justify-between py-2 text-sm">

                                    <span className="text-gray-500">
                                        Subtotal
                                    </span>

                                    <span>
                                        ₹
                                        {subtotal.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>

                                </div>


                                <div className="flex justify-between py-2 text-sm">

                                    <span className="text-gray-500">
                                        Discount
                                    </span>

                                    <span>
                                        ₹
                                        {discount.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>

                                </div>


                                <div className="flex justify-between py-2 text-sm">

                                    <span className="text-gray-500">
                                        GST ({gstRate}%)
                                    </span>

                                    <span>
                                        ₹
                                        {gstAmount.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>

                                </div>


                                <div className="border-t border-gray-200 mt-3 pt-4 flex justify-between">

                                    <span className="text-lg font-bold">
                                        TOTAL
                                    </span>

                                    <span className="text-lg font-bold">
                                        ₹
                                        {total.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* ============================
                            FOOTER
                        ============================ */}

                        <div className="border-t border-gray-200 mt-12 pt-5">

                            <p className="text-sm font-medium">
                                Thank you for your business!
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                This quotation is system generated.
                            </p>

                        </div>

                    </div>

                </div>


                {/* ============================
                    GST
                ============================ */}

                <div className="mt-6 bg-white/[0.04] border border-white/10 rounded-2xl p-6">

                    <h3 className="text-lg font-semibold">
                        GST
                    </h3>

                    <p className="text-sm text-gray-400 mt-1">
                        Choose whether GST should be included.
                    </p>


                    <div className="flex gap-3 mt-5">

                        <button
                            onClick={() =>
                                setAddGST(true)
                            }
                            className={`
                                px-6 py-3
                                rounded-xl
                                border
                                transition
                                font-medium
                                ${addGST
                                    ? "bg-white text-black border-white"
                                    : "bg-white/[0.04] text-gray-400 border-white/10 hover:bg-white/[0.08]"
                                }
                            `}
                        >
                            Yes — 18%
                        </button>


                        <button
                            onClick={() =>
                                setAddGST(false)
                            }
                            className={`
                                px-6 py-3
                                rounded-xl
                                border
                                transition
                                font-medium
                                ${!addGST
                                    ? "bg-white text-black border-white"
                                    : "bg-white/[0.04] text-gray-400 border-white/10 hover:bg-white/[0.08]"
                                }
                            `}
                        >
                            No — 0%
                        </button>

                    </div>

                </div>


                {/* ============================
                    DOWNLOAD
                ============================ */}

                <div className="mt-6">

                    <PDFDownloadLink
                        document={
                            <QuotationPdf
                                business={business}
                                customer={customer}
                                products={products}
                                quotationDate={quotationDate}
                                subtotal={subtotal}
                                discount={discount}
                                gstRate={gstRate}
                                gstAmount={gstAmount}
                                total={total}
                            />
                        }
                        fileName={`Quotation_Q-0001_${customer?.name
                                ?.trim()
                                .replace(/\s+/g, "_")
                                .replace(
                                    /[^a-zA-Z0-9_-]/g,
                                    ""
                                ) ||
                            "Customer"
                            }.pdf`}
                        className="
                            block
                            w-full
                            text-center
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            font-semibold
                            px-5
                            py-4
                            rounded-2xl
                            transition
                        "
                    >
                        {({ loading }) =>
                            loading
                                ? "Generating PDF..."
                                : "📥 Download PDF"
                        }
                    </PDFDownloadLink>

                </div>

            </div>

        </div>
    );
}

export default QuotationPreview;