import {dispatcher} from '../utils/ActionUtils'

export const droneDispatcher = (dispatch, actionName, newStatusState) => {
  dispatcher(dispatch, actionName, 'drone', newStatusState)
}

export const updateDroneIdsAction = dronesObj => {
  return () => async (dispatch, getState) => {
    const stateDroneIds = getState().drone.droneIds
    const bePushedDroneIds = Object.keys(dronesObj)
      .filter(droneId => stateDroneIds.indexOf(droneId) < 0)
    droneDispatcher(dispatch, 'updateDroneIdsAction: 1', {droneIds: stateDroneIds.concat(bePushedDroneIds)})
  }
}

export const updateDroneIdsUsingIdsAction = droneIds => {
  return () => async (dispatch, getState) => {
    const stateDroneIds = getState().drone.droneIds
    const bePushedDroneIds = droneIds.filter(droneId => stateDroneIds.indexOf(droneId) < 0)
    droneDispatcher(dispatch, 'updateDroneIdsUsingIdsAction: 1', {droneIds: stateDroneIds.concat(bePushedDroneIds)})
  }
}

export const updateDronesObjAction = dronesObj => {
  return () => async (dispatch, getState) => {
    const stateDronesObj = getState().drone.dronesObj
    droneDispatcher(dispatch, 'updateDronesObjAction: 1', {dronesObj: {...stateDronesObj, ...dronesObj}})
  }
}

export const notMovingDronesAction = notMovingDroneIds => {
  return () => async (dispatch) => {
    droneDispatcher(dispatch, 'notMovingDronesAction: 1', {notMovingDroneIds})
  }
}
