import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AppTheme from "../../../constants/theme";
import { useDispatch } from "react-redux";
import { updateCategoryThunk } from "../../../store/slices/categoriesSlice";
import { Edit } from "@material-ui/icons";

export default function UpdateCategoryButton(props) {
  const { categoryId, categoryTitle } = props;

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  let newCategoryTitle = categoryTitle;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onUpdateHandler = () => {
    const category = {
      category_id: categoryId,
      title: newCategoryTitle,
    };
    dispatch(updateCategoryThunk(category));
    handleClose();
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        <Edit style={{ color: AppTheme.primary }}></Edit>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <text>Update Category</text>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label={props.label ?? "label"}
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={newCategoryTitle}
            onChange={(e) => (newCategoryTitle = e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onUpdateHandler} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
