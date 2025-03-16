import React, { useState } from "react";
import "./UploadForm.css"; // Import CSS for styling

const UploadForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageURL, setImageURL] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setImageURL("");
        setError("");
    };

    const handleUpload = () => {
        if (!selectedFile) {
            setError("Please select an image first.");
            return;
        }

        setLoading(true); // Show loader while processing

        const formData = new FormData();
        formData.append("file", selectedFile);

        fetch("https://sign-backend-j4dw.onrender.com/upload", {  // Ensure correct backend URL
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setLoading(false); // Hide loader
                
                if (data.error) {
                    setError(data.error);
                } else {
                    setImageURL(`https://sign-backend-j4dw.onrender.com/output/${data.processed_image}`);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error:", error);
                setError("Error processing image. Please try again.");
            });
    };

    return (
        <div className="container">
            <h2 className="title">Sign Language Detection</h2>

            <div className="upload-box">
                <input type="file" accept="image/*" onChange={handleFileChange} className="file-input"/>
                <button onClick={handleUpload} className="upload-button">Upload</button>
            </div>

            {loading && (
                <div className="loading">
                    <div className="loader"></div>
                    <p>Analyzing image...</p>
                </div>
            )}

            {error && <p className="error">{error}</p>}
            
            {imageURL && (
                <div className="result">
                    <h3>Processed Image:</h3>
                    <img src={imageURL} alt="Processed" className="output-image"/>
                </div>
            )}
        </div>
    );
};

export default UploadForm;
