import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


class OutstandingDoctor extends Component {
    render() {

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Phúc Lê</div>
                                        <div>Biceps 1</div>
                                    </div>
                                </div>

                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>

                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Phúc Lê</div>
                                        <div>Biceps 2</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>

                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Phúc Lê</div>
                                        <div>Biceps 3</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>

                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Phúc Lê</div>
                                        <div>Biceps 4</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>

                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Phúc Lê</div>
                                        <div>Biceps 5</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>

                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Phúc Lê</div>
                                        <div>Biceps 6</div>
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
