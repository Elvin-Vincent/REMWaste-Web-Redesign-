import { useState, useEffect } from "react";
import axios from "axios";
import { FiInfo } from "react-icons/fi";
import Layout from "./components/Layout";
import SkipCard from "./components/SkipCard";
import SizeGuide from "./components/SizeGuide";
import BookingButton from "./components/BookingButton";
import HeroSection from "./components/HeroSection";

const App = () => {
  const [skips, setSkips] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const { data } = await axios.get(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        setSkips(enhanceSkipData(data));
      } catch (error) {
        console.error("Error fetching skips:", error);
        setError("Failed to load skip data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSkips();
  }, []);

  const enhanceSkipData = (data) => {
    return data.map((skip) => ({
      ...skip,
      image: `https://source.unsplash.com/random/600x400/?skip,bin,waste&size=${skip.size}`,
      badge:
        skip.size <= 8
          ? "Most Popular"
          : skip.allowed_on_road
          ? "Road Permit"
          : null,
      badgeColor: skip.size <= 8 ? "bg-amber-400" : "bg-blue-500",
    }));
  };

  const getSkipSizeName = (size) => {
    const sizeNames = {
      4: "Mini Skip",
      6: "Midi Skip",
      8: "Standard Skip",
      10: "Large Skip",
      12: "Extra Large Skip",
      14: "Jumbo Skip",
      16: "Super Skip",
      20: "Builder's Skip",
      40: "Roll-On Roll-Off",
    };
    return sizeNames[size] || `${size} Yard Skip`;
  };

  const calculateTotalPrice = (skip) => {
    return skip.price_before_vat + skip.price_before_vat * (skip.vat / 100);
  };

  const handleBookingClick = () => {
    if (!selectedSkip) return;
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setBookingComplete(true);
      setTimeout(() => setBookingComplete(false), 3000);
    }, 2000);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <HeroSection />
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Choose Your Skip Size
              </h2>
              <p className="text-gray-600">
                Select the option that fits your project needs
              </p>
            </div>
            <button
              onClick={() => setShowSizeGuide(!showSizeGuide)}
              className="flex items-center text-primary mt-4 md:mt-0"
            >
              <FiInfo className="mr-2" /> Size Guide
            </button>
          </div>
        </div>

        <SizeGuide
          showSizeGuide={showSizeGuide}
          setShowSizeGuide={setShowSizeGuide}
        />

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skips.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={selectedSkip?.id === skip.id}
                onClick={() => setSelectedSkip(skip)}
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-50 border-t border-gray-200 p-6 md:p-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {selectedSkip
                ? `Ready to book your ${getSkipSizeName(selectedSkip.size)}?`
                : "Almost there!"}
            </h3>

            <p className="text-gray-600 mb-6">
              {selectedSkip
                ? `You've selected our ${
                    selectedSkip.size
                  } yard skip for £${calculateTotalPrice(selectedSkip).toFixed(
                    2
                  )}`
                : "Please select a skip size to continue"}
            </p>

            <BookingButton
              selectedSkip={selectedSkip}
              isBooking={isBooking}
              bookingComplete={bookingComplete}
              handleBookingClick={handleBookingClick}
              getSkipSizeName={getSkipSizeName}
              calculateTotalPrice={calculateTotalPrice}
            />

            {!bookingComplete && (
              <p className="mt-4 text-sm text-gray-500">
                {selectedSkip
                  ? "Free delivery within 3 working days"
                  : "Need help choosing? Call us at 020 1234 5678"}
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
