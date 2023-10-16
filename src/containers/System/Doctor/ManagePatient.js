import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientForDoctor } from '../../../services/userService'
import moment from 'moment'
import _ from 'lodash'

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('days').valueOf(),
            dataPatient: {}
        }
    }

    async componentDidMount() {
        let { user } = this.props
        let { currentDate } = this.state
        let formattedDate = new Date(currentDate).getTime()
        this.getDataPatient(user, formattedDate)
    }

    getDataPatient = async (user, formattedDate) => {
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
        }, () => {
            let { user } = this.props
            let { currentDate } = this.state
            let formattedDate = new Date(currentDate).getTime()
            this.getDataPatient(user, formattedDate)

            // console.log('user: ', user.id, 'date:', formattedDate)
        })
    }
    handleConfirm = () => {

    }
    handleSendRemedy = () => {

    }

    render() {
        let { dataPatient } = this.state
        console.log('check user: ', this.state)
        return (
            <>
                <div className='manage-patient-container'>
                    <div className='m-p-title'>
                        quan li benh nahan kham benh
                    </div>
                    <div className='row manage-patient-body'>
                        <div className='col-6 form-group'>
                            <label className=''>chon ngay kham</label>
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
                                    <th>Index</th>
                                    <th>Time</th>
                                    <th>Full Name</th>
                                    <th>Address</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                                {dataPatient && !_.isEmpty(dataPatient) ?
                                    dataPatient.map((item, index) => {
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <th>{index + 1}</th>
                                                    <th>{item.bookingTimeTypeData.valueVi}</th>
                                                    <th>{item.patientData.firstName}</th>
                                                    <th>{item.patientData.address}</th>
                                                    <th>{item.patientData.genderData.valueVi}</th>
                                                    <th>
                                                        <button onClick={() => this.handleConfirm()} className='btn-confirm'>Confirm</button>
                                                        <button onClick={() => this.handleSendRemedy()} className='btn-send-remedy'>Send remedy</button>
                                                    </th>
                                                </tr>
                                            </>
                                        )
                                    })
                                    :
                                    <tr className='mp-no-data' colSpan={6}>
                                        No Data
                                    </tr>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
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
