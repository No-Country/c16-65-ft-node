import { useState, useRef } from "react";
import { GiBroom } from "react-icons/gi";
import axios from "axios";

function Couldinary({ onImageUpload }) {
  const [images, setImages] = useState("");
  const inputFileRef = useRef(null);

  const imageUpload = async (e) => {
    const file = e.target.files[0];

    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", "preset_react");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dpcgjwpkh/image/upload",
      data
    );

    setImages(response.data.secure_url);
    onImageUpload(response.data.secure_url);
  };

  const handleDeleteImage = () => {
    setImages("");

    if (inputFileRef.current) {
      inputFileRef.current.value = null;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        ref={inputFileRef}
        className="w-full px-4 py-2 mb-4 border rounded-md"
        type="file"
        accept="image/*"
        onChange={imageUpload}
        required
      />

      {images && (
        <div className="mt-4">
          <img
            src={images}
            alt="Uploaded Preview"
            className="w-1/2 h-1/2 max-w-full "
          />
          <button onClick={handleDeleteImage}>
            <GiBroom />
          </button>
        </div>
      )}
    </div>
  );
}

export default Couldinary;
