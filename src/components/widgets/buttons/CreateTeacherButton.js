import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Fragment } from "react";
import AppTheme from "../../../constants/theme";
import React from "react";
import { useDispatch } from "react-redux";
import { createTeacherThunk } from "../../../store/slices/userSlice";

function CreateTeacherButton(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onAddNewHandler = () => {
    dispatch(createTeacherThunk());
    handleClose();
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
        <DialogTitle id="form-dialog-title">
          <text>Add New Category</text>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label={props.label ?? "label"}
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onAddNewHandler} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default CreateTeacherButton;
