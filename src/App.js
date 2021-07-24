import { Fragment } from "react";
import { Route, Switch } from "react-router";
import { AdminLayout } from "./components/layout/AdminLayout";
import Login from "./components/layout/Login";
import { NavigationBar } from "./components/navigation/NavigationBar";
import PrivateRoute from "./components/widgets/PrivateRoute";

export function App(props) {
  return (
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" component={AdminApp} />
      </Switch>
    </div>
  );
}

function AdminApp(props) {
  return (
    <Fragment>
      <NavigationBar />
      <main>
        <AdminLayout />
      </main>
    </Fragment>
  );
}
