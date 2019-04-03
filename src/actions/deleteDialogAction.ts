import { createAction } from "typesafe-actions";

const CLOSS_DIALOG = "CLOSS_DIALOG"
export const closeDialogAction = createAction(CLOSS_DIALOG,
    action => {
        return () => action()
    })

const SHOW_DIALOG = "SHOW_DIALOG"
export const showDialogAction = createAction(SHOW_DIALOG,
    action => {
        return (payload) => action(payload)
    })
