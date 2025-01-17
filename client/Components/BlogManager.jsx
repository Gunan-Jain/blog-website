// // BlogManager.js
// import React, { useState } from "react";
// import "../Styles/BlogManager.css";
// import { FaCloudUploadAlt } from "react-icons/fa";

// function BlogManager() {
//   const [blogTitle, setBlogTitle] = useState("");
//   const [blogContent, setBlogContent] = useState("");
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [progress, setProgress] = useState(0);

//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     processFile(uploadedFile);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const uploadedFile = e.dataTransfer.files[0];
//     processFile(uploadedFile);
//   };

//   const processFile = (uploadedFile) => {
//     if (
//       uploadedFile &&
//       ["image/jpeg", "image/png", "application/pdf"].includes(uploadedFile.type)
//     ) {
//       setFile(uploadedFile);
//       if (uploadedFile.type.startsWith("image")) {
//         setPreview(URL.createObjectURL(uploadedFile));
//       } else {
//         setPreview(null);
//       }
//     } else {
//       alert("Invalid file type. Please upload JPG, PNG, or PDF files.");
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleSubmit = () => {
//     if (file) {
//       let uploadInterval = setInterval(() => {
//         setProgress((oldProgress) => {
//           if (oldProgress === 100) {
//             clearInterval(uploadInterval);
//             alert("Blog uploaded successfully!");
//             return 0;
//           }
//           return Math.min(oldProgress + 10, 100);
//         });
//       }, 500);
//     } else {
//       alert("Please upload a file.");
//     }
//   };

//   return (
//     <div className="blog-manager">
//       <h2>Manage Blogs</h2>
//       <div
//         className="blog-form"
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//       >
//         <input
//           type="text"
//           placeholder="Blog Title"
//           value={blogTitle}
//           onChange={(e) => setBlogTitle(e.target.value)}
//         />
//         <textarea
//           placeholder="Blog Content"
//           value={blogContent}
//           onChange={(e) => setBlogContent(e.target.value)}
//         ></textarea>
//         <div className="upload-section">
//           <label htmlFor="file-upload" className="upload-btn">
//             <FaCloudUploadAlt size={30} /> Drag & Drop or Upload Blog Image/PDF
//           </label>
//           <input
//             id="file-upload"
//             type="file"
//             onChange={handleFileChange}
//             hidden
//           />
//         </div>
//         {preview && <img src={preview} alt="Preview" className="preview" />}
//         {progress > 0 && (
//           <div className="progress-bar" style={{ width: `${progress}%` }}></div>
//         )}
//         <button className="btn" onClick={handleSubmit}>
//           Add Blog
//         </button>
//       </div>
//     </div>
//   );
// }

// export default BlogManager;

import React, { useState } from "react";
import "../Styles/BlogManager.css";

function BlogManager() {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const handleSubmit = async () => {
    if (blogTitle.trim() === "" || blogContent.trim() === "") {
      alert("Please fill in both the title and the content fields.");
    } else {
      try {
        const response = await fetch("http://localhost:5000/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: blogTitle, content: blogContent }),
        });
        if (response.ok) {
          alert("Blog added successfully!");
          setBlogTitle("");
          setBlogContent("");
        } else {
          alert("Failed to add blog.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="blog-manager">
      <h2>Manage Blogs</h2>
      <div className="blog-form">
        <input
          type="text"
          placeholder="Blog Title"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
        />
        <textarea
          placeholder="Blog Content"
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
        ></textarea>
        <button className="btn" onClick={handleSubmit}>
          Add Blog
        </button>
      </div>
    </div>
  );
}

export default BlogManager;
