
import { useState } from "react";

import Home from "./components/Home";
import BusinessDetails from "./components/BusinessDetail"
import CustomerDetails from "./components/CustomerDetail";


import Products from "./components/Products";
import QuotationPreview from "./components/QuotationPreview";

function App() {

  const [step, setStep] = useState("home");


  const [business, setBusiness] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    gst: "",
    website: "",
  });

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    gst: "",
  });

  const [products, setProducts] = useState([
    {
      name: "",
      quantity: 1,
      squareFeet: "",
      rate: 0,
    },
  ]);
  // Home
  if (step === "home") {
    return (
      <Home
        onCreateQuotation={() => setStep("business")}
      />
    );
  }

  // Business Details
  if (step === "business") {
    return (
      <BusinessDetails
        business={business}
        setBusiness={setBusiness}
        onContinue={() => setStep("customer")}
      />
    );
  }

  // Customer Details
  if (step === "customer") {
    return (
      <CustomerDetails
        customer={customer}
        setCustomer={setCustomer}
        onBack={() => setStep("business")}
        onContinue={() => setStep("products")}
      />
    );
  }
  if (step === "products") {
    return (
      <Products
        products={products}
        setProducts={setProducts}
        onBack={() => setStep("customer")}
        onContinue={() => setStep("preview")}
      />
    );
  }
  if (step === "preview") {
    return (
      <QuotationPreview
        business={business}
        customer={customer}
        products={products}
        onBack={() => setStep("products")}
      />
    );
  }
  return null;
}

export default App;

