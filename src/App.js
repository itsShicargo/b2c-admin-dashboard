import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
// import { PersistGate } from 'redux-persist/integration/react'
import Theme from 'components/template/Theme'
import store, { persistor } from './store'
import Layout from 'components/layout'
import history from './history'
// import mockServer from './mock'
// import appConfig from 'configs/app.config'
// import './locales'
// import axiosUtils from 'utils/axios-utils'

// const environment = process.env.NODE_ENV

// if (appConfig.enableMock) {
//     mockServer({ environment })
// }

function App() {

    // useEffect(() => {
    //     axiosUtils.setBaseAPI_URL('https://api.shipcluescargo.com')
    // }, [])

    return (
        <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
                <BrowserRouter history={history}>
                    <Theme>
                        <Layout />
                    </Theme>
                </BrowserRouter>
            {/* </PersistGate> */}
        </Provider>
    )
}

export default App
