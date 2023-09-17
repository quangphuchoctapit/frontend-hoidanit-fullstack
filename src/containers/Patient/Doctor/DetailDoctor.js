import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getDetailInfoDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';


class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {

            }
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailInfoDoctor(id)
            console.log('check res ', res.data)
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }
    render() {
        let { detailDoctor } = this.state
        let { language } = this.props
        let nameVi = ''
        let nameEn = ''
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi} - ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn} - ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        console.log('check state: ', this.state)
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{
                                background: `url(${detailDoctor.image}) no-repeat center center`,
                                width: '120px', height: '120px',
                                borderRadius: '50%', margin: '10px 20px',
                            }}
                        >

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {detailDoctor && detailDoctor.positionData &&
                                    language === LANGUAGES.VI ? nameVi : nameEn
                                }
                            </div>
                            <div className='down'>
                                {detailDoctor && detailDoctor.Markdown &&
                                    <span>{detailDoctor.Markdown.description}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'></div>
                    <div className='detail-info-doctor'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentMarkdown &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentMarkdown }}>
                            </div>
                        }
                    </div>
                    <div className='comment-doctor'></div>
                </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
