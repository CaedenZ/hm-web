import React from "react";

import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../store";
import { mapDispatchToProps } from "../helper/dispachProps";

import PrimaryLayout from "../Layout/PrimaryLayout";
import SecondaryLayout from "../Layout/SecondaryLayout";

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
import CreateUnitPage from "../scenes/UnitPage/create";
import UpdateUnitPage from "../scenes/UnitPage/update";
import SubUnitPage from "../scenes/UnitPage/subUnit";
import CreateSubUnitPage from "../scenes/UnitPage/subUnit/create";
import UpdateSubUnitPage from "../scenes/UnitPage/subUnit/update";
import ChildUnitPage from "../scenes/UnitPage/subUnit/childUnit";
import CreateChildUnitPage from "../scenes/UnitPage/subUnit/childUnit/create";
import UpdateChildUnitPage from "../scenes/UnitPage/subUnit/childUnit/update";

import LocationPage from "../scenes/LocationPage";
import CreateLocationPage from "../scenes/LocationPage/create";
import UpdateLocationPage from "../scenes/LocationPage/update";

import JobPositionPage from "../scenes/JobPositionPage";
import CreateJobPositionPage from "../scenes/JobPositionPage/create";
import UpdateJobPositionPage from "../scenes/JobPositionPage/update";

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

import JobGradePage from "../scenes/CompensationSetup/JobGradePage";
import CreateJobGradePage from "../scenes/CompensationSetup/JobGradePage/create";
import UpdateJobGradePage from "../scenes/CompensationSetup/JobGradePage/update";

import AllowancesPage from "../scenes/CompensationSetup/AllowancesPage";
import CreateAllowancesPage from "../scenes/CompensationSetup/AllowancesPage/create";
import UpdateAllowancesPage from "../scenes/CompensationSetup/AllowancesPage/update";

import EquityRangePage from "../scenes/CompensationSetup/LongIncentivePage/EquityRangePage";
import CreateEquityRangePage from "../scenes/CompensationSetup/LongIncentivePage/EquityRangePage/create";
import UpdateEquityRangePage from "../scenes/CompensationSetup/LongIncentivePage/EquityRangePage/update";

import SalaryRangePage from "../scenes/CompensationSetup/SalaryRangePage";
import CreateSalaryRangePage from "../scenes/CompensationSetup/SalaryRangePage/create";
import UpdateSalaryRangePage from "../scenes/CompensationSetup/SalaryRangePage/update";

import TargetBonusPage from "../scenes/CompensationSetup/TargetBonusPage";
import CreateTargetBonusPage from "../scenes/CompensationSetup/TargetBonusPage/create";
import UpdateTargetBonusPage from "../scenes/CompensationSetup/TargetBonusPage/update";

import SignonsPage from "../scenes/CompensationSetup/SignonsPage";
import CreateSignonsPage from "../scenes/CompensationSetup/SignonsPage/create";
import UpdateSignonsPage from "../scenes/CompensationSetup/SignonsPage/update";

import LongIncentivePage from "../scenes/CompensationSetup/LongIncentivePage";
import CreateLongIncentivePage from "../scenes/CompensationSetup/LongIncentivePage/create";
import UpdateLongIncentivePage from "../scenes/CompensationSetup/LongIncentivePage/update";

import ShortIncentivePage from "../scenes/CompensationSetup/ShortIncentivePage";
import CreateShortIncentivePage from "../scenes/CompensationSetup/ShortIncentivePage/create";
import UpdateShortIncentivePage from "../scenes/CompensationSetup/ShortIncentivePage/update";

import PayrollUploadPage from "../scenes/CompensationSetup/PayrollUploadPage";

import MarketDataUploadPage from "../scenes/CompensationSetup/MarketDataUploadPage";

import JobChartPage from "../scenes/ConfigurationPage/JobChartPage";

import OfferModelPage from "../scenes/OfferModelPage"
import CreateOfferModelPage from "../scenes/OfferModelPage/create"
import UpdateOfferModelPage from "../scenes/OfferModelPage/update"

import { Company } from "../interface/companyInterface";

export interface Props extends InState { }

interface State { }

interface InState {
  init: boolean;
  companyList: Company[];
}

class RootRoute extends React.Component<Props, State> {
  render() {
    const configurationfunctin = (): any => {
      let adm = (
        <Route exact path="/" render={() => (<PrimaryLayout><CompanyPage /></PrimaryLayout>)} />
      );

      let usr = (
        <Route exact path="/" render={() => (<PrimaryLayout><UpdateSelfCompanyPage /></PrimaryLayout>)} />
      );

      if (this.props.companyList.length > 1) {
        return adm;
      } else if (this.props.companyList.length === 1) {
        if (this.props.companyList[0].company_id === "5ZwOXIkeKuPhpFriTsmD") {
          return adm;
        } else return usr;
      } else return usr;
    };

    if (this.props.init) {
      return (
        <ConnectedRouter history={history}>
          <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            {/* both /roster and /roster/:number begin with /roster */}
            <Route exact path="/login" render={() => (<SecondaryLayout><LoginPage /></SecondaryLayout>)} />
            <Route exact path="/forgetpassword" render={() => (<SecondaryLayout><ForgetPasswordPage /></SecondaryLayout>)} />
            <Route exact path="/resetpassword" render={() => (<SecondaryLayout><ResetPasswordPage /></SecondaryLayout>)} />
            {/* <Route exact path="/" component={PrimaryLayout} /> */}
            {/* <Route exact path="/" render={() => (<PrimaryLayout><HomePage /></PrimaryLayout>)} /> */}
            <Route exact path="/" render={() => (<PrimaryLayout><CompanyPage /></PrimaryLayout>)} />
            <Route exact path="/profile" render={() => (<PrimaryLayout><ProfilePage /></PrimaryLayout>)} />
            <Route exact path="/setting" render={() => (<PrimaryLayout><SettingPage /></PrimaryLayout>)} />

            <Route exact path="/user" render={() => (<PrimaryLayout><UserPage /></PrimaryLayout>)} />
            <Route exact path="/user/create" render={() => (<PrimaryLayout><CreateUserPage /></PrimaryLayout>)} />
            <Route exact path="/user/update" render={() => (<PrimaryLayout> <UpdateUserPage /></PrimaryLayout>)} />

            <Route exact path="/company" render={() => (<PrimaryLayout><CompanyPage /></PrimaryLayout>)} />
            <Route exact path="/company/create" render={() => (<PrimaryLayout><CreateCompanyPage /></PrimaryLayout>)} />
            <Route exact path="/company/update" render={() => (<PrimaryLayout><UpdateCompanyPage /></PrimaryLayout>)} />
            <Route
              exact
              path="/company/info"
              render={() => (
                <PrimaryLayout>
                  <UpdateSelfCompanyPage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/entity"
              render={() => (
                <PrimaryLayout>
                  <SubCompanyPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/entity/create"
              render={() => (
                <PrimaryLayout>
                  <CreateSubCompanyPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/entity/update"
              render={() => (
                <PrimaryLayout>
                  <UpdateSubCompanyPage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/division"
              render={() => (
                <PrimaryLayout>
                  <UnitPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/unit"
              render={() => (
                <PrimaryLayout>
                  <DivisionPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/unit/create"
              render={() => (
                <PrimaryLayout>
                  <CreateUnitPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/unit/update"
              render={() => (
                <PrimaryLayout>
                  <UpdateUnitPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/unit/subunit"
              render={() => (
                <PrimaryLayout>
                  <SubUnitPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/unit/subunit/create"
              render={() => (
                <PrimaryLayout>
                  <CreateSubUnitPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/unit/subunit/update"
              render={() => (
                <PrimaryLayout>
                  <UpdateSubUnitPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/unit/subunit/childunit"
              render={() => (
                <PrimaryLayout>
                  <ChildUnitPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/unit/subunit/childunit/create"
              render={() => (
                <PrimaryLayout>
                  <CreateChildUnitPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/unit/subunit/childunit/update"
              render={() => (
                <PrimaryLayout>
                  <UpdateChildUnitPage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/role"
              render={() => (
                <PrimaryLayout>
                  <RolePage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/role/create"
              render={() => (
                <PrimaryLayout>
                  <CreateRolePage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/role/update"
              render={() => (
                <PrimaryLayout>
                  <UpdateRolePage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/location"
              render={() => (
                <PrimaryLayout>
                  <LocationPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/Location/create"
              render={() => (
                <PrimaryLayout>
                  <CreateLocationPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/location/update"
              render={() => (
                <PrimaryLayout>
                  <UpdateLocationPage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/jobfunction"
              render={() => (
                <PrimaryLayout>
                  <JobFunctionPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/jobfunction/create"
              render={() => (
                <PrimaryLayout>
                  <CreateJobFunctionPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/jobfunction/createsub"
              render={() => (
                <PrimaryLayout>
                  <CreateSubJobFunctionPage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/sector"
              render={() => (
                <PrimaryLayout>
                  <SectorPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/sector/create"
              render={() => (
                <PrimaryLayout>
                  <CreateSectorPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/sector/createindustry"
              render={() => (
                <PrimaryLayout>
                  <CreateIndustryPage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/region"
              render={() => (
                <PrimaryLayout>
                  <RegionPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/region/create"
              render={() => (
                <PrimaryLayout>
                  <CreateRegionPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/region/update"
              render={() => (
                <PrimaryLayout>
                  <UpdateRegionPage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/jobgrade"
              render={() => (
                <PrimaryLayout>
                  <JobGradePage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/jobgrade/create"
              render={() => (
                <PrimaryLayout>
                  <CreateJobGradePage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/jobgrade/update"
              render={() => (
                <PrimaryLayout>
                  <UpdateJobGradePage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/allowances"
              render={() => (
                <PrimaryLayout>
                  <AllowancesPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/allowances/create"
              render={() => (
                <PrimaryLayout>
                  <CreateAllowancesPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/allowances/update"
              render={() => (
                <PrimaryLayout>
                  <UpdateAllowancesPage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/shortincentive"
              render={() => (
                <PrimaryLayout>
                  <ShortIncentivePage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/shortincentive/create"
              render={() => (
                <PrimaryLayout>
                  <CreateShortIncentivePage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/shortincentive/update"
              render={() => (
                <PrimaryLayout>
                  <UpdateShortIncentivePage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/longincentive"
              render={() => (
                <PrimaryLayout>
                  <LongIncentivePage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/longincentive/create"
              render={() => (
                <PrimaryLayout>
                  <CreateLongIncentivePage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/longincentive/update"
              render={() => (
                <PrimaryLayout>
                  <UpdateLongIncentivePage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/longincentive/equityrange"
              render={() => (
                <PrimaryLayout>
                  <EquityRangePage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/longincentive/equityrange/create"
              render={() => (
                <PrimaryLayout>
                  <CreateEquityRangePage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/longincentive/equityrange/update"
              render={() => (
                <PrimaryLayout>
                  <UpdateEquityRangePage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/salaryrange"
              render={() => (
                <PrimaryLayout>
                  <SalaryRangePage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/salaryrange/create"
              render={() => (
                <PrimaryLayout>
                  <CreateSalaryRangePage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/salaryrange/update"
              render={() => (
                <PrimaryLayout>
                  <UpdateSalaryRangePage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/targetbonus"
              render={() => (
                <PrimaryLayout>
                  <TargetBonusPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/targetbonus/create"
              render={() => (
                <PrimaryLayout>
                  <CreateTargetBonusPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/targetbonus/update"
              render={() => (
                <PrimaryLayout>
                  <UpdateTargetBonusPage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/signons"
              render={() => (
                <PrimaryLayout>
                  <SignonsPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/signons/create"
              render={() => (
                <PrimaryLayout>
                  <CreateSignonsPage />
                </PrimaryLayout>
              )}
            />
            <Route
              exact
              path="/signons/update"
              render={() => (
                <PrimaryLayout>
                  <UpdateSignonsPage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/payrollupload"
              render={() => (
                <PrimaryLayout>
                  <PayrollUploadPage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/marketdataupload"
              render={() => (
                <PrimaryLayout>
                  <MarketDataUploadPage />
                </PrimaryLayout>
              )}
            />

            <Route
              exact
              path="/jobchart"
              render={() => (
                <PrimaryLayout>
                  <JobChartPage />
                </PrimaryLayout>
              )}
            />

            <Route exact path="/offermodel" render={() => (<PrimaryLayout><OfferModelPage /></PrimaryLayout>)} />
            <Route exact path="/offermodel/create" render={() => (<PrimaryLayout><CreateOfferModelPage /></PrimaryLayout>)} />
            <Route exact path="/offermodel/update" render={() => (<PrimaryLayout><UpdateOfferModelPage /></PrimaryLayout>)} />

            <Route exact path="/jobposition" render={() => (<PrimaryLayout><JobPositionPage /></PrimaryLayout>)} />
            <Route exact path="/jobposition/create" render={() => (<PrimaryLayout><CreateJobPositionPage /></PrimaryLayout>)} />
            <Route exact path="/jobposition/update" render={() => (<PrimaryLayout> <UpdateJobPositionPage /></PrimaryLayout>)} /></Switch>
        </ConnectedRouter>
      );
    } else {
      return <div />;
    }
  }
}

function mapStateToProps(state: any) {
  return {
    init: state.initReducer.init,
    companyList: state.companyReducer.companyList
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootRoute);
