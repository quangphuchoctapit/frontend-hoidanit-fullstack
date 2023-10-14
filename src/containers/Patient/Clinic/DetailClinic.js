import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import HomeHeader from '../../../containers/HomePage/HomeHeader'
import './DetailClinic.scss'
import { getDetailClinicById } from '../../../services/userService'

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailClinic: [],
            imageBase64: ''
        }
    }

    async componentDidMount() {
        let id = this.props.match.params.id
        let res = await getDetailClinicById(id)
        if (res && res.errCode === 0) {
            this.setState({
                dataDetailClinic: res.data
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
        let { dataDetailClinic } = this.state
        console.log('check props: ', this.state.dataDetailClinic)
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
                        <div className='detail-clinic-ads'>BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng khám uy tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.
                        </div>
                        <div className='detail-clinic-content' dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>
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
