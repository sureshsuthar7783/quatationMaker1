import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 10,
        fontFamily: "Helvetica",
        color: "#222",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25,
    },

    businessName: {
        fontSize: 22,
        fontWeight: "bold",
    },

    quotationTitle: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "right",
    },

    smallText: {
        fontSize: 9,
        color: "#666",
        marginTop: 4,
    },

    line: {
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
        marginVertical: 15,
    },

    customerSection: {
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 9,
        color: "#777",
        marginBottom: 6,
    },

    customerName: {
        fontSize: 13,
        fontWeight: "bold",
    },

    table: {
        marginTop: 10,
    },

    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#111",
        color: "#fff",
        padding: 8,
    },

    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#eeeeee",
        padding: 8,
    },

    product: {
        width: "40%",
    },

    quantity: {
        width: "15%",
        textAlign: "center",
    },

    rate: {
        width: "20%",
        textAlign: "right",
    },

    amount: {
        width: "25%",
        textAlign: "right",
    },

    totals: {
        marginTop: 20,
        marginLeft: "55%",
    },

    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 7,
    },

    grandTotal: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#111",
        paddingTop: 10,
        marginTop: 5,
        fontSize: 14,
        fontWeight: "bold",
    },

    footer: {
        position: "absolute",
        bottom: 30,
        left: 40,
        right: 40,
        borderTopWidth: 1,
        borderTopColor: "#eeeeee",
        paddingTop: 10,
    },
});

function QuotationPdf({
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
        <Document>

            <Page size="A4" style={styles.page}>

                {/* HEADER */}

                <View style={styles.header}>

                    <View>
                        <Text style={styles.businessName}>
                            {business?.name || "Your Business"}
                        </Text>

                        <Text style={styles.smallText}>
                            {business?.address || ""}
                        </Text>

                        <Text style={styles.smallText}>
                            {business?.phone || ""}
                        </Text>

                        <Text style={styles.smallText}>
                            {business?.email || ""}
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.quotationTitle}>
                            QUOTATION
                        </Text>

                        <Text style={styles.smallText}>
                            Date: {quotationDate}
                        </Text>

                        <Text style={styles.smallText}>
                            Quote No: Q-0001
                        </Text>
                    </View>

                </View>


                <View style={styles.line} />


                {/* CUSTOMER */}

                <View style={styles.customerSection}>

                    <Text style={styles.sectionTitle}>
                        BILL TO
                    </Text>

                    <Text style={styles.customerName}>
                        {customer?.name || "Customer"}
                    </Text>

                    <Text style={styles.smallText}>
                        {customer?.phone || ""}
                    </Text>

                    <Text style={styles.smallText}>
                        {customer?.email || ""}
                    </Text>

                    <Text style={styles.smallText}>
                        {customer?.address || ""}
                    </Text>

                </View>


                {/* PRODUCTS */}

                <View style={styles.table}>

                    <View style={styles.tableHeader}>

                        <Text style={styles.product}>
                            Product
                        </Text>

                        <Text style={styles.quantity}>
                            Qty
                        </Text>

                        <Text style={styles.rate}>
                            Rate
                        </Text>

                        <Text style={styles.amount}>
                            Amount
                        </Text>

                    </View>


                    {products.map((product, index) => {

                        const measurement =
                            product.squareFeet
                                ? Number(product.squareFeet)
                                : Number(product.quantity || 0);

                        const rate =
                            Number(product.rate || 0);

                        const amount =
                            measurement * rate;

                        return (
                            <View
                                style={styles.tableRow}
                                key={index}
                            >

                                <Text style={styles.product}>
                                    {product.name}
                                </Text>

                                <Text style={styles.quantity}>
                                    {measurement}
                                </Text>

                                <Text style={styles.rate}>
                                    ₹{rate.toLocaleString("en-IN")}
                                </Text>

                                <Text style={styles.amount}>
                                    ₹{amount.toLocaleString("en-IN")}
                                </Text>

                            </View>
                        );

                    })}

                </View>


                {/* TOTALS */}

                <View style={styles.totals}>

                    <View style={styles.totalRow}>
                        <Text>Subtotal</Text>
                        <Text>
                            ₹{subtotal.toLocaleString("en-IN")}
                        </Text>
                    </View>

                    <View style={styles.totalRow}>
                        <Text>Discount</Text>
                        <Text>
                            ₹{discount.toLocaleString("en-IN")}
                        </Text>
                    </View>

                    <View style={styles.totalRow}>
                        <Text>
                            GST ({gstRate}%)
                        </Text>

                        <Text>
                            ₹{gstAmount.toLocaleString("en-IN")}
                        </Text>
                    </View>

                    <View style={styles.grandTotal}>
                        <Text>
                            TOTAL
                        </Text>

                        <Text>
                            ₹{total.toLocaleString("en-IN")}
                        </Text>
                    </View>

                </View>


                {/* FOOTER */}

                <View style={styles.footer}>

                    <Text>
                        Thank you for your business!
                    </Text>

                    <Text style={styles.smallText}>
                        This quotation is system generated.
                    </Text>

                </View>

            </Page>

        </Document>
    );
}

export default QuotationPdf;