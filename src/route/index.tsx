import React from "react";
import { SharedDispatchProps } from "../interface/propsInterface";

import { connect } from "react-redux";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from '../store'
import { mapDispatchToProps } from "../helper/dispachProps";

import ResponsiveDrawer from "../Layout/default";

import LoginPage from "../scenes/LoginPage";
import ForgetPasswordPage from "../scenes/ForgetPasswordPage";
import ResetPasswordPage from "../scenes/ResetPasswordPage";

import HomePage from "../scenes/HomePage";
import ProfilePage from "../scenes/ProfilePage";
import SettingPage from "../scenes/SettingPage";

import UserPage from "../scenes/UserPage";
import CreateUserPage from "../scenes/UserPage/create/index";
import UpdateUserPage from "../scenes/UserPage/update/index";

import CompanyPage from "../scenes/CompanyPage";
import CreateCompanyPage from "../scenes/CompanyPage/create/index";
import UpdateCompanyPage from "../scenes/CompanyPage/update";

import UnitPage from "../scenes/UnitPage";
import CreateUnitPage from "../scenes/UnitPage/create"
import UpdateUnitPage from "../scenes/UnitPage/update"
import SubUnitPage from "../scenes/UnitPage/subUnit"
import CreateSubUnitPage from "../scenes/UnitPage/subUnit/create"
import UpdateSubUnitPage from "../scenes/UnitPage/subUnit/update"
import ChildUnitPage from "../scenes/UnitPage/subUnit/childUnit"
import CreateChildUnitPage from "../scenes/UnitPage/subUnit/childUnit/create"
import UpdateChildUnitPage from "../scenes/UnitPage/subUnit/childUnit/update"

import RolePage from "../scenes/RolePage";
import CreateRolePage from "../scenes/RolePage/create";
import UpdateRolePage from "../scenes/RolePage/update";

import JobFunctionPage from "../scenes/JobFunctionPage";
import CreateJobFunctionPage from "../scenes/JobFunctionPage/create";
import CreateSubJobFunctionPage from "../scenes/JobFunctionPage/createsub";

import RegionPage from "../scenes/RegionPage";
import CreateRegionPage from "../scenes/RegionPage/create";
import UpdateRegionPage from "../scenes/RegionPage/update";

import SubCompanyPage from "../scenes/SubCompanyPage";
import CreateSubCompanyPage from "../scenes/SubCompanyPage/create";
import UpdateSubCompanyPage from "../scenes/SubCompanyPage/update";


export interface Props extends InState { }

interface State { }

interface InState {
    init: boolean
}

class RootRoute extends React.Component<Props, State>{
    render() {
        if (this.props.init) {
            return (
                <ConnectedRouter history={history}>
                    <Switch>
                        {/* <Route exact path="/" component={Home} /> */}
                        {/* both /roster and /roster/:number begin with /roster */}
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/forgetpassword" component={ForgetPasswordPage} />
                        <Route exact path="/resetpassword" component={ResetPasswordPage} />
                        {/* <Route exact path="/" component={ResponsiveDrawer} /> */}
                        <Route exact path="/" render={() => (<ResponsiveDrawer> <HomePage /> </ResponsiveDrawer>)} />
                        <Route exact path="/profile" render={() => (<ResponsiveDrawer><ProfilePage /></ResponsiveDrawer>)} />
                        <Route exact path="/setting" render={() => (<ResponsiveDrawer><SettingPage /></ResponsiveDrawer>)} />

                        <Route exact path="/user" render={() => (<ResponsiveDrawer> <UserPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/user/create" render={() => (<ResponsiveDrawer> <CreateUserPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/user/update" render={() => (<ResponsiveDrawer> <UpdateUserPage /> </ResponsiveDrawer>)} />

                        <Route exact path="/company" render={() => (<ResponsiveDrawer> <CompanyPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/company/create" render={() => (<ResponsiveDrawer> <CreateCompanyPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/company/update" render={() => (<ResponsiveDrawer> <UpdateCompanyPage /> </ResponsiveDrawer>)} />

                        <Route exact path="/subcompany" render={() => (<ResponsiveDrawer> <SubCompanyPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/subcompany/create" render={() => (<ResponsiveDrawer> <CreateSubCompanyPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/subcompany/update" render={() => (<ResponsiveDrawer> <UpdateSubCompanyPage /> </ResponsiveDrawer>)} />

                        <Route exact path="/unit" render={() => (<ResponsiveDrawer> <UnitPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/unit/create" render={() => (<ResponsiveDrawer> <CreateUnitPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/unit/update" render={() => (<ResponsiveDrawer> <UpdateUnitPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/unit/subunit" render={() => (<ResponsiveDrawer> <SubUnitPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/unit/subunit/create" render={() => (<ResponsiveDrawer> <CreateSubUnitPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/unit/subunit/update" render={() => (<ResponsiveDrawer> <UpdateSubUnitPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/unit/subunit/childunit" render={() => (<ResponsiveDrawer> <ChildUnitPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/unit/subunit/childunit/create" render={() => (<ResponsiveDrawer> <CreateChildUnitPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/unit/subunit/childunit/update" render={() => (<ResponsiveDrawer> <UpdateChildUnitPage /> </ResponsiveDrawer>)} />

                        <Route exact path="/role" render={() => (<ResponsiveDrawer> <RolePage /> </ResponsiveDrawer>)} />
                        <Route exact path="/role/create" render={() => (<ResponsiveDrawer> <CreateRolePage /> </ResponsiveDrawer>)} />
                        <Route exact path="/role/update" render={() => (<ResponsiveDrawer> <UpdateRolePage /> </ResponsiveDrawer>)} />

                        <Route exact path="/jobfunction" render={() => (<ResponsiveDrawer> <JobFunctionPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/jobfunction/create" render={() => (<ResponsiveDrawer> <CreateJobFunctionPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/jobfunction/createsub" render={() => (<ResponsiveDrawer> <CreateSubJobFunctionPage /> </ResponsiveDrawer>)} />

                        <Route exact path="/region" render={() => (<ResponsiveDrawer> <RegionPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/region/create" render={() => (<ResponsiveDrawer> <CreateRegionPage /> </ResponsiveDrawer>)} />
                        <Route exact path="/region/update" render={() => (<ResponsiveDrawer> <UpdateRegionPage /> </ResponsiveDrawer>)} />

                    </Switch>
                </ConnectedRouter>
            )
        }
        else {
            return (
                <div />
            )
        }
    }
}

function mapStateToProps(state: any) {
    return {
        init: state.initReducer.init
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootRoute)