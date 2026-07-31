import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CareersModal from "./CareersModal";

const Careers = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    // Navigate back to the home page when the modal is closed
    navigate("/");
  };

  return <CareersModal open={open} onClose={handleClose} />;
};

export default Careers;
