import React from "react";
import ReactWebcam from "react-webcam";
import { Button, Box } from "@mui/material";

const aspectRatios = {
  landscape: {
    width: 1920,
    height: 1080,
  },
  portrait: {
    height: 1920,
    width: 1080,
  },
};

export default function Webcam({
  setCapturedImage,
  type = "portrait",
  setFieldValue,
}) {
  // Create a reference for ReactWebcam
  const webcamRef = React.useRef(null);

  // Capture the screenshot
  const captureScreenshot = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const file = dataURLtoFile(imageSrc);
      setFieldValue("passportSizePhoto", file);
      setCapturedImage(URL.createObjectURL(file));
    }
  };

  function dataURLtoFile(dataUrl) {
    // Decode the base64 string
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    // Generate a file extension from the MIME type
    const extension = mime.split("/")[1]; // Extract file type (e.g., "png" from "image/png")

    // Auto-generate a filename using the current timestamp
    const filename = `file_${new Date().getTime()}.${extension}`;

    // Create a File object from the array buffer
    return new File([u8arr], filename, { type: mime });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <ReactWebcam
        ref={webcamRef} // Attach the reference
        mirrored
        screenshotFormat="image/jpeg"
        screenshotQuality={1}
        videoConstraints={{
          facingMode: "user",
          ...aspectRatios[type],
        }}
        style={{ width: "100%", height: "auto", borderRadius: 8 }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={captureScreenshot}
      >
        Capture Photo
      </Button>
    </Box>
  );
}
