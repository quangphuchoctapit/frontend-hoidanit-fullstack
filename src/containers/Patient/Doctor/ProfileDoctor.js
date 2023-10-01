import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService'
import NumberFormat from 'react-number-format'

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
    render() {
        let { language } = this.props
        let { dataProfile } = this.state
        let nameVi = ''
        let nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi} - ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn} - ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        return (
            <>
                <div className='profile-doctor-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'>
                            <div className='img-doctor'
                                style={{
                                    background: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''}) no-repeat center center`,
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
                                {dataProfile && dataProfile.Markdown &&
                                    <span>{dataProfile.Markdown.description}</span>
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
