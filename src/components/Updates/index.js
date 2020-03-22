import React from 'react'
import feathers from '@feathersjs/client'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'
import PullToRefresh from 'pulltorefreshjs'
import TouchEmulator from 'hammer-touchemulator'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Box } from 'grey-vest'
import { exampleTypes } from 'contexture-client'
import ContextureMobx from 'contexture-react/dist/utils/contexture-mobx'
import service from './service'
import s from '../../assets/css/page.css'

TouchEmulator()

JavascriptTimeAgo.locale(en)

let state = observable({
  data: {},
  id: 'null',
  tree: {},
  numOfCases: 0,
  viewport: {} 
})

const getData = async () => {
  var app = feathers();
  var restClient = feathers.rest('https://api.sickly.app')
  app.configure(restClient.fetch(window.fetch));
  state.data = await app.service('updates').find()
}
getData()

let types = exampleTypes
          

let Client = ContextureMobx({
  types,
  service,
})

state.tree = Client({
  key: 'root',
  type: 'group',
  join: 'and',
  schema: 'Test',
  children: [
    { key: 'criteria', 
      type: 'group', 
      join: 'and', 
      children: [
        { key: 'city', type: 'text', field: 'city', },
        { key: 'currency', type: 'text', field: 'currency', },
        { key: 'type', type: 'text', field: 'type', },
        { key: 'fiat_currency', type: 'text', field: 'fiat_currency', },
        { key: 'fiat_value', type: 'text', field: 'fiat_value', },
      ], 
    },
    { key: 'id', type: 'text', field: 'id', data: { operator: 'is', value: state.id } },
    { key: 'results', type: 'results' },
  ],
})



const Cards = observer(() => state.data.reverse().map((card, i) => 
  <div key={i} className={s.cases}>
    <Box className={s.card}> 
      <h3>{card.title}</h3>
      <a href={card.url}>
        <small className={s.date}>{new URL(card.url).hostname.replace('www.','')}</small>
      </a>
      <img src={card.images[0]} />
    </Box>
  </div>
))

let Cases = observer((props) => { 
  state.viewport = props.viewport 

  PullToRefresh.init({
    onRefresh() {
      getData()
    }
  })
  
  React.useEffect(() => {
    PullToRefresh.init({
      onRefresh() {
        getData()
      }
    })

    return () => PullToRefresh.destroyAll()
  }, []) 

  return <Cards />
})

export default Cases
