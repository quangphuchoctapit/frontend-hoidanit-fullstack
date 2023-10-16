import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import HomeHeader from '../../../containers/HomePage/HomeHeader'
import './DetailClinic.scss'
import { getDetailClinicById } from '../../../services/userService'
import ProfileDoctor from '../../../containers/Patient/Doctor/ProfileDoctor'
import DoctorSchedule from '../../../containers/Patient/Doctor/DoctorSchedule'
import DoctorExtraInfo from '../../../containers/Patient/Doctor/DoctorExtraInfo'
import _ from 'lodash'


class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailClinic: [],
            imageBase64: '',
            arrDoctorId: []
        }
    }

    async componentDidMount() {
        let id = this.props.match.params.id
        let res = await getDetailClinicById(id)
        console.log(' check res: ', res)
        if (res && res.errCode === 0) {
            let arrDoctorId = []
            let doctorIdData = res.data.doctorClinic
            if (doctorIdData && !_.isEmpty(doctorIdData) > 0) {
                doctorIdData.map((item) => (
                    arrDoctorId.push(item.doctorId)
                ))
            }
            // console.log("check arrDoctorId:", arrDoctorId)
            this.setState({
                dataDetailClinic: res.data,
                arrDoctorId: arrDoctorId
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        // if (this.props.dataDetailClinic !== prevProps.dataDetailClinic) {
        //     let copyState = { ...this.state }
        //     let imageBase64 = ''
        //     if (this.state.dataDetailClinic.image) {
        //         imageBase64 = new Buffer(copyState.dataDetailClinic.image, 'base64').toString('binary')
        //         this.setState({
        //             imageBase64: imageBase64
        //         })
        //         console.log('yes')
        //     } else {
        //         console.log('no')
        //     }
        //     this.setState({
        //         ...copyState
        //     })

        // }
    }

    render() {
        let { dataDetailClinic, arrDoctorId } = this.state
        console.log('check state: ', this.state)
        return (
            <>
                <HomeHeader />
                <div className='detail-clinic-container'>
                    <div className='detail-clinic-body'>
                        <div className='detail-clinic-intro'>
                            <div className='detail-clinic-intro-img' style={{ background: `url(${dataDetailClinic.image}) no-repeat center center` }}></div>
                            <div className='detail-clinic-intro-text'>
                                <div className='detail-clinic-intro-name'>{dataDetailClinic.name}</div>
                                <div className='detail-clinic-intro-address'>{dataDetailClinic.address}</div>
                            </div>
                        </div>
                        <div className='detail-clinic-ads'><FormattedMessage id='patient.clinic.ads' />
                        </div>
                        <div className='detail-clinic-content' dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>
                        </div>
                        <div className='detail-clinic-doctors'>
                            {arrDoctorId && !_.isEmpty(arrDoctorId) ?
                                arrDoctorId.map((item) =>
                                (
                                    <>
                                        <div className='each-doctor'>
                                            <div className='dt-content-left'>
                                                <div className='profile-doctor'>
                                                    <ProfileDoctor
                                                        doctorId={item}
                                                        isShowDescriptionDoctor={true}
                                                        isShowLinkDetail={true}
                                                        isShowPrice={false}
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
                                    </>
                                ))
                                :
                                <div className='detail-clinic-no-doctor'><FormattedMessage id='patient.clinic.no-doctor-available' /></div>
                            }
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
