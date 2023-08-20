import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { emitter } from '../../utils/emitter'
import _ from 'lodash'

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

    }

    componentDidMount() {
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }

        console.log('didmount edit modal: ', this.props.currentUser)
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        }, () => {
            // console.log('chek god code: ', this.state)

        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('missing param' + arrInput[i])
                break
            }
        }
        return isValid
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            this.props.editUser(this.state)
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                value={this.state.email} disabled
                                onChange={event => { this.handleOnChangeInput(event, 'email') }} type='text' />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                value={this.state.password} disabled
                                onChange={event => { this.handleOnChangeInput(event, 'password') }} type='password' />
                        </div>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input
                                value={this.state.firstName}
                                onChange={event => { this.handleOnChangeInput(event, 'firstName') }} type='text' />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input
                                value={this.state.lastName}
                                onChange={event => { this.handleOnChangeInput(event, 'lastName') }} type='text' />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input
                                value={this.state.address}
                                onChange={event => { this.handleOnChangeInput(event, 'address') }} type='text' />
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color='primary'
                        className='px-3'
                        onClick={() => { this.handleSaveUser() }}
                    >Save changes</Button>{' '}
                    <Button color='secondary' className='px-3' onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
