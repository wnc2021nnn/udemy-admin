import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Add } from "@material-ui/icons";
import AppTheme from "../../../constants/theme";
import { useDispatch } from "react-redux";
import { addNewCategoryThunk } from "../../../store/slices/categoriesSlice";

export default function AddCategoryButton(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  let newCategoryTitle = "";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onAddNewHandler = () => {
    dispatch(addNewCategoryThunk(newCategoryTitle))
    handleClose();
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        <Add style={{ color: AppTheme.primary }}></Add>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
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
            onChange={(e) => (newCategoryTitle = e.target.value)}
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
    </div>
  );
}
