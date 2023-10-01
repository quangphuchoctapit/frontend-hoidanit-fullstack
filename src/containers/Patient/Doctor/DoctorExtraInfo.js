import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './DoctorExtraInfo.scss'
import { getExtraInfoDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import NumberFormat from 'react-number-format'


class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: false,
            extraInfo: {}
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent);
            if (res && res.data) {
                this.setState({
                    extraInfo: res.data
                })
            }
        }
    }

    toggleShowHide = () => {
        this.setState({
            isShowDetail: !this.state.isShowDetail
        })
    }
    render() {
        let { isShowDetail, extraInfo } = this.state
        console.log('check state: ', extraInfo)
        let { language } = this.props
        return (
            <>
                <div className='doctor-extra-info-container'>
                    <div className='content-up'>
                        <div className='text-address'>
                            <FormattedMessage id='patient.extra-info-doctor.text-address' />
                        </div>

                        <div className='text-clinic'>
                            {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : 'Phòng khám Bệnh viện Đại học Y Dược 1'}
                        </div>
                        <div className='detail-address'>
                            {extraInfo && extraInfo.nameClinic ? extraInfo.addressClinic : '20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM'}
                        </div>
                    </div>
                    <div className='content-down'>
                        {isShowDetail === false ?
                            <>
                                <div>
                                    <FormattedMessage id='patient.extra-info-doctor.price' />:	&nbsp;<span>
                                        {
                                            extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI &&
                                            <NumberFormat
                                                value={extraInfo.priceTypeData.valueVi}
                                                displayType='text'
                                                thousandSeparator suffix={'đ'} />
                                        }
                                        {
                                            extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN &&
                                            <NumberFormat value={extraInfo.priceTypeData.valueEn}
                                                displayType='text' thousandSeparator prefix={'$'} />
                                        }
                                    </span>	&nbsp;<span className='toggleShowHideBtn' onClick={() => this.toggleShowHide()}>Xem chi tiết</span>
                                </div>
                            </> :
                            <>
                                <div>
                                    <FormattedMessage id='patient.extra-info-doctor.price' />:
                                </div>
                                <div className='title-price'>
                                    <div className='first-title-price'>
                                        <div className='title-price-content-first'>
                                            <span>
                                                <FormattedMessage id='patient.extra-info-doctor.price' />

                                            </span>
                                            <span>
                                                {
                                                    extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI &&
                                                    <NumberFormat
                                                        value={extraInfo.priceTypeData.valueVi}
                                                        displayType='text'
                                                        thousandSeparator suffix={'đ'} />
                                                }
                                                {
                                                    extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN &&
                                                    <NumberFormat value={extraInfo.priceTypeData.valueEn} displayType='text' thousandSeparator prefix={'$'} />
                                                }
                                            </span>
                                        </div>
                                        <div>{extraInfo && extraInfo.note}</div>
                                    </div>
                                    <div className='second-title-price'>
                                        <div className='title-price-content-second'>
                                            <FormattedMessage id='patient.extra-info-doctor.re-examination-price' />
                                        </div>
                                        <div>
                                            <FormattedMessage id='patient.extra-info-doctor.follow-doctor-instructions' />
                                        </div>
                                    </div>
                                    <div className='third-title-price'><div>
                                        <FormattedMessage id='patient.extra-info-doctor.payment-method-text' />

                                        <span>
                                            {extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.VI ?
                                                (extraInfo.paymentTypeData.valueVi === 'Tất cả' ? 'Chấp nhận tất cả hình thức thanh toán' : extraInfo.paymentTypeData.valueVi) :
                                                (extraInfo.paymentTypeData.valueEn === "All" ? "Accept all payment methods" : extraInfo.paymentTypeData.valueEn)}
                                        </span>
                                    </div></div>
                                </div>
                                <div className='toggleShowHideBtn' onClick={() => this.toggleShowHide()}>
                                    <FormattedMessage id='patient.extra-info-doctor.hide-detail-btn' />
                                </div>

                            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
