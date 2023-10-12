import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './DoctorSchedule.scss'
import { getScheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import moment from 'moment'
import localization from 'moment/locale/vi'
import BookingModal from './Modal/BookingModal';


class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataTime: {}
        }
    }

    async componentDidMount() {
        let { language } = this.props

        let allDays = this.getArrDays(language)
        if (allDays && allDays.length > 0) {
            this.setState({
                allDays: allDays,
            })
        }

        if (this.props.doctorIdFromParent) {
            allDays = this.getArrDays(language)
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay ${ddMM}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM').charAt(0).toUpperCase() + moment(new Date()).add(i, 'days').format('dddd - DD/MM').slice(1);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Today ${ddMM}`
                    object.label = today
                }
                else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM').charAt(0).toUpperCase() + moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM').slice(1);
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('days').valueOf()
            allDays.push(object)
        }
        return allDays
    }

    async componentDidUpdate(prevProps, prevState, snapShot) {
        let { language } = this.props

        if (language !== prevProps.language) {
            let allDays = this.getArrDays(language)
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(language)
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    handleOnChangeSelect = async (e) => {
        // console.log(this.props.doctorIdFromParent)
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = e.target.value
            console.log('doctorid : ', doctorId, 'date: ', date)
            let res = await getScheduleDoctorByDate(doctorId, date)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
            console.log(res)
        }
    }

    handleClickScheduleTime = time => {
        this.setState({
            isOpenModalBooking: !this.state.isOpenModalBooking,
            dataTime: time
        })
    }

    handleExitModalBooking = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let { allDays, allAvailableTime, isOpenModalBooking, dataTime } = this.state
        let { language } = this.props
        return (
            <>

                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option key={index} value={item.value}>{item.label}</option>
                                    )
                                })}
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'><span><FormattedMessage id='patient.detail-doctor.schedule' /></span></i>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {allAvailableTime.map((item, index) => {
                                            let timeDisplay = language === LANGUAGES.VI ?
                                                item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                            return (
                                                <button key={index}
                                                    onClick={() => { this.handleClickScheduleTime(item) }}
                                                    className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                                >{timeDisplay}</button>
                                            )
                                        })}
                                    </div>
                                    <div className='book-free'><FormattedMessage id='patient.detail-doctor.choose' /> <i className='far fa-hand-point-up'></i> <FormattedMessage id='patient.detail-doctor.book-free' /></div>
                                </>
                                :
                                <div className='no-schedule'><FormattedMessage id='patient.detail-doctor.no-schedule' /></div>
                            }

                        </div>
                    </div>
                </div>
                <BookingModal isOpenModalBooking={isOpenModalBooking}
                    handleExitModalBooking={this.handleExitModalBooking}
                    dataTime={dataTime} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
