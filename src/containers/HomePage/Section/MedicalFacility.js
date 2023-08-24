import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


class MedicalFacility extends Component {
    render() {

        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <h3>Hệ thống Y tế Thu Cúc 1</h3>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <h3>Hệ thống Y tế Thu Cúc 2</h3>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <h3>Hệ thống Y tế Thu Cúc 3</h3>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <h3>Hệ thống Y tế Thu Cúc 4</h3>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <h3>Hệ thống Y tế Thu Cúc 5</h3>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <h3>Hệ thống Y tế Thu Cúc 6</h3>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
