import { useState } from "react";
import { Box, TextField, Button, Dialog } from "@material-ui/core";
import AppTheme from "../../constants/theme";
import { useDispatch } from "react-redux";
import { updateTeacherThunk } from "../../store/slices/userSlice";

function UpdateTeacherFormDialog(props) {
  const { user, setOpen, open} = props;
  const dispatch = useDispatch();
  const [newTeacherInfo, setNewTeacherInfo] = useState({
    first_name: "",
    last_name: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = (event) => {
    dispatch(updateTeacherThunk(newTeacherInfo));
    setOpen(false);
    event.preventDefault();
  };

  const onChangeHandler = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setNewTeacherInfo({
      ...newTeacherInfo,
      [name]: value,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box padding={2} width={600}>
        <Box m={2} mb={4}>
          <text style={{ fontSize: "30px" }}>Update Teacher</text>
        </Box>
        <Box>
          <form onSubmit={submitHandler}>
            <Box m={2}>
              <TextField
                autoFocus
                label="Email"
                disabled
                type="text"
                fullWidth
                variant="standard"
                name="email"
                defaultValue={user?.email}
              />
            </Box>
            <Box m={2}>
              <TextField
                autoFocus
                label="First Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={onChangeHandler}
                name="first_name"
                defaultValue={user?.first_name}
              />
            </Box>
            <Box m={2}>
              <TextField
                autoFocus
                label="Last Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={onChangeHandler}
                name="last_name"
                defaultValue={user?.last_name}
              />
            </Box>
            <Box mt={6} maxWidth display="flex" justifyContent="center">
              <Button
                variant="contained"
                style={{ backgroundColor: AppTheme.primary }}
                type="submit"
              >
                <text style={{ color: "white" }}>Submit</text>
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Dialog>
  );
}

export default UpdateTeacherFormDialog;
