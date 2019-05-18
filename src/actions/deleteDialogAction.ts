import { createAction } from "typesafe-actions";

const CLOSE_DIALOG = "CLOSE_DIALOG";
export const closeDialogAction = createAction(CLOSE_DIALOG, action => {
  return () => action();
});

const SHOW_DIALOG = "SHOW_DIALOG";
export const showDialogAction = createAction(SHOW_DIALOG, action => {
  return payload => action(payload);
});
