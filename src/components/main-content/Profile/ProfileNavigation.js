import { Button, Box, Avatar, Divider, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { logOut } from "../../../store/slices/userSlice";

export function ProfileNavigation(props) {
  const userInfor = useSelector((state) => state.user.userInform.user);
  const [tabs, setTabs] = useState(["Profile"]);
  const history = useHistory();
  const dispatch = useDispatch();
  const logOutClickHandler = () => {
    localStorage.clear();
    dispatch(logOut());
    history.push("/");
  };

  const navButtons = tabs.map((tab, index) => (
    <NavButton
      text={tab}
      color={props.currentTabIndex === index ? "primary" : "default"}
      onClick={() => props.onClickTab(index)}
    />
  ));

  useEffect(() => {
    if (userInfor.role !== 2) {
      setTabs(["Profile"]);
    }
  }, [userInfor.role]);

  return (
    <Grid container direction="column" justifyContent="flex-start">
      <ProfileHeader userInfor={props.userInfor} />
      <Divider />
      {navButtons}
      <NavButton
        text={"LOG OUT"}
        color={"default"}
        onClick={logOutClickHandler}
      />
    </Grid>
  );
}

function NavButton(props) {
  return (
    <Button
      href={props.href}
      fullWidth="true"
      style={{ height: "48px" }}
      onClick={props.onClick}
      variant="contained"
      color={props.color}
    >
      {props.text}
    </Button>
  );
}

function ProfileHeader(props) {
  const userInfor = props.userInfor;
  return (
    <Grid Container direction="column">
      <Box display="flex" justifyContent="center" width="100%" marginTop="16px">
        <Avatar style={{ height: "160px", width: "160px" }} />
      </Box>
      <Box margin="16px">
        <text style={{ fontWeight: "bold", fontSize: "20px" }}>
          {`${userInfor.last_name} ${userInfor.first_name}`}{" "}
        </text>
      </Box>
    </Grid>
  );
}
