import { useSelector } from "react-redux";
import Status from "../../constants/status-constants";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../../utils/auth/verify";
export default function PrivateRoute({ component: Component, ...rest }) {
  const loginInform = useSelector((state) => state.user.userInform);
  const isLogin =
    loginInform.status.status === Status.SUCCESS_STATUS || getToken();
    console.log(isLogin);
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
