import { Box } from "@material-ui/core";

export function HeaderContainer(props) {
  return (
    <Box mb="32px">
      <text style={{ fontSize: "24px" }}>{props.text}</text>
    </Box>
  );
}
