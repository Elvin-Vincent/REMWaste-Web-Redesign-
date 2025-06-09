import { useState } from "react";
import { FiCheck, FiAlertTriangle } from "react-icons/fi";

const SkipCard = ({ skip, isSelected, onClick }) => {
  const [imageError, setImageError] = useState(false);

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

  const getDefaultImage = (size) => `/images/${size}-yarder-skip.jpg`;

  const calculateTotalPrice = (skip) =>
    skip.price_before_vat + skip.price_before_vat * (skip.vat / 100);

  const requiresOffRoadPlacement = skip.size >= 10;

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 cursor-pointer ${
        isSelected
          ? "border-primary shadow-lg ring-2 ring-primary/20"
          : "border-gray-200 hover:shadow-md"
      }`}
      onClick={onClick}
    >
      {skip.badge && (
        <div
          className={`${skip.badgeColor} text-white text-xs font-bold px-3 py-1 absolute top-4 right-4 rounded-full`}
        >
          {skip.badge}
        </div>
      )}

      {/* Warning badge for large skips */}
      {requiresOffRoadPlacement && (
        <div className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 absolute top-4 left-4 rounded-full flex items-center">
          <FiAlertTriangle className="mr-1" />
          Not Allowed On Road
        </div>
      )}

      <div className="h-48 bg-gray-100 relative overflow-hidden">
        <img
          src={imageError ? getDefaultImage(skip.size) : skip.image}
          alt={`${skip.size} yard skip`}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setImageError(true)}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">
            {getSkipSizeName(skip.size)}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-gray-600 text-sm">
              Hire period: {skip.hire_period_days} days
            </p>
            {skip.allows_heavy_waste && (
              <p className="text-green-600 text-sm flex items-center mt-1">
                <FiCheck className="mr-1" /> Accepts heavy waste
              </p>
            )}
            {requiresOffRoadPlacement && (
              <p className="text-yellow-600 text-sm flex items-center mt-1">
                <FiAlertTriangle className="mr-1" /> Must be placed on private
                property
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Excl. VAT</p>
            <p className="font-medium">£{skip.price_before_vat.toFixed(2)}</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Total incl. VAT</p>
            <p className="text-lg font-bold text-primary">
              £{calculateTotalPrice(skip).toFixed(2)}
            </p>
          </div>
          <button
            className={`flex items-center px-4 py-2 rounded-lg ${
              isSelected
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {isSelected ? "Selected" : "Select"}
            {isSelected && <FiCheck className="ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipCard;
