import { Button, Box, Dialog } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Fragment } from "react";
import AppTheme from "../../../constants/theme";
import React from "react";
import CreateTeacherForm from "../CreateTeacherForm";

function CreateTeacherButton(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        style={{ backgroundColor: AppTheme.primary }}
        onClick={handleClickOpen}
      >
        <Add style={{ color: AppTheme.secondary }}></Add>
        <Box width={"8px"} />
        <text style={{ color: AppTheme.secondary }}>Add New Lecturers</text>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box width={600}>
          <CreateTeacherForm onSubmit={handleClose} />
        </Box>
      </Dialog>
    </Fragment>
  );
}

export default CreateTeacherButton;
