import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { postVerifyBookingAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss'

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            console.log('check ok : ', this.props)
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token')
            const doctorId = urlParams.get('doctorId')
            console.log('check params: ', token, doctorId)
            let res = await postVerifyBookingAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }
    render() {
        let { errCode, statusVerify } = this.state
        console.log('chekc state: ', this.state)
        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVerify && statusVerify === false ?
                        <div>
                            Loading
                        </div>
                        :
                        <>{errCode === 0 ? <div className='info-booking'>Xác nhận lịch hẹn thành công</div> : <div className='info-booking'>Lịch hẹn không tồn tại hoặc đã được xác nhận</div>}</>
                    }
                </div>
            </>
        )
    }

}


const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
