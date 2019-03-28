import { applyMiddleware, createStore } from "redux"
import { createLogger } from "redux-logger"
import { persistReducer, persistStore, PersistConfig } from "redux-persist"
import storage from "redux-persist/lib/storage"
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"
import { rootReducer, rootEpic } from "../reducer"
import { createEpicMiddleware } from "redux-observable"

const epicMiddleware = createEpicMiddleware()
const persistConfig: PersistConfig = {
    storage,
    key: "root",
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
    timeout: 0, // https://github.com/rt2zz/redux-persist/issues/809
}

const customLogger = createLogger({ collapsed: true })
export const pReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(
    pReducer,
    applyMiddleware(customLogger, epicMiddleware)
)

epicMiddleware.run(rootEpic)

export const persistor = persistStore(store)
