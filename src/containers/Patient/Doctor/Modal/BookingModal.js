import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils/constant';
import './BookingModal.scss'
import { Button, Modal } from 'reactstrap'



class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }

    render() {

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
                            <span className='left'>Thong tin dat lich kham benh</span>
                            <span className='right' onClick={() => this.props.handleExitModalBooking()}><i className="fas fa-times"></i></span>
                        </div>
                        <div className='booking-modal-body'>
                            {/* {JSON.stringify(this.props.dataTime)} */}
                            <div className='doctor-in4'>

                            </div>
                            <div className='price'>
                                gia kham: 500,000vnd
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>HO va ten</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 group'>
                                    <label>So dien thoai</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Dia chi emeail</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 group'>
                                    <label>Dia chi lien he</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-12 form-group'>
                                    <label>Ly do kham</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 group'>
                                    <label>Dat cho ai</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 group'>
                                    <label>Gioi tinh</label>
                                    <input className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-cancel ' onClick={() => this.props.handleExitModalBooking()}>Cancel</button>
                            <button className='btn-booking-confirm' onClick={() => this.props.handleExitModalBooking()}>Confirm</button>

                        </div>
                    </div>
                </Modal>
                heelo man
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
