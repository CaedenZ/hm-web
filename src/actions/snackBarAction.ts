import { createAction } from "typesafe-actions";

const CLOSS_SNACKBAR = "CLOSS_SNACKBAR"
export const closeSnackBarAction = createAction(CLOSS_SNACKBAR,
    action => {
        return () => action()
    })

const SHOW_SNACKBAR = "SHOW_SNACKBAR"
export const showSnackBarAction = createAction(SHOW_SNACKBAR,
    action => {
        return () => action()
    })
