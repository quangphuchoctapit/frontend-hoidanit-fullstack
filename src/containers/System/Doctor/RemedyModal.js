import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { CommonUtils } from '../../../utils';
import { LANGUAGES } from '../../../utils/constant';
import './RemedyModal.scss'
import { Button, Form, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import _ from 'lodash'
import { toast } from 'react-toastify'


class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: '',
            id: ''
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleSendRemedy = () => {
        console.log('chek state: ', this.state)
        this.props.handleSendRemedy(this.state)
    }
    render() {
        let { isOpenModal, handleExitModalRemedy, dataModal } = this.props
        return (
            <>
                <Modal
                    isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size='md'
                    centered
                >
                    <div className='booking-modal-header'>
                        <span className='left'>
                            <FormattedMessage id='patient.booking-modal.title' />
                        </span>
                        <span className='right' onClick={() => this.props.handleExitModalRemedy()}><i className="fas fa-times"></i></span>
                    </div>
                    <ModalBody>
                        <div className='row '>
                            <div className='form-group col-6'>
                                <label>name</label>
                                <input type='email' className='form-control' onChange={e => this.handleOnChangeEmail(e)} value={this.state.email} />
                            </div>
                            <div className='form-group col-6'>
                                <label>don tuhoc</label>
                                <input type='file' onChange={e => this.handleOnChangeImage(e)} className='form-control=file' />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={() => this.handleSendRemedy()}>Confirm</Button>
                        <Button color='secondary' onClick={() => this.props.handleExitModalRemedy()}>Close</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
