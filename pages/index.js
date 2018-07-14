import Head from 'next/head'
import {PureComponent} from 'react'
import {connect, Provider} from 'react-redux'
import openSocket from 'socket.io-client'

import store from '../store'
import {
  updateDroneIdsAction,
  updateDroneIdsUsingIdsAction,
  updateDronesObjAction,
  notMovingDronesAction
} from '../actions/droneActions'
import DroneUI from '../components/DroneUI'

export default class Index extends PureComponent {
  render () {
    return (
      <Provider store={store}>
        <IndexConnect {...this.props} />
      </Provider>
    )
  }
}

class IndexComponent extends PureComponent {
  componentDidMount () {
    const dashboardSocket = openSocket('http://localhost:3010', {path: '/dashboard'})
    dashboardSocket.on('all-drone-coordinates', droneObj => {
      this.props.updateDroneIdsAction(droneObj)
      this.props.updateDronesObjAction(droneObj)
    })
    dashboardSocket.on('dashboard-coordinate', (id, lat, long) => {
      this.props.updateDroneIdsUsingIdsAction([id])
      this.props.updateDronesObjAction({[id]: {id, lat, long}})
    })
    dashboardSocket.on('not-moving-drones', notMovingDroneIds => {
      this.props.notMovingDronesAction(notMovingDroneIds)
    })
    dashboardSocket.on('disconnect', () => {
      this.props.notMovingDronesAction(this.props.droneIds)
    })
  }

  render () {
    return (
      <div style={{
        display: 'flex',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Head>
          <link rel='stylesheet' href='/static/css/base.css' />
        </Head>
        <div style={{position: 'absolute'}}>
          {this.props.droneIds.map(elem => <DroneUI key={elem} id={elem} />)}
        </div>
      </div>
    )
  }
}

const IndexConnect = connect(state => ({
  droneIds: state.drone.droneIds
}), {
  updateDroneIdsAction,
  updateDroneIdsUsingIdsAction,
  updateDronesObjAction,
  notMovingDronesAction
})(IndexComponent)
