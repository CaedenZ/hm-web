import React from "react";
import { SharedDispatchProps } from "../interface/propsInterface";

import { connect } from "react-redux";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from '../store'
import { mapDispatchToProps } from "../helper/dispachProps";

import HomeLayout from "../Layout/default";
import PrimaryLayout from "../Layout/PrimaryLayout";
import SecondaryLayout from "../Layout/SecondaryLayout"

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
import UpdateSelfCompanyPage from "../scenes/CompanyPage/updateself";

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

import SectorPage from "../scenes/SectorPage";
import CreateSectorPage from "../scenes/SectorPage/create";
import CreateIndustryPage from "../scenes/SectorPage/createsub";

import RegionPage from "../scenes/RegionPage";
import CreateRegionPage from "../scenes/RegionPage/create";
import UpdateRegionPage from "../scenes/RegionPage/update";

import SubCompanyPage from "../scenes/SubCompanyPage";
import CreateSubCompanyPage from "../scenes/SubCompanyPage/create";
import UpdateSubCompanyPage from "../scenes/SubCompanyPage/update";
import DivisionPage from "../scenes/DivisionPage";


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
                        <Route exact path="/login" render={() => (<SecondaryLayout> <LoginPage /> </SecondaryLayout>)} />
                        <Route exact path="/forgetpassword" component={ForgetPasswordPage} />
                        <Route exact path="/resetpassword" component={ResetPasswordPage} />
                        {/* <Route exact path="/" component={PrimaryLayout} /> */}
                        <Route exact path="/" render={() => (<PrimaryLayout> <HomePage /> </PrimaryLayout>)} />
                        <Route exact path="/profile" render={() => (<PrimaryLayout><ProfilePage /></PrimaryLayout>)} />
                        <Route exact path="/setting" render={() => (<PrimaryLayout><SettingPage /></PrimaryLayout>)} />

                        <Route exact path="/user" render={() => (<PrimaryLayout> <UserPage /> </PrimaryLayout>)} />
                        <Route exact path="/user/create" render={() => (<PrimaryLayout> <CreateUserPage /> </PrimaryLayout>)} />
                        <Route exact path="/user/update" render={() => (<PrimaryLayout> <UpdateUserPage /> </PrimaryLayout>)} />

                        <Route exact path="/company" render={() => (<PrimaryLayout> <CompanyPage /> </PrimaryLayout>)} />
                        <Route exact path="/company/create" render={() => (<PrimaryLayout> <CreateCompanyPage /> </PrimaryLayout>)} />
                        <Route exact path="/company/update" render={() => (<PrimaryLayout> <UpdateCompanyPage /> </PrimaryLayout>)} />
                        <Route exact path="/company/updateself" render={() => (<PrimaryLayout> <UpdateSelfCompanyPage /> </PrimaryLayout>)} />

                        <Route exact path="/entity" render={() => (<PrimaryLayout> <SubCompanyPage /> </PrimaryLayout>)} />
                        <Route exact path="/entity/create" render={() => (<PrimaryLayout> <CreateSubCompanyPage /> </PrimaryLayout>)} />
                        <Route exact path="/entity/update" render={() => (<PrimaryLayout> <UpdateSubCompanyPage /> </PrimaryLayout>)} />

                        <Route exact path="/division" render={() => (<PrimaryLayout> <UnitPage /> </PrimaryLayout>)} />
                        <Route exact path="/unit" render={() => (<PrimaryLayout> <DivisionPage /> </PrimaryLayout>)} />
                        <Route exact path="/unit/create" render={() => (<PrimaryLayout> <CreateUnitPage /> </PrimaryLayout>)} />
                        <Route exact path="/unit/update" render={() => (<PrimaryLayout> <UpdateUnitPage /> </PrimaryLayout>)} />
                        <Route exact path="/unit/subunit" render={() => (<PrimaryLayout> <SubUnitPage /> </PrimaryLayout>)} />
                        <Route exact path="/unit/subunit/create" render={() => (<PrimaryLayout> <CreateSubUnitPage /> </PrimaryLayout>)} />
                        <Route exact path="/unit/subunit/update" render={() => (<PrimaryLayout> <UpdateSubUnitPage /> </PrimaryLayout>)} />
                        <Route exact path="/unit/subunit/childunit" render={() => (<PrimaryLayout> <ChildUnitPage /> </PrimaryLayout>)} />
                        <Route exact path="/unit/subunit/childunit/create" render={() => (<PrimaryLayout> <CreateChildUnitPage /> </PrimaryLayout>)} />
                        <Route exact path="/unit/subunit/childunit/update" render={() => (<PrimaryLayout> <UpdateChildUnitPage /> </PrimaryLayout>)} />

                        <Route exact path="/role" render={() => (<PrimaryLayout> <RolePage /> </PrimaryLayout>)} />
                        <Route exact path="/role/create" render={() => (<PrimaryLayout> <CreateRolePage /> </PrimaryLayout>)} />
                        <Route exact path="/role/update" render={() => (<PrimaryLayout> <UpdateRolePage /> </PrimaryLayout>)} />

                        <Route exact path="/jobfunction" render={() => (<PrimaryLayout> <JobFunctionPage /> </PrimaryLayout>)} />
                        <Route exact path="/jobfunction/create" render={() => (<PrimaryLayout> <CreateJobFunctionPage /> </PrimaryLayout>)} />
                        <Route exact path="/jobfunction/createsub" render={() => (<PrimaryLayout> <CreateSubJobFunctionPage /> </PrimaryLayout>)} />

                        <Route exact path="/sector" render={() => (<PrimaryLayout> <SectorPage /> </PrimaryLayout>)} />
                        <Route exact path="/sector/create" render={() => (<PrimaryLayout> <CreateSectorPage /> </PrimaryLayout>)} />
                        <Route exact path="/sector/createindustry" render={() => (<PrimaryLayout> <CreateIndustryPage /> </PrimaryLayout>)} />

                        <Route exact path="/region" render={() => (<PrimaryLayout> <RegionPage /> </PrimaryLayout>)} />
                        <Route exact path="/region/create" render={() => (<PrimaryLayout> <CreateRegionPage /> </PrimaryLayout>)} />
                        <Route exact path="/region/update" render={() => (<PrimaryLayout> <UpdateRegionPage /> </PrimaryLayout>)} />

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