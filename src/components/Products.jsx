import { useState } from "react";

function Products({
  products,
  setProducts,
  onBack,
  onContinue,
}) {
  // Calculator
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorMode, setCalculatorMode] = useState("mm");

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");

  // Product on which calculator result will be applied
  const [selectedProduct, setSelectedProduct] = useState(0);

  // Handle product field changes
  const handleChange = (index, field, value) => {
    const updatedProducts = [...products];

    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
    };

    setProducts(updatedProducts);
  };

  // Add product
  const addProduct = () => {
    setProducts([
      ...products,
      {
        name: "",
        quantity: 1,
        squareFeet: "",
        rate: 0,
      },
    ]);
  };

  // Remove product
  const removeProduct = (index) => {
    if (products.length === 1) {
      return;
    }

    const updatedProducts = products.filter(
      (_, productIndex) => productIndex !== index
    );

    setProducts(updatedProducts);

    // Keep selected product valid
    if (selectedProduct >= updatedProducts.length) {
      setSelectedProduct(updatedProducts.length - 1);
    }
  };

  // Calculate square feet
  const calculateSquareFeet = () => {
    const lengthValue = Number(length);
    const widthValue = Number(width);

    if (!lengthValue || !widthValue) {
      return 0;
    }

    if (calculatorMode === "mm") {
      // 1 sq.ft = 92903.04 sq.mm
      return (lengthValue * widthValue) / 92903.04;
    }

    // Feet
    return lengthValue * widthValue;
  };

  const squareFeet = calculateSquareFeet();

  // Use calculator result for selected product
  const useCalculatorResult = () => {
    if (!squareFeet) {
      return;
    }

    const updatedProducts = [...products];

    updatedProducts[selectedProduct] = {
      ...updatedProducts[selectedProduct],
      squareFeet: squareFeet.toFixed(2),
    };

    setProducts(updatedProducts);

    // Close calculator
    setShowCalculator(false);

    // Clear calculator
    setLength("");
    setWidth("");
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white p-6">

      <div className="max-w-5xl mx-auto">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Products
            </h1>

            <p className="text-gray-400 mt-2">
              Add products or services to your quotation.
            </p>
          </div>

          {/* Calculator Button */}
          <button
            onClick={() => {
              setSelectedProduct(0);
              setShowCalculator(true);
            }}
            className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 transition"
          >
            <span className="text-lg">
              📐
            </span>

            <span>
              Sq. Ft. Calculator
            </span>
          </button>

        </div>

        {/* ========================= */}
        {/* PRODUCTS */}
        {/* ========================= */}

        <div className="space-y-5">

          {products.map((product, index) => {

            const measurement = product.squareFeet
              ? Number(product.squareFeet)
              : Number(product.quantity || 0);

            const amount =
              measurement *
              Number(product.rate || 0);

            return (
              <div
                key={index}
                className="bg-white/[0.04] border border-white/10 rounded-2xl p-6"
              >

                {/* Product Header */}
                <div className="flex items-center justify-between mb-5">

                  <h2 className="font-semibold text-lg">
                    Product {index + 1}
                  </h2>

                  {products.length > 1 && (
                    <button
                      onClick={() => removeProduct(index)}
                      className="text-red-400 text-sm hover:text-red-300 transition"
                    >
                      Remove
                    </button>
                  )}

                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                  {/* Product Name */}
                  <div className="md:col-span-2">

                    <label className="block text-sm text-gray-400 mb-2">
                      Product / Service
                    </label>

                    <input
                      type="text"
                      placeholder="Example: Sofa"
                      value={product.name || ""}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-400/50"
                    />

                  </div>

                  {/* Quantity */}
                  <div>

                    <label className="block text-sm text-gray-400 mb-2">
                      Quantity
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={product.quantity ?? ""}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-400/50"
                    />

                  </div>

                  {/* Rate */}
                  <div>

                    <label className="block text-sm text-gray-400 mb-2">
                      Rate
                    </label>

                    <input
                      type="number"
                      min="0"
                      placeholder="₹ 0"
                      value={product.rate ?? ""}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "rate",
                          e.target.value
                        )
                      }
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-400/50"
                    />

                  </div>

                </div>

                {/* ========================= */}
                {/* SQUARE FEET */}
                {/* ========================= */}

                <div className="mt-5">

                  <label className="block text-sm text-gray-400 mb-2">
                    Square Feet
                  </label>

                  <div className="flex gap-3">

                    <input
                      type="number"
                      min="0"
                      placeholder="Enter sq.ft"
                      value={product.squareFeet ?? ""}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "squareFeet",
                          e.target.value
                        )
                      }
                      className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-400/50"
                    />

                    {/* Calculate Button */}
                    <button
                      onClick={() => {
                        setSelectedProduct(index);
                        setShowCalculator(true);
                      }}
                      className="px-5 py-3 rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 transition"
                    >
                      Calculate
                    </button>

                  </div>

                </div>

                {/* Amount */}
                <div className="mt-5 flex justify-between items-center border-t border-white/10 pt-5">

                  <span className="text-gray-400">
                    Amount
                  </span>

                  <span className="text-xl font-semibold">
                    ₹{amount.toLocaleString("en-IN")}
                  </span>

                </div>

              </div>
            );
          })}

        </div>

        {/* ========================= */}
        {/* ADD PRODUCT */}
        {/* ========================= */}

        <button
          onClick={addProduct}
          className="mt-5 w-full py-4 rounded-xl border border-dashed border-white/20 text-gray-300 hover:bg-white/[0.04] transition"
        >
          + Add Product
        </button>

        {/* ========================= */}
        {/* NAVIGATION */}
        {/* ========================= */}

        <div className="flex justify-between mt-8">

          <button
            onClick={onBack}
            className="px-6 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-gray-300 hover:bg-white/[0.08] transition"
          >
            ← Back
          </button>

          <button
            onClick={onContinue}
            className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Preview Quotation →
          </button>

        </div>

      </div>

      {/* ================================================= */}
      {/* SQ. FT. CALCULATOR MODAL */}
      {/* ================================================= */}

      {showCalculator && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-5">

          <div className="w-full max-w-md bg-[#111111] border border-white/10 rounded-2xl p-6 shadow-2xl">

            {/* Calculator Header */}
            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold">
                  Sq. Ft. Calculator
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Calculate area and use it for Product {selectedProduct + 1}.
                </p>

              </div>

              <button
                onClick={() => setShowCalculator(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>

            </div>

            {/* ========================= */}
            {/* MODE */}
            {/* ========================= */}

            <div className="flex gap-2 mt-6">

              <button
                onClick={() => setCalculatorMode("mm")}
                className={`flex-1 py-3 rounded-xl border text-sm font-medium transition ${calculatorMode === "mm"
                    ? "bg-white text-black border-white"
                    : "border-white/10 text-gray-400 hover:bg-white/[0.05]"
                  }`}
              >
                MM → Sq. Ft.
              </button>

              <button
                onClick={() => setCalculatorMode("feet")}
                className={`flex-1 py-3 rounded-xl border text-sm font-medium transition ${calculatorMode === "feet"
                    ? "bg-white text-black border-white"
                    : "border-white/10 text-gray-400 hover:bg-white/[0.05]"
                  }`}
              >
                Feet → Sq. Ft.
              </button>

            </div>

            {/* ========================= */}
            {/* INPUTS */}
            {/* ========================= */}

            <div className="grid grid-cols-2 gap-4 mt-6">

              {/* Length */}
              <div>

                <label className="block text-sm text-gray-400 mb-2">
                  Length
                  {calculatorMode === "mm"
                    ? " (mm)"
                    : " (ft)"}
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="Length"
                  value={length}
                  onChange={(e) =>
                    setLength(e.target.value)
                  }
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-400/50"
                />

              </div>

              {/* Width */}
              <div>

                <label className="block text-sm text-gray-400 mb-2">
                  Width
                  {calculatorMode === "mm"
                    ? " (mm)"
                    : " (ft)"}
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="Width"
                  value={width}
                  onChange={(e) =>
                    setWidth(e.target.value)
                  }
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-violet-400/50"
                />

              </div>

            </div>

            {/* ========================= */}
            {/* RESULT */}
            {/* ========================= */}

            <div className="mt-6 bg-white/[0.04] border border-white/10 rounded-xl p-5">

              <p className="text-sm text-gray-400">
                Calculated Area
              </p>

              <p className="text-3xl font-bold mt-2">
                {squareFeet.toFixed(2)}
                <span className="text-lg text-gray-400 ml-2">
                  sq.ft
                </span>
              </p>

            </div>

            {/* ========================= */}
            {/* BUTTONS */}
            {/* ========================= */}

            <div className="flex gap-3 mt-6">

              <button
                onClick={() => setShowCalculator(false)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/[0.05] transition"
              >
                Cancel
              </button>

              <button
                onClick={useCalculatorResult}
                disabled={!squareFeet}
                className={`flex-1 py-3 rounded-xl font-medium transition ${squareFeet
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-white/10 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Use {squareFeet.toFixed(2)} sq.ft
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Products;