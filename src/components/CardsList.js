import React from "react";
import { findDOMNode } from "react-dom";
import path from "path";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import grey from "material-ui/colors/grey";
import PropTypes from "prop-types";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import TextArea from "./TextArea";
import CardsListCard from "./CardsListCard";
import * as Labels from "./labels";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "100%",
    background: "rgb(226, 228, 230)",
    "& > button": {
      justifyContent: "left",
      textTransform: "none"
    },
    "& ul": {
      padding: 0,
      margin: 0,
      height: "100%",
      "& li": {
        margin: 8,
        marginTop: 2,
        cursor: "pointer"
      }
    }
  },
  listHeader: {
    display: "flex",
    flexShrink: 0,
    justifyContent: "space-between",
    margin: 5,
    "& [role='heading']": {
      flexBasis: "100%",
      fontWeight: 700,
      paddingBottom: 0,
      paddingTop: 3,
      paddingLeft: 5,
      marginRight: 8
    },
    "& p[role='heading']": {
      cursor: "pointer"
    },
    "& button": {
      alignSelf: "flex-start",
      // Reusable styles
      borderWidth: 0,
      background: "none",
      outline: "none",
      cursor: "pointer",
      borderRadius: 4,
      padding: 3,
      "&:hover": {
        background: "#D6D6D6"
      }
    },
    "& svg": {
      // Reusable styles
      padding: 3,
      width: "0.8em",
      height: "0.8em",
      color: grey[700]
    }
  }
};

const findRoot = node =>
  !node.parentElement ? node : findRoot(node.parentElement);

const onOutsideClick = (node, handler) => {
  // It'd be easier to attach to document.body but we might not render into
  // document in tests.
  const root = findRoot(node);
  const onClick = event => {
    if (!node.contains(event.target)) {
      root.removeEventListener("click", onClick);
      handler(event);
    }
  };
  root.addEventListener("click", onClick);
};

const Title = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.editing)
      onOutsideClick(findDOMNode(this), _ => this.setState({ editing: false }));
  }

  render() {
    const props = this.state.editing
      ? {
          component: TextArea,
          value: this.props.text
        }
      : {
          onClick: _ => this.setState({ editing: true }),
          children: this.props.text
        };
    return <Typography role="heading" {...props} />;
  }
};

const View = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: props.cards.length,
      cards: props.cards.map((card, idx) => ({
        id: idx,
        description: card
      }))
    };
  }

  addCard(e) {
    e.preventDefault();
    this.setState((prevState, props) => ({
      counter: prevState.counter + 1,
      cards: [
        ...prevState.cards,
        { id: prevState.counter + 1, description: undefined }
      ]
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cards.length < this.state.cards.length)
      this.cardsListEnd.scrollIntoView();
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper
        component="section"
        elevation={1}
        className={classes.container}
        data-testid="CardsList"
      >
        <div className={classes.listHeader}>
          <Title text={this.props.title} />
          <button
            onClick={e => this.props.onEditList(e.currentTarget)}
            aria-labelledby={Labels.cardsListActionsMenu.id}
            aria-haspopup={true}
          >
            <MoreHoriz />
          </button>
        </div>
        <div style={{ overflowY: "scroll" }}>
          <ul>
            {this.state.cards.map(({ id, description }) => (
              <li key={id} className={classes.container}>
                <CardsListCard
                  description={description}
                  onEditCard={this.props.onEditCard}
                  onEditFullCard={this.props.onEditFullCard}
                />
              </li>
            ))}
          </ul>
          {/* The sole purpose of this div is to allow scrolling to bottom */}
          <div
            style={{ float: "left", clear: "both" }}
            ref={node => (this.cardsListEnd = node)}
          />
        </div>
        <Button onClick={this.addCard.bind(this)}>Add a card...</Button>
      </Paper>
    );
  }
};

View.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  onEditList: PropTypes.func.isRequired,
  onEditCard: PropTypes.func.isRequired,
  onEditFullCard: PropTypes.func.isRequired
};

View.displayName = path.basename(__filename, path.extname(__filename));

export default withStyles(styles)(View);
