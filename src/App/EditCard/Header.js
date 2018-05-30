import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Inbox from "@material-ui/icons/Inbox";
import Close from "@material-ui/icons/Close";
import TextArea from "react-textarea-autosize";
import Typography from "@material-ui/core/Typography";
import { fileAbsolute } from "paths.macro";

import { moduleName } from "../utils";
import { buttonIcon, headerTextarea } from "../styles";

const styles = {
  root: {
    display: "flex",
    alignItems: "flex-start",
    "& svg": { color: "rgb(153, 153, 153)" },
    "& h2": { width: "100%" },
    "& textarea": {
      ...headerTextarea,
      marginRight: 15
    }
  },
  close: {
    ...buttonIcon,
    margin: 0,
    "&:hover": {
      color: "black"
    }
  }
};

const View = ({ classes, className = "", text }) => {
  return (
    <div className={`${classes.root} ${className}`}>
      <Inbox />
      <Typography
        role="heading"
        variant="title"
        component={TextArea}
        defaultValue={text}
        spellCheck={false}
      />
      <button className={classes.close}>
        <Close />
      </button>
    </div>
  );
};

const Styled = withStyles(styles)(View);

Styled.displayName = moduleName(fileAbsolute);

Styled.propTypes = {
  text: PropTypes.string.isRequired
};

export default Styled;
