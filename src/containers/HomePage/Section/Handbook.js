import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


class Handbook extends Component {
    render() {

        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='patient.handbook.handbook' /></span>
                        <button className='btn-section'><FormattedMessage id='patient.handbook.more-info' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-handbook' />
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư, Tiến sĩ Phúc Lê</div>
                                    <div>Biceps 1</div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-handbook' />
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư, Tiến sĩ Phúc Lê</div>
                                    <div>Biceps 2</div>
                                </div>
                            </div><div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-handbook' />
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư, Tiến sĩ Phúc Lê</div>
                                    <div>Biceps 3</div>
                                </div>
                            </div><div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-handbook' />
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư, Tiến sĩ Phúc Lê</div>
                                    <div>Biceps 4</div>
                                </div>
                            </div><div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-handbook' />
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư, Tiến sĩ Phúc Lê</div>
                                    <div>Biceps 5</div>
                                </div>
                            </div><div className='section-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-handbook' />
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư, Tiến sĩ Phúc Lê</div>
                                    <div>Biceps 6</div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
