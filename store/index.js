import Store, { thunk } from 'repatch'

import Development from '../configs/Development'
import ObjectUtils from '../utils/ObjectUtils'

import drone from '../store/droneRedux'

export let reduxState = {
  actionName: '',
  drone
}
const store = new Store(reduxState).addMiddleware(thunk)

if (Development.isDev) {
  // logger middleware
  store.addMiddleware(store => next => reducer => {
    const state = store.getState()
    const nextState = reducer(state)
    if (typeof nextState !== 'function') {
      console.log(
        '\nprevState: ', state,
        '\nnextState: ', nextState,
        '\ndiff: ', ObjectUtils.difference(nextState, state), '\n\n'
      )
    }
    return next(_ => nextState)
  })
}

export default store
