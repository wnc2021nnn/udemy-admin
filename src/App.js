import { Fragment } from "react";
import { Route, Switch } from "react-router";
import { AdminLayout } from "./components/layout/AdminLayout";
import Login from "./components/layout/Login";
import ProfilePage from "./components/main-content/Profile/ProfilePage";
import { NavigationBar } from "./components/navigation/NavigationBar";
import PrivateRoute from "./components/widgets/PrivateRoute";

export function AdminApp(props) {
  return (
    <Fragment>
      <NavigationBar />
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/profile" component={ProfilePage}></PrivateRoute>
        <PrivateRoute path="/" component={AdminLayout}></PrivateRoute>
      </Switch>
    </Fragment>
  );
}
