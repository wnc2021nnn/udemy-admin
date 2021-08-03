import { useState } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import AppTheme from "../../constants/theme";
import { useDispatch } from "react-redux";
import { createTeacherThunk } from "../../store/slices/userSlice";

function CreateTeacherForm(props) {
  const { onSubmit } = props;
  const dispatch = useDispatch();
  const [newTeacherInfo, setNewTeacherInfo] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const submitHandler = (event) => {
    dispatch(createTeacherThunk(newTeacherInfo));
    onSubmit();
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
    <Box padding={2}>
      <Box m={2} mb={4}>
        <text style={{ fontSize: "30px" }}>Create New Teacher</text>
      </Box>
      <Box>
        <form onSubmit={submitHandler}>
          <Box m={2}>
            <TextField
              autoFocus
              label="Email"
              type="text"
              fullWidth
              variant="standard"
              onChange={onChangeHandler}
              name="email"
            />
          </Box>
          <Box m={2}>
            <TextField
              autoFocus
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={onChangeHandler}
              name="password"
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
  );
}

export default CreateTeacherForm;
