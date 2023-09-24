import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import './DoctorSchedule.scss'
import { getScheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import moment from 'moment'
import localization from 'moment/locale/vi'


class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            availableTime: []
        }
    }

    async componentDidMount() {
        let { language } = this.props

        console.log('moment vi: ', moment(new Date()).format('dddd - DD/MM'))
        console.log('moment en: ', moment(new Date()).locale('en').format('ddd - DD/MM'))
        this.setArrDays(language)
    }

    setArrDays = (language) => {
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM').charAt(0).toUpperCase() + moment(new Date()).add(i, 'days').format('dddd - DD/MM').slice(1);
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM').charAt(0).toUpperCase() + moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM').slice(1);

            }
            object.value = moment(new Date()).add(i, 'days').startOf('days').valueOf()
            arrDate.push(object)
        }
        this.setState({ allDays: arrDate })
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        let { language } = this.props

        if (language !== prevProps.language) {
            this.setArrDays(language)

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
                    availableTime: res.data ? res.data : []
                })
            }
            console.log(res)
        }
    }

    render() {
        let { allDays, availableTime } = this.state
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
                            <i className='fas fa-calendar-alt'><span>Lich kham</span></i>
                        </div>
                        <div className='time-content'>
                            {availableTime && availableTime.length > 0 ?
                                availableTime.map((item, index) => {
                                    let timeDisplay = language === LANGUAGES.VI ?
                                        item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                    return (
                                        <button key={index}>{timeDisplay}</button>
                                    )
                                })
                                :
                                <div>This doctor has no appoiment at this time, please choose another time.</div>
                            }

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
