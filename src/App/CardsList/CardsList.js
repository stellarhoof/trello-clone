import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fileAbsolute } from "paths.macro";

import Header from "./Header";
import Cards from "./Cards";
import { button } from "../styles";
import { moduleName } from "../utils";
import { mapDispatchToProps } from "../redux";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    background: "rgb(226, 228, 230)",
    "& > button": {
      ...button,
      justifyContent: "left",
      fontWeight: 400
    }
  },
  header: {
    margin: 5
  }
};

const View = ({ classes, actions, list }) => {
  return (
    <Paper
      data-listid={list.id}
      component="section"
      elevation={1}
      className={classes.root}
    >
      <Header
        className={classes.header}
        listId={list.id}
        listTitle={list.title}
      />
      <div style={{ overflowY: "scroll" }}>
        <Cards cards={list.cards} />
      </div>
      <Button onClick={() => actions.card.add({ listId: list.id })}>
        Add a card...
      </Button>
    </Paper>
  );
};

const mapStateToProps = (state, ownProps) => ({
  list: state.lists.find(list => list.id === ownProps.list.id)
});

const Container = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(View)
);

Container.displayName = moduleName(fileAbsolute);

export const listType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired
});

Container.propTypes = {
  list: listType
};

export default Container;
