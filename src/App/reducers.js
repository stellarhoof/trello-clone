const nextCardId = cards =>
  cards.reduce((max, card) => Math.max(max, card.id), 0) + 1;

const rootReducer = (state, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case "ADD_CARD":
      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.id === action.listId)
            return {
              ...list,
              cards: [
                ...list.cards,
                { id: nextCardId(list.cards), title: "Title..." }
              ]
            };
          return list;
        })
      };
    case "START_EDIT_LIST":
      return { ...state, listBeingEdited: { ...payload } };
    case "FINISH_EDIT_LIST":
      return { ...state, listBeingEdited: null };
    case "START_EDIT_CARD":
      return { ...state, cardBeingEdited: action.id };
    case "FINISH_EDIT_CARD":
      return { ...state, cardBeingEdited: null };
    case "START_QUICK_EDIT_CARD":
      return { ...state, cardBeingQuickEdited: { ...payload } };
    case "FINISH_QUICK_EDIT_CARD":
      return { ...state, cardBeingQuickEdited: null };
    default:
      return state;
  }
};

export default rootReducer;