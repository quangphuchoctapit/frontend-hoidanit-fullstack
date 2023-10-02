import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService'
import NumberFormat from 'react-number-format'
import _ from 'lodash'
import moment from 'moment'
import localization from 'moment/locale/vi'

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {

        let data = await this.getInfoDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

    getInfoDoctor = async (id) => {
        let result = {}
        let res = await getProfileDoctorById(id)
        if (res && res.errCode === 0) {
            result = res.data
        }
        else result = {}
        console.log('result: ', result)
        return result
    }
    async componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.language !== this.props.language) {
            await this.getInfoDoctor(this.props.doctorId)
        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            return (
                <>
                    <div>{time} - {date}</div>
                    <div>Mien phi dat lich</div>
                </>
            )
        }


    }

    render() {
        let { language, isShowDescriptionDoctor, dataTime } = this.props
        let { dataProfile } = this.state
        let nameVi = ''
        let nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi} - ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn === 'None' ? 'Doctor' : dataProfile.positionData.valueEn} - ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        console.log('check time: ', dataTime)
        return (
            <>
                <div className='profile-doctor-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'>
                            <div className='img-doctor'
                                style={{
                                    backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`,
                                    width: '80px', height: '80px',
                                    borderRadius: '50%', margin: '10px 20px',
                                }}
                            >
                            </div>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {dataProfile && dataProfile.positionData &&
                                    language === LANGUAGES.VI ? nameVi : nameEn
                                }
                            </div>
                            <div className='down'>
                                {isShowDescriptionDoctor === true ?
                                    <>
                                        {dataProfile && dataProfile.Markdown &&
                                            <span>{dataProfile.Markdown.description}</span>
                                        }
                                    </>
                                    :
                                    <>
                                        {this.renderTimeBooking(dataTime)}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='price'>
                        {/* <FormattedMessage id='' /> &nbsp; */}
                        Gia kham:&nbsp;
                        {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.VI &&
                            <NumberFormat
                                value={dataProfile.Doctor_Info.priceTypeData.valueVi}
                                displayType='text'
                                thousandSeparator suffix={'đ'} />
                        }
                        {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.EN &&
                            <NumberFormat
                                value={dataProfile.Doctor_Info.priceTypeData.valueEn}
                                displayType='text'
                                thousandSeparator prefix={'$'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
