import { Box, Grid, TextField, Button } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserThunk,
} from "../../../store/slices/userSlice";
import { HeaderContainer } from "./Profile Components/HeaderContainer";
import { RoundedTextField } from "../../widgets/TextField/RoundedTextField";
import { useSelector } from "react-redux";
import Status from "../../../constants/status-constants";
import { LoadingComponent } from "../../LoadingComponent";

export function ProfileContainer(props) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInform.user);
  const status = useSelector((state) => state.user.userInform.status.status);
  const isLoading = status === Status.LOADING_STATUS;

  const [changePasswordInfo, setChangePassword] = useState({});
  const [changeNameInfo, setChangeName] = useState({
    user_id: userInfo?.user_id,
    first_name: userInfo?.first_name,
    last_name: userInfo?.last_name,
  });

  const changeNameHandler = () => {
    dispatch(updateUserThunk(changeNameInfo));
  };

  const changePasswordHandler = () => {};

  const handleChangeInputPassword = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setChangePassword((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleChangeInputName = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setChangeName((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <Box padding="16px" borderLeft={0.5} borderColor="grey.500">
      <Grid container direction="column">
        <HeaderContainer text="My Profile" />
        <ProfileField
          name="first_name"
          onChange={handleChangeInputName}
          label="First Name"
          value={changeNameInfo.first_name}
        />

        <ProfileField
          name="last_name"
          onChange={handleChangeInputName}
          label="Last Name"
          value={changeNameInfo.last_name}
        />
        <ProfileField label="Email" value={userInfo?.email} disable={true} />

        <Box my="32px">
          <Button
            variant="contained"
            color="primary"
            onClick={changeNameHandler}
          >
            Save
          </Button>
        </Box>
      </Grid>
      {userInfo?.role === 2 && (
        <Grid container direction="column" spacing={1}>
          <Box
            ml="4px"
            mt="32px"
            mb="16px"
            justifyContent="flex-start"
            display="flex"
          >
            <text style={{ fontWeight: "bold" }}>Password</text>
          </Box>
          <RoundedTextField
            name="old_password"
            placeHolder="current password"
            onChange={handleChangeInputPassword}
            type="password"
          />
          <RoundedTextField
            name="password"
            placeHolder="new password"
            onChange={handleChangeInputPassword}
            type="password"
          />
          <Box my="32px">
            <Button
              variant="contained"
              color="primary"
              onClick={changePasswordHandler}
            >
              Change Password
            </Button>
          </Box>
        </Grid>
      )}
      <LoadingComponent isLoading={isLoading} />
    </Box>
  );
}

function ProfileField(props) {
  const handlerChange = (event) => {
    if (props.onChange) {
      props.onChange(event);
    }
  };
  return (
    <Grid container direction="column">
      <Box
        ml="4px"
        mt="32px"
        mb="16px"
        justifyContent="flex-start"
        display="flex"
      >
        <text style={{ fontWeight: "bold" }}>{props.label}</text>
      </Box>
      <TextField
        onChange={handlerChange}
        name={props.name}
        id="outlined-basic"
        value={props.value}
        variant="outlined"
        disabled={props.disable}
      />
    </Grid>
  );
}
