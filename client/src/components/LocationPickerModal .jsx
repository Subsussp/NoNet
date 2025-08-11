import { motion } from "framer-motion";
import LocationPicker from "./Mapicker";
const LocationPickerModal = ({ coords, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white p-4 rounded-xl shadow-xl w-[90%] max-w-3xl"
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Location Picker */}
        <LocationPicker clickable={false} coords={coords} />

      </motion.div>
    </div>
  );
};
export default LocationPickerModal;