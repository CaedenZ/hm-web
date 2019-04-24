import React from "react";
import { mapDispatchToProps } from "../../helper/dispachProps";
import { connect } from "react-redux";
import { SharedDispatchProps } from "../../interface/propsInterface";
import { Button } from "@material-ui/core";
import { history } from "../../store";

interface Props extends SharedDispatchProps { }

class ErrorBoundary extends React.Component<Props> {
    state: any = {
        hasError: false
    }
    constructor(props) {
        super(props);
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
    }

    handleBack = () => {
        this.props.logout()
        history.push('/login')
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div>
                <h1>Something went wrong.</h1>
                <Button onClick={this.handleBack}>Back</Button>
            </div>;
        }
        return this.props.children;
    }
}

export default connect(null, mapDispatchToProps)(ErrorBoundary);
