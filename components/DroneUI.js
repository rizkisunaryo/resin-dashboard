import lodashGet from 'lodash/get'
import {PureComponent} from 'react'
import {connect} from 'react-redux'
import { calculateSpeed } from '../utils/LatLongUtils'

class DroneUI extends PureComponent {
  constructor (props) {
    super(props)
    this.prevTime = new Date()
    this.state = {speed: 0}
  }
  componentDidUpdate (prevProps) {
    if (prevProps.droneObj.lat !== this.props.droneObj.lat ||
      prevProps.droneObj.long !== this.props.droneObj.long) {
      const curDate = new Date()
      const timeInterval = (curDate.getTime() - this.prevTime.getTime()) / 1000
      const speed = calculateSpeed(
        this.props.droneObj.lat,
        this.props.droneObj.long,
        prevProps.droneObj.lat,
        prevProps.droneObj.long,
        timeInterval
      )
      this.setState({speed})
    }
  }
  render () {
    if (!this.props.id) return null
    return (
      <div
        style={{
          position: 'absolute',
          left: this.props.droneObj.long * 25000,
          bottom: this.props.droneObj.lat * 25000,
          color: this.props.isNotMoving ? 'red' : 'black'
        }}>
        {this.props.id} <br />
        {this.props.droneObj.lat.toString().substring(0, 7)},
        {this.props.droneObj.long.toString().substring(0, 7)} <br />
        {this.props.isNotMoving ? 0 : this.state.speed} m/s
      </div>
    )
  }
}

export default connect((state, ownProps) =>
  ({
    droneObj: lodashGet(state.drone, `dronesObj['${ownProps.id}']`, {}),
    isNotMoving: state.drone.notMovingDroneIds.indexOf(ownProps.id) > -1
  }),
{})(DroneUI)
