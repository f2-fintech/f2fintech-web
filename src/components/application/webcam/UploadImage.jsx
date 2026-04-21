import { useState } from "react";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import { upload } from "../helpers/upload";

export default function UploadImage({
  capturedImage,
  onUpload,
  setCapturedImage,
}) {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async () => {
    setUploading(true);
    await upload(capturedImage, onUpload);
    setUploading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        maxWidth: 400,
      }}
    >
      {capturedImage && (
        <Box
          component="img"
          src={capturedImage}
          alt="Captured"
          sx={{ width: "100%", height: "auto", borderRadius: 2, mb: 2 }}
        />
      )}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={uploadImage}
          disabled={uploading}
        >
          Upload
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setCapturedImage(null)}
        >
          Retake
        </Button>
      </Box>
      {uploading && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CircularProgress size={24} sx={{ mr: 1 }} />
          <Typography>Uploading...</Typography>
        </Box>
      )}
    </Box>
  );
}
