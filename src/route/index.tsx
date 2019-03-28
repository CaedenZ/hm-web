import React from "react";
import { SharedDispatchProps } from "../interface/propsInterface";

import LoginPage from "../scenes/LoginPage";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "../scenes/HomePage";
import ResponsiveDrawer from "../Layout/default";
import ForgetPasswordPage from "../scenes/ForgetPasswordPage";
import ResetPasswordPage from "../scenes/ResetPasswordPage";
import CreateUserPage from "../scenes/UserPage/create/index";
import CreateCompanyPage from "../scenes/CompanyPage/create/index";
import UserPage from "../scenes/UserPage";
import CompanyPage from "../scenes/CompanyPage";
import ProfilePage from "../scenes/ProfilePage";
import { RootState } from "../reducer";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../helper/dispachProps";
import UnitPage from "../scenes/UnitPage";
import RolePage from "../scenes/RolePage";

export interface Props extends InState { }

interface State { }

interface InState {
    init: boolean
}

class RootRoute extends React.Component<Props, State>{
    render() {
        if (this.props.init) {
            return (
                <Router>
                    <Switch>
                        {/* <Route exact path="/" component={Home} /> */}
                        {/* both /roster and /roster/:number begin with /roster */}
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/forgetpassword" component={ForgetPasswordPage} />
                        <Route exact path="/resetpassword" component={ResetPasswordPage} />
                        {/* <Route exact path="/" component={ResponsiveDrawer} /> */}
                        <Route exact path="/" render={() => (<ResponsiveDrawer> <HomePage /> </ResponsiveDrawer>)} />
                        <Route exact path="/homepage" component={HomePage} />
                        <Route exact path="/profile" render={() => (<ResponsiveDrawer><ProfilePage /></ResponsiveDrawer>)} />
                        <Route exact path="/user" render={() => (<ResponsiveDrawer> <UserPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/user/create" render={() => (<ResponsiveDrawer> <CreateUserPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/company" render={() => (<ResponsiveDrawer> <CompanyPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/company/create" render={() => (<ResponsiveDrawer> <CreateCompanyPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/unit" render={() => (<ResponsiveDrawer> <UnitPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/role" render={() => (<ResponsiveDrawer> <RolePage /> </ResponsiveDrawer>)} />
                    </Switch>
                </Router>
            )
        }
        else {
            return (
                <div />
            )
        }
    }
}

function mapStateToProps(state: RootState) {
    return {
        init: state.initReducer.init
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootRoute)