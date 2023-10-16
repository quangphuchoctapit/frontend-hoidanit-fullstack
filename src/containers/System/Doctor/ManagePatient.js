import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientForDoctor, postSendRemedy } from '../../../services/userService'
import moment from 'moment'
import { toast } from 'react-toastify'
import _ from 'lodash'
import RemedyModal from './RemedyModal';
import LoadingOverlay from 'react-loading-overlay'


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('days').valueOf(),
            dataPatient: {},
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
            timeString: ''
        }
    }

    async componentDidMount() {

        this.getDataPatient()
    }

    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formattedDate = new Date(currentDate).getTime()
        let res = await getListPatientForDoctor({
            doctorId: user.id,
            date: formattedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
        console.log('cbheck res: ', res)
    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }
    handleConfirm = (item) => {
        let { language } = this.props
        let bookingTimeTypeData = language === LANGUAGES.VI ? item.bookingTimeTypeData.valueVi : item.bookingTimeTypeData.valueEn

        let data = {
            doctorId: item.doctorId,
            email: item.patientData.email,
            patientId: item.patientId,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
            timeString: bookingTimeTypeData
        }
        this.setState({
            timeString: bookingTimeTypeData
        })
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
        console.log('check handleocnfirm: ', data)
    }
    handleSendRemedy = async (dataFromRemedyModal) => {
        let { dataModal } = this.state
        this.setState({
            isShowLoading: true
        })
        // console.log('check maso: ', dataFromRemedyModal.email, dataModal.doctorId, dataModal.patientId, dataModal.timeType)
        let res = await postSendRemedy({
            email: dataFromRemedyModal.email,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            image: dataFromRemedyModal.imageBase64,
            patientName: dataModal.patientName,
            timeString: this.state.timeString
        })
        console.log('check res: ', res)
        if (res && res.errCode === 0) {

            toast.success("Successfully send remedy to the client!")
            this.handleExitModalRemedy()
            this.getDataPatient()
            this.setState({
                isShowLoading: false
            })
        } else {
            toast.error("An error occurred when sending remedy to the client.")
            console.log('chekc erro: ', res)
            this.setState({
                isShowLoading: false
            })
        }
    }

    handleExitModalRemedy = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    render() {
        let { dataPatient } = this.state
        let { language } = this.props
        // console.log('check user: ', this.state)
        return (
            <>
                <div className='manage-patient-container'>
                    <div className='m-p-title'>
                        <FormattedMessage id='doctor.manage-patient' />
                    </div>
                    <div className='row manage-patient-body'>
                        <div className='col-6 form-group'>
                            <label className=''><FormattedMessage id='doctor.choose-date' /></label>
                            <DatePicker
                                className='form-control'
                                value={this.state.currentDate}
                                onChange={this.handleOnChangeDatePicker}
                            />
                        </div>
                    </div>
                    <div className='manage-patient-table'>
                        <table className="w3-table w3-striped">
                            <tbody>
                                <tr>
                                    <th><FormattedMessage id='doctor.index' /></th>
                                    <th><FormattedMessage id='doctor.booking-time-type' /></th>
                                    <th><FormattedMessage id='doctor.full-name' /></th>
                                    <th><FormattedMessage id='doctor.address' /></th>
                                    <th><FormattedMessage id='doctor.gender' /></th>
                                    <th></th>
                                </tr>
                                {dataPatient && !_.isEmpty(dataPatient) ?
                                    dataPatient.map((item, index) => {
                                        let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                        let bookingTimeTypeData = language === LANGUAGES.VI ? item.bookingTimeTypeData.valueVi : item.bookingTimeTypeData.valueEn
                                        return (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <th>{bookingTimeTypeData}</th>
                                                <th>{item.patientData.firstName}</th>
                                                <th>{item.patientData.address}</th>
                                                <th>{gender}</th>
                                                <th>
                                                    <button onClick={() => this.handleConfirm(item)} className='btn-confirm'><FormattedMessage id='doctor.confirm' /></button>
                                                </th>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr className='mp-no-data'>
                                        <td colSpan='6'><FormattedMessage id='doctor.no-data' /></td>
                                    </tr>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
                <RemedyModal isOpenModal={this.state.isOpenRemedyModal}
                    dataModal={this.state.dataModal}
                    handleExitModalRemedy={this.handleExitModalRemedy}
                    handleSendRemedy={this.handleSendRemedy}
                />
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading... '
                >
                    <p>ngu</p>
                </LoadingOverlay>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
