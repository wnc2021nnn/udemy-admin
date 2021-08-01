import { Snackbar, CircularProgress } from "@material-ui/core";

export function LoadingComponent(props) {
  const { isLoading } = props;
  return (
    <Snackbar
      open={isLoading}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <CircularProgress />
    </Snackbar>
  );
}
