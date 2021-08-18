import { useDispatch, useSelector } from "react-redux";
import Status from "../../constants/status-constants";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../../utils/auth/verify";
import { logOut } from "../../store/slices/userSlice";
import { Box } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
export default function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const loginInform = useSelector((state) => state.user.userInform);
  if (loginInform.user.role !== 0) {
    dispatch(logOut());
    return (
      <Box>
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      </Box>
    );
  }
  const isLogin =
    loginInform.status.status === Status.SUCCESS_STATUS || getToken();
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
