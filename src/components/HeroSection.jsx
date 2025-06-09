import {
  FiMapPin,
  FiTrash2,
  FiCheckSquare,
  FiCalendar,
  FiCreditCard,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { FaTruckMoving } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const steps = [
    { id: 1, name: "Postcode", icon: <FiMapPin />, completed: true },
    { id: 2, name: "Waste Type", icon: <FiTrash2 />, completed: true },
    {
      id: 3,
      name: "Select Skip",
      icon: <FiCheckSquare />,
      completed: false,
      current: true,
    },
    { id: 4, name: "Permit Check", icon: <FiCheckSquare />, completed: false },
    { id: 5, name: "Choose Date", icon: <FiCalendar />, completed: false },
    { id: 6, name: "Payment", icon: <FiCreditCard />, completed: false },
  ];

  const currentStepIndex = steps.findIndex((step) => step.current);
  const containerRef = useRef(null);
  const stepRefs = useRef([]);
  const [truckLeft, setTruckLeft] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      const containerRect = containerRef.current?.getBoundingClientRect();
      const currentStepEl = stepRefs.current[currentStepIndex];

      if (containerRect && currentStepEl) {
        const stepRect = currentStepEl.getBoundingClientRect();
        const stepCenter = stepRect.left + stepRect.width / 2;
        const leftOffset = containerRect.left;

        const truckOffset = stepCenter - leftOffset - 20; // 20px to the left of center
        setTruckLeft(truckOffset);

        const progress = stepCenter - leftOffset;
        setProgressWidth(progress);
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [currentStepIndex]);

  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="relative" ref={containerRef}>
            {/* Progress bar background */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-white bg-opacity-20 rounded-full z-0" />

            {/* Filled progress */}
            <motion.div
              className="absolute top-6 left-0 h-1 bg-white rounded-full z-10"
              initial={{ width: 0 }}
              animate={{ width: progressWidth }}
              transition={{ duration: 0.6 }}
            />

            {/* Truck icon near left of current step */}
            <motion.div
              className="absolute z-30 lg:-top-1 hidden sm:block"
              animate={{ left: truckLeft }}
              transition={{ duration: 0.6 }}
              style={{ transform: "translateX(-100%)" }}
            >
              <FaTruckMoving className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-yellow-300 drop-shadow-lg" />
            </motion.div>

            {/* Step Icons */}
            <div className="flex justify-between relative z-20">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center text-center w-full px-1"
                  ref={(el) => (stepRefs.current[index] = el)}
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300
                      ${
                        step.current
                          ? "bg-white text-primary border-white shadow-lg scale-105"
                          : step.completed
                          ? "bg-white text-primary border-white opacity-90"
                          : "bg-white bg-opacity-10 text-white border-white border-opacity-20"
                      }`}
                  >
                    <div className="text-base">{step.icon}</div>
                  </div>
                  <div
                    className={`mt-2 text-xs font-medium ${
                      step.current ? "text-white" : "text-white opacity-80"
                    }`}
                  >
                    {step.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location & Help */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center bg-white bg-opacity-10 hover:bg-opacity-20 transition px-4 py-1.5 rounded-full text-white shadow">
            <FiMapPin className="mr-2 text-sm" />
            <span className="text-sm font-medium">
              Currently serving:{" "}
              <span className="font-semibold">Lowestoft (NR32)</span> area
            </span>
          </div>
          <p className="text-xs text-white opacity-70 mt-2">
            Need help?{" "}
            <a href="#" className="underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
