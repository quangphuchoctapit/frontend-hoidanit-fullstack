import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils/constant';
import './BookingModal.scss'
import { Button, Form, Modal } from 'reactstrap'
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash'
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { postPatientBookAppointment } from '../../../../services/userService'
import moment from 'moment'
import NumberFormat from 'react-number-format'


class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            birthday: '',
            reason: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: ''
        }
    }

    async componentDidMount() {
        this.props.getGenders()

    }

    buildDataGender = (data) => {
        let result = [];
        let { language } = this.props
        if (data && data.length > 0) {
            data.map((item) => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                object.value = item.keyMap
                result.push(object)
            })
        }
        return result
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        // console.log('check ddatatime: ', this.props.datatime)
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            let { dataTime } = this.props
            if (dataTime && !_.isEmpty(dataTime)) {
                let doctorId = dataTime.doctorId
                let timeType = dataTime.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnChangeInput = (e, id) => {
        let valueInput = e.target.value
        let copyState = { ...this.state }
        copyState[id] = valueInput
        this.setState({
            ...copyState,
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({ birthday: date[0] })
    }

    handleChangeGenders = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    handleConfirmBooking = async () => {
        // console.log('check sddatatime: ', this.props.dataTime)
        let timeString = this.renderTimeBooking(this.props.dataTime)
        let doctorName = this.buildDoctorName(this.props.dataTime)
        //validate input
        let date = new Date(this.state.birthday).getTime()
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            address: this.state.address,
            selectedGender: this.state.selectedGender.value,
            reason: this.state.reason,
            email: this.state.email,
            date: date,
            timeType: this.state.timeType,
            doctorId: this.state.doctorId,
            phoneNumber: this.state.phoneNumber,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })

        if (res && res.errCode === 0) {
            toast.success('Save Booking succeeded!')
            this.props.handleExitModalBooking()
        } else {
            toast.error('An error occured when booking!')

        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            return `${time} - ${date}`
        }
        return ''
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name
        }
        return ''
    }

    render() {
        let { dataTime } = this.props

        let timeString = this.renderTimeBooking(this.props.dataTime)
        let doctorName = this.buildDoctorName(this.props.dataTime)
        // console.log('check dataeitme: ', dataTime)
        //validate input
        let date = new Date(this.state.birthday).getTime()
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : ''
        return (
            <>
                <Modal
                    isOpen={this.props.isOpenModalBooking}
                    className={'booking-modal-container'}
                    size='lg'
                    centered
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>
                                <FormattedMessage id='patient.booking-modal.title' />
                            </span>
                            <span className='right' onClick={() => this.props.handleExitModalBooking()}><i className="fas fa-times"></i></span>
                        </div>
                        <div className='booking-modal-body'>
                            <div className='doctor-in4'>
                                <ProfileDoctor doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                    dataTime={dataTime} />
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.fullName' /></label>
                                    <input className='form-control'
                                        value={this.state.fullName}
                                        onChange={(e) => this.handleOnChangeInput(e, 'fullName')}
                                    />
                                </div>
                                <div className='col-6 group'>
                                    <label><FormattedMessage id='patient.booking-modal.phoneNumber' /></label>
                                    <input className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.email' /></label>
                                    <input className='form-control'
                                        value={this.state.email}
                                        onChange={(e) => this.handleOnChangeInput(e, 'email')}
                                    />
                                </div>
                                <div className='col-6 group'>
                                    <label><FormattedMessage id='patient.booking-modal.address' /></label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        onChange={(e) => this.handleOnChangeInput(e, 'address')}
                                    />
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.reason' /></label>
                                    <input className='form-control'
                                        value={this.state.reason}
                                        onChange={(e) => this.handleOnChangeInput(e, 'reason')}
                                    />
                                </div>
                                <div className='col-6 group'>
                                    <label><FormattedMessage id='patient.booking-modal.birthday' /></label>
                                    <DatePicker
                                        className='form-control'
                                        value={this.state.birthday}
                                        onChange={this.handleOnChangeDatePicker}
                                    />
                                </div>
                                <div className='col-6 group'>
                                    <label><FormattedMessage id='patient.booking-modal.gender' /></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        options={this.state.genders}
                                        onChange={this.handleChangeGenders}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-cancel ' onClick={() => this.props.handleExitModalBooking()}><FormattedMessage id='patient.booking-modal.cancel' /></button>
                            <button className='btn-booking-confirm' onClick={() => this.handleConfirmBooking()}><FormattedMessage id='patient.booking-modal.confirm' /></button>

                        </div>
                    </div>
                </Modal>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
