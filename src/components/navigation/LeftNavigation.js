import { Button, Grid } from "@material-ui/core";
import AppTheme from "../../constants/theme";

export function LeftNavigation(props) {
  const tabs = ["Categories", "Courses", "Lecturers", "Student"];

  const navButtons = tabs.map((tab, index) => (
    <NavButton
      text={tab}
      color={props.currentTabIndex === index ? AppTheme.primary : null}
      textColor = {props.currentTabIndex === index ? AppTheme.secondary : AppTheme.black}
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
      style={{ height: "48px", backgroundColor: props.color }}
      onClick={props.onClick}
      variant="contained"
    >
      <text style={{color: props.textColor}}>
      {props.text}
      </text>
    </Button>
  );
}
