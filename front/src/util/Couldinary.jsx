
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
    onImageUpload(response.data.secure_url); //? Llamar a la función proporcionada con la URL de la imagen
  };

  const handleDeleteImage = () => {
    setImages("");
  
    if (inputFileRef.current) {
      inputFileRef.current.value = null;
    }
  };

  return (
    <div className="flex">
      <input
        ref={inputFileRef}
        className="w-full px-4 py-2 mb-4 border rounded-md"
        type="file"
        accept="image/*"
        onChange={imageUpload}
        required
      />

      {images && (
        <div>
          <button onClick={handleDeleteImage}>
          <GiBroom />
          </button>
        </div>
      )}
    </div>
  );
}

export default Couldinary;



