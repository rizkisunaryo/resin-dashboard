import {dispatcher} from '../../utils/ActionUtils'
import {dispatch} from '../../utils/TestingUtils'

import {reduxState} from '../../store'

let testReduxState = {value: {...reduxState}}

describe('ActionUtils', () => {
  describe('dispatcher', () => {
    test('check whether the result is expected', () => {
      dispatcher(dispatch(testReduxState), 'testing', 'drone', {
        droneIds: ['a', 'b', 'c']
      })
      expect(testReduxState.value).toEqual({
        ...reduxState,
        actionName: 'testing',
        drone: {
          ...reduxState.drone,
          droneIds: ['a', 'b', 'c']
        }
      })
    })
  })
})
