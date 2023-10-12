import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import './DetailSpecialty.scss'
import '../Doctor/DoctorExtraInfo'
import DoctorExtraInfo from '../../../containers/Patient/Doctor/DoctorExtraInfo'
import ProfileDoctor from '../Doctor/ProfileDoctor';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [27, 28, 29]
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }
    render() {
        let { arrDoctorId } = this.state
        return (
            <>
                <div className='detail-specialty-container'>
                    <HomeHeader />
                    <div className='detail-specialty-body'>


                        <div className='description-specialty'>

                        </div>

                        {arrDoctorId && arrDoctorId.length > 0 &&
                            arrDoctorId.map((item, index) => {
                                return (
                                    <div className='each-doctor'
                                        key={index}

                                    >
                                        <div className='dt-content-left'>
                                            <div className='profile-doctor'>
                                                <ProfileDoctor
                                                    doctorId={item}
                                                    isShowDescriptionDoctor={true}
                                                />
                                            </div>
                                        </div>
                                        <div className='dt-content-right'>
                                            <div className='doctor-schedule'>
                                                <DoctorSchedule
                                                    doctorIdFromParent={item}
                                                />
                                            </div>
                                            <div className='doctor-extra-info'>
                                                <DoctorExtraInfo
                                                    doctorIdFromParent={item}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
