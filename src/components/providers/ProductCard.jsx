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

const StyledCard = styled(Box)(() => ({
  width: "100%",
  maxWidth: 330,
  margin: "1rem",
  height: "75vh",
  borderRadius: "15px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  overflow: "hidden",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "scale(1.01)",
    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15)",
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
        console.log(resp, "favorites resp");
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
        console.log("response created", res);
        setIsFavorite(!isFavorite);
      })
      .catch((err) => {
        console.log("error creating favorite", err);
      });
  };
  const theme = useTheme();
  return (
    <StyledCard
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        overflow: "hidden",
        height: {
          xs: "80%",
        },
        minHeight: "520px",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
          borderColor: "#1976d2",
        },
      }}
    >
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

      <Box sx={{ position: "relative", backgroundColor: "#fafafa" }}>
        <img
          src={homeimg}
          alt={title}
          style={{
            height: "auto",
            maxHeight: "280px",
            width: "100%",
            objectFit: "contain",
            display: "block",
            // padding: "16px",
          }}
        />
        <StyledCheckbox
          sx={{
            position: "absolute",
            top: { xs: "8px", sm: "12px" },
            right: { xs: "8px", sm: "12px" },
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "50%",
            padding: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            },
          }}
          icon={
            <FavoriteBorder
              sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
            />
          }
          checkedIcon={
            <Favorite
              sx={{
                color: "#e53935",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
              }}
            />
          }
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
          gutterBottom
          variant="h6"
          sx={{
            fontWeight: "600",
            color: "#1a1a1a",
            fontFamily: "DM Sans",
            fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
            marginBottom: "12px",
            lineHeight: "1.3",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            color: "#555",
            fontFamily: "Poppins",
            lineHeight: "1.6",
            fontSize: { xs: "0.875rem", sm: "0.9rem" },
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "4.8em",
          }}
        >
          {text.description}
        </Typography>

        {home && (
          <Box
            sx={{
              backgroundColor: "#f0f7ff",
              padding: { xs: "10px 14px", sm: "12px 16px" },
              borderRadius: "8px",
              marginBottom: "16px",
              border: "1px solid #e3f2fd",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Poppins",
                fontWeight: "500",
                color: "#1565c0",
                fontSize: { xs: "0.875rem", sm: "0.9rem" },
              }}
            >
              Interest Rate:{" "}
              <span style={{ fontWeight: "700", color: "#1976d2" }}>
                {interestRate}
              </span>
            </Typography>
          </Box>
        )}

        <Box
          mt="auto"
          pt={0}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={{ xs: 1, sm: 2 }}
          flexWrap={{ xs: "wrap", sm: "nowrap" }}
        >
          <Button
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              fontSize: { xs: "0.85rem", sm: "0.9rem" },
              fontFamily: "Poppins",
              fontWeight: "500",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
              padding: { xs: "8px 16px", sm: "10px 24px" },
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.25)",
              minWidth: { xs: "100px", sm: "130px" },
              flex: { xs: "1 1 100%", sm: "0 0 auto" },
            }}
          >
            <Link
              to="/application-form"
              style={{
                textDecoration: "none",
                color: "inherit",
                position: "relative",
                zIndex: 1,
                display: "inline-block",
                width: "100%",
                textAlign: "center",
              }}
            >
              Apply Now
            </Link>
          </Button>

          <Box
            display="flex"
            alignItems="center"
            sx={{
              ml: { xs: 0, sm: "auto" },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Poppins",
                fontSize: { xs: "0.85rem", sm: "0.875rem" },
                color: "#666",
                fontWeight: "500",
              }}
            >
              Compare
            </Typography>
            <Checkbox
              checked={isCompared}
              onChange={handleCompareToggle}
              sx={{
                ml: 0.5,
                color: "#bdbdbd",
                padding: "8px",
                "&.Mui-checked": {
                  color: "#1976d2",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                },
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
