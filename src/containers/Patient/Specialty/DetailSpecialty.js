import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import _ from 'lodash';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import './DetailSpecialty.scss'
import '../Doctor/DoctorExtraInfo'
import DoctorExtraInfo from '../../../containers/Patient/Doctor/DoctorExtraInfo'
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/userService'

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            })
            let resProvince = await getAllCodeService('PROVINCE')
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let arrDoctorId = []
                if (res.data && !_.isEmpty(res.data)) {
                    let newArrDoctorId = res.data.doctorSpecialty
                    newArrDoctorId.map((item) => {
                        return (
                            arrDoctorId.push(item.doctorId)
                        )
                    })
                }
                let resProvinceData = resProvince.data
                if (resProvinceData && !_.isEmpty(resProvinceData)) {
                    resProvinceData.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: "ALL",
                        valueVi: 'Toàn quốc'
                    })
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: resProvinceData ? resProvinceData : []
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }

    handleOnChangeProvinceSelect = async (e) => {
        console.log('check: ', e.target.value)
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let location = e.target.value
            let res = await getDetailSpecialtyById({
                id: id,
                location: location
            })
            if (res && res.errCode === 0) {
                let arrDoctorId = []
                if (res.data && !_.isEmpty(res.data)) {
                    let newArrDoctorId = res.data.doctorSpecialty
                    newArrDoctorId.map((item) => {
                        return (
                            arrDoctorId.push(item.doctorId)
                        )
                    })
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state

        let { language } = this.props
        console.log('check ok state: ', this.state)
        return (
            <>
                <div className='detail-specialty-container'>
                    <HomeHeader />
                    <div className='detail-specialty-body'>


                        <div className='description-specialty'>
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                                <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>
                                </div>
                            }
                        </div>
                        <select className='location-select' onChange={e => this.handleOnChangeProvinceSelect(e)}>
                            {listProvince && !_.isEmpty(listProvince) &&
                                listProvince.map((item) => {
                                    return (
                                        <option key={item.id} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                            }
                        </select>

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
