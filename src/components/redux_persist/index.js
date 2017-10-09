import _ from 'lodash'
import {
  getStoredState as origGetStoredState,
  createPersistor as origCreatePersistor,
  createTransform,
} from 'redux-persist'

// define which keys to persist in local storage
const PERSIST_KEYS = [
  'session.auth_token'
]

const CONFIG = {
  transforms: [createTransform(
    (inboundState, key) => {
      // pick only keys that are needed for persistence
      const keys = PERSIST_KEYS.map(k => k.replace(new RegExp(`^${_.escapeRegExp(key)}\\.`), ''))
      return _.pick(inboundState, keys)
    }
  )],
  keyPrefix: `reduxStore-v1:`,
}

const getStoredStatePromise = () => (
  new Promise((resolve, reject) => {
    origGetStoredState(CONFIG, (err, restoredState) => {
      if (err) reject(err)
      else resolve(restoredState)
    })
  })
)

const getStoredState = async () => {
  const restoredState = await getStoredStatePromise()
  return _.pick(restoredState, PERSIST_KEYS)
}

const createPersistor = store => origCreatePersistor(store, CONFIG)

export default async function createCustomStore() {
  // ...
  const restoredState = await getStoredState()
  _.merge(initialState, restoredState)

  const store = createStore(..., initialState)
  createPersistor(store)

  return store
}