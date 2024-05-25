import React, { useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const UpdateDomain = ({ recordToUpdate, onSubmit, onClose }) => {
  const [domainName, setDomainName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (recordToUpdate) {
      setDomainName(recordToUpdate.Name || "");
      setDescription(recordToUpdate.Description || "");
    }
  }, [recordToUpdate]);

  const handleSubmit = () => {
    const updatedDomain = {
      
       description
    };
    onSubmit(updatedDomain);
  };

  return (
    <Popover
      open={true} // Assuming this component is always open when called
      onClose={onClose}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Box sx={{ p: 4 }}>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" gutterBottom>
          Update Description
        </Typography>
        <Typography variant="body1" gutterBottom>
          Domain Name
        </Typography>
        <TextField
          fullWidth
          id="domain-name"
          className="mb-2"
          value={domainName}
          onChange={(e) => setDomainName(e.target.value)}
        />
        <Typography variant="body1" gutterBottom>
          Description
        </Typography>
        <TextField
          fullWidth
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <Button variant="contained" onClick={handleSubmit} className="mt-4">
          Update Description
        </Button>
      </Box>
    </Popover>
  );
};

export default UpdateDomain;
