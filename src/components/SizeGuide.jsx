const SizeGuide = ({ showSizeGuide, setShowSizeGuide }) => {
  if (!showSizeGuide) return null;

  return (
    <div className="bg-blue-50 p-6 border-b border-blue-100">
      <h3 className="font-bold text-lg mb-3">Skip Size Guide</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[4, 6, 8, 10, 12, 14, 16, 20].map((size) => (
          <div key={size} className="bg-white p-3 rounded-lg shadow-xs">
            <div className="font-medium text-primary">{size} Yard</div>
            <div className="text-sm text-gray-600">
              Holds {Math.round(size * 1.5)}-{size * 2} bin bags
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeGuide;
