import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiArrowRight, FiPhone } from "react-icons/fi";

const BookingButton = ({
  selectedSkip,
  isBooking,
  bookingComplete,
  handleBookingClick,
  getSkipSizeName,
  calculateTotalPrice,
}) => {
  return (
    <div className="relative">
      <motion.button
        onClick={handleBookingClick}
        disabled={!selectedSkip || isBooking}
        className={`relative inline-flex items-center justify-center px-8 py-3 rounded-lg text-lg font-medium transition-all min-w-[240px] ${
          bookingComplete
            ? "bg-green-500 text-white shadow-lg"
            : selectedSkip && !isBooking
            ? "bg-primary hover:bg-primary-dark text-white shadow-md hover:shadow-lg"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        whileTap={selectedSkip && !isBooking ? { scale: 0.98 } : {}}
      >
        <span className="whitespace-nowrap flex items-center">
          {isBooking ? (
            "Processing..."
          ) : bookingComplete ? (
            <>
              Booked! <FiCheck className="ml-2" />
            </>
          ) : (
            <>
              Continue to Booking <FiArrowRight className="ml-2" />
            </>
          )}
        </span>

        {isBooking && (
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{
              x: [0, 60, 120, 180, 240],
              opacity: [1, 1, 1, 1, 0],
            }}
            transition={{ duration: 2, ease: "linear" }}
            className="absolute left-0"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M18 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3"></path>
              <path d="M6 4a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3"></path>
              <path d="M12 4a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3"></path>
            </svg>
          </motion.div>
        )}

        {isBooking && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "linear" }}
            className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-50"
          />
        )}
      </motion.button>

      <AnimatePresence>
        {bookingComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute left-1/2 transform -translate-x-1/2 -top-20 w-full max-w-md"
          >
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg mx-auto">
              <div className="flex items-center justify-center">
                <FiCheck className="mr-2 flex-shrink-0" />
                <span>
                  <strong>Success!</strong> Your booking is confirmed
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingButton;
