import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import grey from "@material-ui/core/colors/grey";
import { fileAbsolute } from "paths.macro";

import { moduleName } from "../utils";
import * as labels from "../labels";

const styles = {
  root: {
    width: 300,
    "& [role='heading']": {
      paddingTop: 8,
      color: grey[700]
    },
    "& [role='menu']": {
      "& *": {
        fontWeight: 700
      },
      "& hr": {
        margin: "5px 10px"
      },
      "& [role='menuitem']": {
        padding: 3,
        paddingLeft: 10,
        "&:hover": {
          backgroundColor: "rgb(41, 143, 202)",
          "& p": { color: "white" }
        }
      }
    }
  }
};

const View = ({ classes, actions, listBeingEdited, ...rest }) => {
  return (
    <Paper
      className={classes.root}
      aria-describedby={labels.cardsListActionsMenuDescription.id}
      {...rest}
    >
      <Typography role="heading" align="center">
        List Actions
      </Typography>
      <MenuList dense={true} onClick={() => actions.cardsList.finishEdit()}>
        {[
          "",
          "Add Card...",
          "Copy List...",
          "Move List...",
          "Watch",
          "",
          "Sort By",
          "",
          "Move All Cards in This List...",
          "Archive All Cards in This List...",
          "",
          "Archive This List"
        ].map((item, idx) => {
          if (!Boolean(item)) return <Divider key={idx} />;
          return (
            <MenuItem key={idx}>
              <Typography> {item} </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Paper>
  );
};

const Styled = withStyles(styles)(View);

Styled.displayName = moduleName(fileAbsolute);

Styled.propTypes = {
  actions: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  ).isRequired,
  listBeingEdited: PropTypes.shape({
    id: PropTypes.number.isRequired,
    anchorElementBox: PropTypes.shape({
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      bottom: PropTypes.number.isRequired,
      right: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export default Styled;
