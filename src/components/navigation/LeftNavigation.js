import { Button, Grid } from "@material-ui/core";

export function LeftNavigation(props) {
  const tabs = ["Categories", "Courses", "Students", "Lecturers"];

  const navButtons = tabs.map((tab, index) => (
    <NavButton
      text={tab}
      color={props.currentTabIndex === index ? "primary" : "default"}
      onClick={() => props.onClickTab(index)}
    />
  ));

  return (
    <Grid container direction="column" justifyContent="flex-start">
      {navButtons}
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
