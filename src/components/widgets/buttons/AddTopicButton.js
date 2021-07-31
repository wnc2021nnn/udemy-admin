import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Add, Edit } from "@material-ui/icons";
import AppTheme from "../../../constants/theme";
import { useDispatch } from "react-redux";
import {
  addNewTopicThunk,
  updateTopicThunk,
} from "../../../store/slices/categoriesSlice";

export default function AddTopicButton(props) {
  const { categoryId, topicId, isUpdate, topicTitle } = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  let newTopicTitle = topicTitle ?? "";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onAddNewHandler = () => {
    if (isUpdate) {
      const updateTopic = {
        topic_id: topicId,
        category_id: categoryId,
        title: newTopicTitle,
      };
      console.log(updateTopic);
      dispatch(updateTopicThunk(updateTopic));
    } else {
      const newTopic = {
        category_id: categoryId,
        title: newTopicTitle,
      };
      dispatch(addNewTopicThunk(newTopic));
    }
    handleClose();
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        {isUpdate ? (
          <Edit style={{ color: AppTheme.primary }}></Edit>
        ) : (
          <Add style={{ color: AppTheme.primary }}></Add>
        )}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">
          <text>{isUpdate ? "Update Topic" : "Add New Topic"}</text>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label={props.label ?? "label"}
            type="text"
            fullWidth
            defaultValue={topicTitle ?? ""}
            variant="outlined"
            onChange={(e) => (newTopicTitle = e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onAddNewHandler} color="primary">
            {isUpdate ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
