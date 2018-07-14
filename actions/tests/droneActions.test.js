import {updateDroneIdsAction, updateDronesObjAction} from '../../actions/droneActions'
import {reduxState} from '../../store'
import {dispatch} from '../../utils/TestingUtils'

const getState = () => reduxState

const drone1 = {'drone1': {lat: 0.001, long: 0.002}}

describe('droneActions', () => {
  describe('updateDroneIdsAction', () => {
    test('check whether the result is expected', async () => {
      let testReduxState = {value: {...reduxState}}
      await updateDroneIdsAction(drone1)()(dispatch(testReduxState), getState)
      expect(testReduxState.value).toEqual({
        ...reduxState,
        actionName: 'updateDroneIdsAction: 1',
        drone: {
          ...reduxState.drone,
          droneIds: ['drone1']
        }
      })
    })
  })

  describe('updateDronesObjAction', () => {
    test('check whether the result is expected', async () => {
      let testReduxState = {value: {...reduxState}}
      await updateDronesObjAction(drone1)()(dispatch(testReduxState), getState)
      expect(testReduxState.value).toEqual({
        ...reduxState,
        actionName: 'updateDronesObjAction: 1',
        drone: {
          ...reduxState.drone,
          dronesObj: drone1
        }
      })
    })
  })
})
