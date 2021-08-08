import { Grid, Container, Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfor } from "../../../store/slices/userSlice";
import { getUserId } from "../../../utils/auth/verify";
import { ProfileContainer } from "./ProfileContainer";
import { ProfileNavigation } from "./ProfileNavigation";
import { LoadingComponent } from "../../LoadingComponent";
import Status from "../../../constants/status-constants";

export default function ProfilePage(props) {
  const [tabIndex, setTabIndex] = useState(0);
  const userInfo = useSelector((state) => state.user.userInform.user);
  const dispatch = useDispatch();
  const [tabViews, setTabViews] = useState([
    <ProfileContainer userInfo={userInfo} />,
  ]);

  const getUserByIdAPI = () => {
    const userId = getUserId();
    if (userId) dispatch(fetchUserInfor(userId));
  };

  useEffect(() => {
    getUserByIdAPI();
  }, []);

  useEffect(() => {
    if (userInfo.role !== 2) {
      setTabViews([<ProfileContainer userInfor={userInfo} />]);
    }
  }, [userInfo, userInfo.role]);
  return (
    <Container>
      <Box border={1} borderRadius={8} mt={12} borderColor="grey.500">
        <Grid container maxWidth="lg">
          <Grid item xs={3}>
            <ProfileNavigation
              currentTabIndex={tabIndex}
              onClickTab={setTabIndex}
              userInfor={userInfo}
            />
          </Grid>
          <Grid item xs={9}>
            {tabViews[tabIndex]}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
