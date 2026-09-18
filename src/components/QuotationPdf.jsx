
function QuotationPdf({
    quotationRef,
    business,
    customer,
    products,
    quotationDate,
    subtotal,
    discount,
    gstRate,
    gstAmount,
    total,
}) {
    return (
        <div
            ref={quotationRef}
            className="bg-white text-black rounded-2xl overflow-hidden shadow-2xl"
        >
            {/* ============================
                QUOTATION CONTENT
            ============================ */}

            <div className="p-8 md:p-10">

                {/* BUSINESS + QUOTATION INFO */}

                <div className="flex flex-col md:flex-row justify-between gap-8">

                    {/* BUSINESS */}

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


                    {/* QUOTATION DETAILS */}

                    <div className="text-right">

                        <h3 className="text-2xl font-bold">
                            QUOTATION
                        </h3>

                        <p className="text-sm text-gray-700 mt-2">
                            Quotation No: Q-0001
                        </p>

                        <p className="text-sm text-gray-700 mt-1">
                            Date: {quotationDate}
                        </p>

                    </div>

                </div>


                {/* ============================
                    CUSTOMER
                ============================ */}

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


                {/* ============================
                    PRODUCTS
                ============================ */}

                <div className="mt-10">

                    {/* TABLE HEADER */}

                    <div className="grid grid-cols-12 gap-4 bg-gray-100 rounded-lg px-4 py-3 text-xs font-semibold text-gray-800 uppercase">

                        <div className="col-span-5">
                            Product / Service
                        </div>

                        <div className="col-span-2">
                            Qty
                        </div>

                        <div className="col-span-2">
                            Sq.Ft
                        </div>

                        <div className="col-span-1">
                            Rate
                        </div>

                        <div className="col-span-2 text-right">
                            Amount
                        </div>

                    </div>


                    {/* PRODUCT ROWS */}

                    <div>

                        {products.map((product, index) => {

                            const measurement =
                                product.squareFeet
                                    ? Number(product.squareFeet)
                                    : Number(product.quantity || 0);

                            const amount =
                                measurement *
                                Number(product.rate || 0);

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


                {/* ============================
                    SUMMARY
                ============================ */}

                <div className="flex justify-end mt-8">

                    <div className="w-full md:w-80">

                        {/* SUBTOTAL */}

                        <div className="flex justify-between py-2 text-sm">

                            <span className="text-gray-800">
                                Subtotal
                            </span>

                            <span>
                                ₹
                                {subtotal.toLocaleString("en-IN")}
                            </span>

                        </div>


                        {/* DISCOUNT */}

                        <div className="flex justify-between py-2 text-sm">

                            <span className="text-gray-800">
                                Discount
                            </span>

                            <span>
                                -₹
                                {discount.toLocaleString("en-IN")}
                            </span>

                        </div>


                        {/* GST */}

                        <div className="flex justify-between py-2 text-sm">

                            <span className="text-gray-800">
                                GST ({gstRate}%)
                            </span>

                            <span>
                                ₹
                                {gstAmount.toLocaleString("en-IN")}
                            </span>

                        </div>


                        {/* TOTAL */}

                        <div className="border-t border-gray-300 mt-3 pt-4 flex justify-between">

                            <span className="text-lg font-bold">
                                Total
                            </span>

                            <span className="text-2xl font-bold">
                                ₹
                                {total.toLocaleString("en-IN")}
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* ============================
                FOOTER
            ============================ */}

            <div className="bg-gray-50 border-t border-gray-200 px-8 py-5">

                <p className="text-lg font-bold text-green-600 text-center">
                    Thank you for your business!
                </p>

            </div>

        </div>
    );
}

export default QuotationPdf;

