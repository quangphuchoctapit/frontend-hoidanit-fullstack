import React, { Component } from 'react';
import { connect } from 'react-redux';

class ManageSchedule extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <>
                <div>
                    ManageSchedule
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
