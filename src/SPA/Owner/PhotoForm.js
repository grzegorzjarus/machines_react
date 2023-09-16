import React, { useState } from "react";

function PhotoForm() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        // Update the selected file state
        setSelectedFile(file);

        // Read the selected image file and set it as the image preview
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            // Reset the image preview if no file is selected
            setImagePreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedFile) {
            // You can now upload the selected file to your server or perform other actions.
            // Update this section according to your backend logic.
            console.log("File selected:", selectedFile);
        } else {
            console.error("No file selected.");
        }
    };

    return (
        <div>
            <h2>Upload and Display a Photo</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                {imagePreview && (
                    <div>
                        <img src={imagePreview} alt="Selected" width="200" />
                    </div>
                )}
                <div>
                    <button type="submit">Upload</button>
                </div>
            </form>
        </div>
    );
}

export default PhotoForm;
