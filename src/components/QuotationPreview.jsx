
import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

import QuotationPDF from "./QuotationPDF";

function QuotationPreview({
    business,
    customer,
    products,
    onBack,
}) {
    const [addGST, setAddGST] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [sharing, setSharing] = useState(false);

    // This ref points to the actual quotation
    const quotationRef = useRef(null);


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
        taxableAmount *
        (gstRate / 100);

    const total =
        taxableAmount + gstAmount;


    // ============================
    // DATE
    // ============================

    const today = new Date();

    const quotationDate =
        today.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );


    // ============================
    // DOWNLOAD PDF
    // ============================

    const handleDownloadPDF =
        async () => {

            const element =
                quotationRef.current;

            if (!element) {
                alert(
                    "Quotation preview not found."
                );

                return;
            }

            setDownloading(true);

            try {

                const canvas =
                    await html2canvas(
                        element,
                        {
                            scale: 2,
                            useCORS: true,
                            backgroundColor:
                                "#ffffff",
                            logging: false,
                        }
                    );


                const imgData =
                    canvas.toDataURL(
                        "image/png"
                    );


                const pdf =
                    new jsPDF(
                        "p",
                        "mm",
                        "a4"
                    );


                const pdfWidth =
                    pdf.internal.pageSize.getWidth();

                const pdfHeight =
                    pdf.internal.pageSize.getHeight();


                const imgWidth =
                    pdfWidth;

                const imgHeight =
                    (canvas.height *
                        imgWidth) /
                    canvas.width;


                let heightLeft =
                    imgHeight;

                let position = 0;


                // ============================
                // FIRST PAGE
                // ============================

                pdf.addImage(
                    imgData,
                    "PNG",
                    0,
                    position,
                    imgWidth,
                    imgHeight
                );


                heightLeft -=
                    pdfHeight;


                // ============================
                // ADDITIONAL PAGES
                // ============================

                while (
                    heightLeft > 0
                ) {

                    position =
                        heightLeft -
                        imgHeight;

                    pdf.addPage();

                    pdf.addImage(
                        imgData,
                        "PNG",
                        0,
                        position,
                        imgWidth,
                        imgHeight
                    );

                    heightLeft -=
                        pdfHeight;
                }


                // ============================
                // FILE NAME
                // ============================

                const customerName =
                    (
                        customer?.name ||
                        "Customer"
                    )
                        .trim()
                        .replace(
                            /\s+/g,
                            "_"
                        )
                        .replace(
                            /[^a-zA-Z0-9_-]/g,
                            ""
                        );


                pdf.save(
                    `Quotation_Q-0001_${
    customerName ||
        "Customer"
}.pdf`
                );

            } catch (error) {

                console.error(
                    "PDF generation failed:",
                    error
                );

                alert(
                    "Failed to generate PDF. Please try again."
                );

            } finally {

                setDownloading(false);

            }
        };


    // ============================
    // WHATSAPP SHARE
    // ============================

    const handleWhatsAppShare =
        async () => {

            const element =
                quotationRef.current;

            if (!element) {
                alert(
                    "Quotation preview not found."
                );

                return;
            }

            setSharing(true);

            try {

                const canvas =
                    await html2canvas(
                        element,
                        {
                            scale: 2,
                            useCORS: true,
                            backgroundColor:
                                "#ffffff",
                            logging: false,
                        }
                    );


                const blob =
                    await new Promise(
                        (resolve) =>
                            canvas.toBlob(
                                resolve,
                                "image/png"
                            )
                    );


                if (!blob) {
                    throw new Error(
                        "Could not create image."
                    );
                }


                const fileName =
                    `Quotation_Q-0001_${
    (
        customer?.name ||
        "Customer"
    )
        .trim()
        .replace(
            /\s+/g,
            "_"
        )
}.png`;


                const file =
                    new File(
                        [blob],
                        fileName,
                        {
                            type:
                                "image/png",
                        }
                    );


                // ============================
                // NATIVE SHARE
                // ============================

                if (
                    navigator.canShare &&
                    navigator.canShare({
                        files: [file],
                    })
                ) {

                    try {

                        await navigator.share({
                            files: [file],
                            title:
                                "Quotation",
                            text:
                                `Quotation for ${
    customer?.name ||
    "Customer"
                                } — Total ₹${
    total.toLocaleString(
        "en-IN"
    )
} `,
                        });

                        return;

                    } catch (error) {

                        if (
                            error.name ===
                            "AbortError"
                        ) {
                            return;
                        }

                        console.warn(
                            "Native share failed:",
                            error
                        );
                    }
                }


                // ============================
                // WHATSAPP FALLBACK
                // ============================

                const message =
                    encodeURIComponent(
                        `Hello ${
    customer?.name ||
        ""
}, \n\n` +
                        `Please find your quotation below.\n\n` +
                        `Total Amount: ₹${
    total.toLocaleString(
        "en-IN"
    )
} \n\n` +
                        `Thank you for your business!`
                    );


                window.open(
                    `https://wa.me/?text=${message}`,
    "_blank"
                );

            } catch (error) {

    console.error(
        "WhatsApp share failed:",
        error
    );

    alert(
        "Failed to share. Please try again."
    );

} finally {

    setSharing(false);

}
        };


// ============================
// UI
// ============================

return (

    <div className="min-h-screen bg-[#080808] text-white p-6">

        <div className="max-w-5xl mx-auto">


            {/* ============================
                    PAGE HEADER
                ============================ */}

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h1 className="text-3xl font-bold">
                        Quotation Preview
                    </h1>

                    <p className="text-gray-400 mt-2">
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


            {/* ==================================================
                    SAME QUOTATION SHOWN ON SCREEN AND USED FOR PDF
                ================================================== */}

            <QuotationPDF
                quotationRef={quotationRef}
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


            {/* ============================
                    ACTION BUTTONS
                ============================ */}

            <div className="mt-6 flex flex-col md:flex-row gap-4">


                {/* DOWNLOAD PDF */}

                <button
                    onClick={
                        handleDownloadPDF
                    }
                    disabled={
                        downloading
                    }
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >

                    {downloading ? (
                        "Generating PDF..."
                    ) : (
                        <>
                            📥 Download PDF
                        </>
                    )}

                </button>


                {/* WHATSAPP */}

                <button
                    onClick={
                        handleWhatsAppShare
                    }
                    disabled={
                        sharing
                    }
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-3 rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >

                    {sharing
                        ? "Preparing..."
                        : "🟢 Share on WhatsApp"}

                </button>

            </div>


            {/* ============================
                    GST CONTROL
                ============================ */}

            <div className="mt-6 bg-white/[0.04] border border-white/10 rounded-2xl p-6">

                <h3 className="text-lg font-semibold">
                    GST
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                    Choose whether GST should be included.
                </p>


                <div className="flex gap-3 mt-5">


                    {/* YES */}

                    <button
                        onClick={() =>
                            setAddGST(true)
                        }
                        className={`px-6 py-3 rounded-xl border transition font-medium ${addGST
                                ? "bg-white text-black border-white"
                                : "bg-white/[0.04] text-gray-400 border-white/10 hover:bg-white/[0.08]"
                            }`}
                    >
                        Yes — 18%
                    </button>


                    {/* NO */}

                    <button
                        onClick={() =>
                            setAddGST(false)
                        }
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

