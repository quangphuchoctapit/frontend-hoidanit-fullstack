import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import './DoctorExtraInfo.scss'
import { getDetailInfoDoctor, getScheduleById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';


class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: true
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }

    toggleShowHide = () => {
        this.setState({
            isShowDetail: !this.state.isShowDetail
        })
    }
    render() {
        let { isShowDetail } = this.state
        return (
            <>
                <div className='doctor-extra-info-container'>
                    <div className='content-up'>
                        <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                        <div className='text-clinic'>Phòng khám Bệnh viện Đại học Y Dược 1</div>
                        <div className='detail-address'>20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM</div>
                    </div>
                    <div className='content-down'>
                        {isShowDetail === false ?
                            <>
                                <div>
                                    GIÁ KHÁM:300.000đ-400.000đ.<span className='toggleShowHideBtn' onClick={() => this.toggleShowHide()}>Xem chi tiết</span>
                                </div>
                            </> :
                            <>
                                <div>GIÁ KHÁM:</div>
                                <div className='title-price'>
                                    <div className='first-title-price'>
                                        <div className='title-price-content-first'><span>Giá khám</span><span>400.000đ</span></div>
                                        <div>Giá khám đã bao gồm phí đặt lịch hẹn trước (Giá niêm yết của phòng khám)</div>
                                        <div>Giá khám cho người nước ngoài 30 USD</div>
                                    </div>
                                    <div className='second-title-price'>
                                        <div className='title-price-content-second'>Giá tái khám</div>
                                        <div>Theo chỉ định của bác sĩ</div>
                                    </div>
                                    <div className='third-title-price'><div>Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ</div></div>
                                </div>
                                <div className='toggleShowHideBtn' onClick={() => this.toggleShowHide()}>Ẩn bảng giá</div>

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
