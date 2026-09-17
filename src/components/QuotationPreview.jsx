import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

function QuotationPreview({ business, customer, products, onBack }) {
    const [addGST, setAddGST] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [sharing, setSharing] = useState(false);

    // ✅ Ref for the quotation card only
    const quotationRef = useRef();

    const gstRate = addGST ? 18 : 0;

    const subtotal = products.reduce((total, product) => {
        const measurement = product.squareFeet
            ? Number(product.squareFeet)
            : Number(product.quantity || 0);
        return total + measurement * Number(product.rate || 0);
    }, 0);

    const discount = 0;
    const taxableAmount = subtotal - discount;
    const gstAmount = taxableAmount * (gstRate / 100);
    const total = taxableAmount + gstAmount;

    const today = new Date();
    const quotationDate = today.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    // ============================
    // 📥 DOWNLOAD PDF
    // ============================
    const handleDownloadPDF = async () => {
        const element = quotationRef.current;
        if (!element) return;

        setDownloading(true);

        try {
            const canvas = await html2canvas(element, {
                scale: 2,              // sharper text
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false,
            });

            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            // First page
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            // Additional pages if content overflows
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            // Filename: Quotation_Q-0001_CustomerName.pdf
            const customerName = (customer?.name || "Customer")
                .replace(/\s+/g, "_");
            pdf.save(`Quotation_Q-0001_${customerName}.pdf`);
        } catch (err) {
            console.error("PDF generation failed:", err);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setDownloading(false);
        }
    };



    // ============================
    // 📤 SHARE ON WHATSAPP
    // ============================
    const handleWhatsAppShare = async () => {
        setSharing(true);

        try {
            const element = quotationRef.current;

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false,
            });

            // Convert canvas → Blob (needed for File API)
            const blob = await new Promise((resolve) =>
                canvas.toBlob(resolve, "image/png")
            );

            const fileName = `Quotation_Q-0001_${(customer?.name || "Customer").replace(/\s+/g, "_")
                }.png`;

            const file = new File([blob], fileName, { type: "image/png" });

            // ✅ METHOD 1: Native Share (mobile) — sends the actual file
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: "Quotation",
                        text: `Quotation for ${customer.name || "you"} — Total ₹${total.toLocaleString("en-IN")}`,
                    });
                    return;
                } catch (err) {
                    // User cancelled share — silently ignore
                    if (err.name === "AbortError") return;
                    console.warn("Native share failed:", err);
                }
            }

            // ⚠️ METHOD 2: Fallback — open WhatsApp with a text message
            const message = encodeURIComponent(
                `Hello ${customer.name || ""},\n\n` +
                `Please find your quotation below.\n\n` +
                `Total Amount: ₹${total.toLocaleString("en-IN")}\n\n` +
                `Thank you for your business!`
            );

            window.open(`https://wa.me/?text=${message}`, "_blank");
        } catch (err) {
            console.error("WhatsApp share failed:", err);
            alert("Failed to share. Please try again.");
        } finally {
            setSharing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#080808] text-white p-6">
            <div className="max-w-5xl mx-auto">

                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Quotation Preview
                        </h1>
                        <p className="text-gray-800 mt-2">
                            Review your quotation before downloading it.
                        </p>
                    </div>

                    <button
                        onClick={onBack}
                        className="border border-white/10 bg-white/[0.04] px-5 py-3 rounded-xl text-gray-300 hover:bg-white/[0.08] transition"
                    >
                        ← Edit Products
                    </button>
                </div>

                {/* ========================= */}
                {/* QUOTATION (captured area) */}
                {/* ========================= */}
                <div
                    ref={quotationRef}
                    className="bg-white text-black rounded-2xl overflow-hidden shadow-2xl"
                >
                    {/* Top Section */}
                    <div className="p-8 md:p-10">

                        {/* Business + Quotation Info */}
                        <div className="flex flex-col md:flex-row justify-between gap-8">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    {business.name || "Your Business"}
                                </h2>
                                {business.address && (
                                    <p className="text-sm text-gray-800 mt-2 max-w-sm">
                                        {business.address}
                                    </p>
                                )}
                                {business.phone && (
                                    <p className="text-sm text-gray-800 mt-1">
                                        {business.phone}
                                    </p>
                                )}
                                {business.email && (
                                    <p className="text-sm text-gray-800 mt-1">
                                        {business.email}
                                    </p>
                                )}
                                {business.gst && (
                                    <p className="text-sm text-gray-800 mt-1">
                                        GSTIN: {business.gst}
                                    </p>
                                )}
                                {business.website && (
                                    <p className="text-sm text-gray-800 mt-1">
                                        {business.website}
                                    </p>
                                )}
                            </div>

                            <div className="md:text-right">
                                <p className="text-xs uppercase tracking-widest text-gray-400">
                                    Quotation
                                </p>
                                <h3 className="text-2xl font-bold mt-1">
                                    Q-0001
                                </h3>
                                <p className="text-sm text-gray-800 mt-2">
                                    Date: {quotationDate}
                                </p>
                            </div>
                        </div>

                        {/* Customer */}
                        <div className="mt-10 pt-6 border-t border-gray-200">
                            <p className="text-xs uppercase tracking-widest text-gray-800">
                                Bill To
                            </p>
                            <h3 className="font-semibold text-lg mt-2">
                                {customer.name || "Customer Name"}
                            </h3>
                            {customer.phone && (
                                <p className="text-sm text-gray-800 mt-1">
                                    {customer.phone}
                                </p>
                            )}
                            {customer.email && (
                                <p className="text-sm text-gray-800 mt-1">
                                    {customer.email}
                                </p>
                            )}
                            {customer.address && (
                                <p className="text-sm text-gray-800 mt-1">
                                    {customer.address}
                                </p>
                            )}
                            {customer.gst && (
                                <p className="text-sm text-gray-800 mt-1">
                                    GSTIN: {customer.gst}
                                </p>
                            )}
                        </div>

                        {/* Products Table */}
                        <div className="mt-10">
                            <div className="grid grid-cols-12 gap-4 bg-gray-100 rounded-lg px-4 py-3 text-xs font-semibold text-gray-800 uppercase">
                                <div className="col-span-5">Product / Service</div>
                                <div className="col-span-2">Qty</div>
                                <div className="col-span-2">Sq.Ft</div>
                                <div className="col-span-1">Rate</div>
                                <div className="col-span-2 text-right">Amount</div>
                            </div>

                            <div>
                                {products.map((product, index) => {
                                    const measurement = product.squareFeet
                                        ? Number(product.squareFeet)
                                        : Number(product.quantity || 0);
                                    const amount =
                                        measurement * Number(product.rate || 0);

                                    return (
                                        <div
                                            key={index}
                                            className="grid grid-cols-12 gap-4 px-4 py-5 border-b border-gray-200 text-sm"
                                        >
                                            <div className="col-span-5 font-medium">
                                                {product.name || "Product"}
                                            </div>
                                            <div className="col-span-2 text-gray-800">
                                                {product.squareFeet
                                                    ? "—"
                                                    : product.quantity}
                                            </div>
                                            <div className="col-span-2 text-gray-800">
                                                {product.squareFeet
                                                    ? product.squareFeet
                                                    : "—"}
                                            </div>
                                            <div className="col-span-1 text-gray-800">
                                                ₹
                                                {Number(
                                                    product.rate || 0
                                                ).toLocaleString("en-IN")}
                                            </div>
                                            <div className="col-span-2 text-right font-medium">
                                                ₹
                                                {amount.toLocaleString("en-IN")}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="flex justify-end mt-8">
                            <div className="w-full md:w-80">
                                <div className="flex justify-between py-2 text-sm">
                                    <span className="text-gray-800">Subtotal</span>
                                    <span>
                                        ₹{subtotal.toLocaleString("en-IN")}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 text-sm">
                                    <span className="text-gray-800">Discount</span>
                                    <span>
                                        -₹{discount.toLocaleString("en-IN")}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 text-sm">
                                    <span className="text-gray-800">
                                        GST ({gstRate}%)
                                    </span>
                                    <span>
                                        ₹{gstAmount.toLocaleString("en-IN")}
                                    </span>
                                </div>
                                <div className="border-t border-gray-300 mt-3 pt-4 flex justify-between">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-2xl font-bold">
                                        ₹{total.toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 border-t border-gray-200 px-8 py-5">
                        <p className="text-large text-bold text-green-600 text-center">
                            Thank you ...
                        </p>
                    </div>
                </div>

                {/* ========================= */}
                {/* ACTIONS (not in PDF) */}
                {/* ========================= */}
                <div className="mt-6 flex flex-col md:flex-row gap-130">

                    <button
                        onClick={handleDownloadPDF}
                        disabled={downloading}
                        className="flex-1 bg-blue-600 text-white font-semibold px-2 py-2 rounded-xl  transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {downloading ? "Generating PDF..." : "📥 Download PDF"}
                    </button>

                    {/* ========================= */}
                    {/* ACTIONS (not in PDF) */}
                    {/* ========================= */}
                    <div className="mt-6 flex flex-col md:flex-row gap-4">

                       

                        {/* Share on WhatsApp */}
                        <button
                            onClick={handleWhatsAppShare}
                            disabled={sharing}
                            className="flex-1 bg-emerald-600 text-white font-semibold px-4 py-2 rounded-2xl  transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {sharing ? (
                                "Preparing..."
                            ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Share on WhatsApp
                                </>
                            )}
                        </button>

                    </div>

                </div>

                {/* GST CONTROL */}
                <div className="mt-6 bg-white/[0.04] border border-white/10 rounded-2xl p-6">
                    <div>
                        <h3 className="text-lg font-semibold">GST</h3>
                        <p className="text-sm text-gray-400 mt-1">
                            Choose whether GST should be included.
                        </p>
                    </div>

                    <div className="flex gap-3 mt-5">
                        <button
                            onClick={() => setAddGST(true)}
                            className={`px-6 py-3 rounded-xl border transition font-medium ${addGST
                                    ? "bg-white text-black border-white"
                                    : "bg-white/[0.04] text-gray-400 border-white/10 hover:bg-white/[0.08]"
                                }`}
                        >
                            Yes — 18%
                        </button>
                        <button
                            onClick={() => setAddGST(false)}
                            className={`px-6 py-3 rounded-xl border transition font-medium ${!addGST
                                    ? "bg-white text-black border-white"
                                    : "bg-white/[0.04] text-gray-400 border-white/10 hover:bg-white/[0.08]"
                                }`}
                        >
                            No — 0%
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default QuotationPreview;