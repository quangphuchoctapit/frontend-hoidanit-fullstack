import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { getAllClinic } from '../../../services/userService'
import { withRouter } from 'react-router-dom'


class MedicalFacility extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinic: []
        }
    }
    async componentDidMount() {
        let res = await getAllClinic()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res && res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (data) => {
        this.props.history.push(`/detail-clinic/${data.id}`)
    }

    render() {
        let { dataClinic } = this.state
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='patient.clinic.popular-clinics' /></span>
                        <button className='btn-section'><FormattedMessage id='patient.clinic.more-info' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item) => {
                                    return (
                                        <div key={item.id} className='section-customize' onClick={() => this.handleViewDetailClinic(item)}>
                                            <div className='bg-image section-medical-facility'
                                                style={{ background: `url(${item.image}) no-repeat center center`, padding: '10px !important' }}
                                            />
                                            <h3>{item.name}</h3>
                                        </div>
                                    )
                                })

                            }
                        </Slider>
                    </div>

                </div>
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility))
