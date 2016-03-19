let origin = {
  lengths: 0,
  letters: 0,
  numbers: 0,
  specials: 0,
  capitals: 0
}

const variables = (state = origin, action) => {
  switch (action.type) {
    case 'SET_VARIABLE':
      return {...state, [action.variable]:action.val}
    default:
      return state
  }
}

export default variables
