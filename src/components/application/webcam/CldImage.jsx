import { AdvancedImage } from "@cloudinary/react";
import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import {
  cartoonify,
  grayscale,
  pixelate,
  sepia,
  vectorize,
  vignette,
} from "@cloudinary/url-gen/actions/effect";
import { Box, Typography, Grid } from "@mui/material";

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

const EFFECTS = {
  none: null,
  sepia: sepia(),
  grayscale: grayscale(),
  cartoon: cartoonify(),
  pixelate: pixelate(),
  vignette: vignette(),
  vectorize: vectorize(),
};

export default function CldImage({ public_id }) {
  const [activeEffect, setActiveEffect] = useState("none");

  const myImage = cld.image(public_id);
  if (activeEffect !== "none") myImage.effect(EFFECTS[activeEffect]);

  return (
    <Box sx={{ textAlign: "center", p: 2 }}>
      <AdvancedImage className="main-image" cldImg={myImage} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Select an Effect
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {Object.keys(EFFECTS).map((effect) => {
          const imageWithFilter = cld.image(public_id);
          imageWithFilter.effect(EFFECTS[effect]);

          return (
            <Grid item xs={4} sm={3} md={2} key={effect}>
              <Box
                sx={{
                  border:
                    activeEffect === effect
                      ? "2px solid blue"
                      : "1px solid #ddd",
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  textAlign: "center",
                  p: 1,
                }}
                onClick={() => setActiveEffect(effect)}
              >
                {effect === "none" ? (
                  <Box
                    sx={{
                      height: 100,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>No Effect</Typography>
                  </Box>
                ) : (
                  <AdvancedImage
                    cldImg={imageWithFilter}
                    style={{ width: "100%" }}
                  />
                )}
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {effect.charAt(0).toUpperCase() + effect.slice(1)}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
