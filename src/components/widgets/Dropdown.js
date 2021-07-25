import { Button, MenuList, Toolbar } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { useState, useRef, useEffect } from "react";
import AppTheme from "../../constants/theme";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { Tooltip } from "@material-ui/core";

export function CustomDropDown(props) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const clickItemHandler = (event, index) => {
    props.clickItemCallback(index);
    handleClose(event);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        style={{ backgroundColor: AppTheme.primary }}
        onClick={handleToggle}
      >
        <text style={{ color: AppTheme.secondary }}>
          {props.options[props.selectedIndex ?? 0]}
        </text>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <Toolbar>
                <Tooltip>
                  <MenuList autoFocusItem={open} id="menu-list-grow">
                    {props.options.map((value, index) => {
                      return (
                        <MenuItem
                          key={`menu item ${index}`}
                          onClick={(event) => clickItemHandler(event, index)}
                        >
                          {value}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Tooltip>
              </Toolbar>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
