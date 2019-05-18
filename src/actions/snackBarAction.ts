import { createAction } from "typesafe-actions";

const CLOSE_SNACKBAR = "CLOSE_SNACKBAR"
export const closeSnackBarAction = createAction(CLOSE_SNACKBAR,
    action => {
        return () => action()
    })

const SHOW_SNACKBAR = "SHOW_SNACKBAR"
export const showSnackBarAction = createAction(SHOW_SNACKBAR,
    action => {
        return () => action()
    })
