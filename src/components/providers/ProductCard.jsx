import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import ButtonComp from "../common/button/Button";
import { Utility } from "../utility";
import { theme } from "@cloudinary/url-gen/actions/effect";

const StyledCard = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: "24px",
  backgroundColor: "#fff",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  position: "relative",
  zIndex: 0,
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 20px 40px rgba(50, 68, 230, 0.12)",
    borderColor: "rgba(50, 68, 230, 0.2)",
    zIndex: 1,
  },
}));

const StyledCheckbox = styled(Checkbox)(() => ({
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  borderRadius: "50%",
  padding: "4px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
}));

const ProductCard = ({
  api,
  loanProviderId,
  title,
  home,
  homeimg,
  interestRate,
  text,
  isCompared,
  handleCompareToggle,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // State to track favorite status
  const navigateTo = useNavigate();

  const { getLocalStorage } = Utility();
  const customer = getLocalStorage("customerInfo");
  const token = customer?.token;

  useEffect(() => {
    api
      .getFavourites(loanProviderId, customer?.id)
      .then(({ data: resp }) => {
        if (resp?.data.isFavorite) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      })
      .catch((err) => {
        console.log("Error occured in Getting Favourites from db", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirects the user to the login page if they are not logged in.
  const handleLoginRedirect = () => {
    setOpenDialog(false);
    navigateTo("/login");
  };

  // Adds/removes loan providers from the favorites list. If the user is not logged in, it triggers the login dialog.
  const handleFavoriteToggle = (event) => {
    event.stopPropagation();
    if (!token) {
      setOpenDialog(true);
      return;
    }

    const customerFavourite = {
      loan_provider_id: loanProviderId,
      customer_id: customer.id,
    };
    api
      .toggleFavourite(customerFavourite, isFavorite)
      .then((res) => {
        setIsFavorite(!isFavorite);
      })
      .catch((err) => {
        console.log("error creating favorite", err);
      });
  };
  const theme = useTheme();
  return (
    <StyledCard>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            backgroundColor: "#fff",
            color: "white",
            borderRadius: "16px",
            p: { xs: 2, sm: 3 },
            m: 2,
            maxWidth: "400px",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontFamily: "DM Sans",
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
            fontWeight: "600",
            color: "#333",
            pb: 1,
          }}
        >
          Login Required
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              color: "#666",
              fontFamily: "Poppins",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              fontWeight: "400",
              lineHeight: "1.6",
            }}
            id="alert-dialog-description"
          >
            You must be logged in to add items to your Favorites.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2, gap: 1 }}>
          <Button
            sx={{
              color: "#666",
              fontFamily: "Poppins",
              fontSize: { xs: "0.875rem", sm: "0.95rem" },
              fontWeight: "500",
              textTransform: "none",
              px: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </Button>
          <Button
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              fontFamily: "Poppins",
              fontSize: { xs: "0.875rem", sm: "0.95rem" },
              fontWeight: "500",
              textTransform: "none",
              px: 3,
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
            onClick={handleLoginRedirect}
            autoFocus
          >
            Log In
          </Button>
        </DialogActions>
      </Dialog>

      <Box 
        sx={{ 
          position: "relative", 
          backgroundColor: "#fcfcfc",
          height: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          borderBottom: "1px solid rgba(0,0,0,0.03)"
        }}
      >
        <img
          src={homeimg}
          alt={title}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            transition: "transform 0.5s ease",
          }}
        />
        <StyledCheckbox
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            "& .MuiSvgIcon-root": {
              fontSize: "1.2rem",
            },
            "&:hover": {
              backgroundColor: "#f8f9fa",
              transform: "scale(1.1)",
            }
          }}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite sx={{ color: "#ef4444" }} />}
          checked={isFavorite}
          onChange={handleFavoriteToggle}
        />
      </Box>

      <Box
        p={{ xs: 2, sm: 2.5, md: 3 }}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "700",
            color: "#1a202c",
            fontFamily: "Poppins",
            fontSize: "1.25rem",
            mb: 1.5,
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#718096",
            fontFamily: "Poppins",
            lineHeight: 1.6,
            fontSize: "0.875rem",
            mb: 3,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {text.description}
        </Typography>

        {home && (
          <Box
            sx={{
              backgroundColor: "rgba(50, 68, 230, 0.04)",
              p: "14px 20px",
              borderRadius: "16px",
              mb: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid rgba(50, 68, 230, 0.08)",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 600,
                color: "#4a5568",
                fontSize: "0.85rem",
              }}
            >
              Interest Rate
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 700,
                color: "#10b981",
                fontSize: "1.1rem",
              }}
            >
              {interestRate}
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            mt: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Button
            component={Link}
            to="/application-form"
            sx={{
              flex: 1,
              backgroundColor: "#3244e6",
              color: "white",
              py: 1.5,
              borderRadius: "14px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(50, 68, 230, 0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#2837b9",
                boxShadow: "0 8px 20px rgba(50, 68, 230, 0.3)",
                transform: "translateY(-2px)",
              }
            }}
          >
            Apply Now
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "0.8rem",
                color: "#718096",
                fontWeight: 500,
              }}
            >
              Compare
            </Typography>
            <Checkbox
              checked={isCompared}
              onChange={handleCompareToggle}
              sx={{
                p: 0.5,
                color: "#cbd5e0",
                "&.Mui-checked": {
                  color: "#3244e6",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: "1.4rem",
                }
              }}
            />
          </Box>
        </Box>
      </Box>
    </StyledCard>
  );
};

ProductCard.propTypes = {
  api: PropTypes.any,
  loanProviderId: PropTypes.any,
  title: PropTypes.string.isRequired,
  home: PropTypes.bool.isRequired,
  homeimg: PropTypes.string.isRequired,
  interestRate: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
  isCompared: PropTypes.bool.isRequired,
  handleCompareToggle: PropTypes.func.isRequired,
};

export default ProductCard;
