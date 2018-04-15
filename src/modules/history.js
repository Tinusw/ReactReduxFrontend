// / This file creates a new instance of browserHistory.
// BrowserRouter wont allow you to use methods like push() inside an action creator for instance
// This is because it creates its own instance of history and listens for changes on that
// So new instances will change the url but not update BrowserRouter
// This module takes care of that by giving action creators a shared history to reference

import { createBrowserHistory } from 'history'

export default createBrowserHistory({})
