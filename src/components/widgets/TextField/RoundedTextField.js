import { TextField } from "@material-ui/core";

export function RoundedTextField(props) {
  const onChangeHandler = (event) => {
    if (props.onChange) {
      props.onChange(event);
    }
  };
  return (
    <TextField
      margin="normal"
      value={props.value}
      variant="outlined"
      placeholder={props.placeHolder}
      onChange={onChangeHandler}
      name={props.name}
      type={props.type}
    />
  );
}
