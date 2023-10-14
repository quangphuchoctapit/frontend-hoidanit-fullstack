import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils } from '../../../utils';
import { createNewClinic } from '../../../services/userService'
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }

    handleSaveNewClinic = async () => {
        let res = await createNewClinic({
            name: this.state.name,
            address: this.state.address,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,
            image: this.state.imageBase64
        })
        if (res && res.errCode === 0) {
            toast.success('successfully created new clinic')
            this.setState({
                name: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                imageBase64: ''
            })
        }
        else {
            toast.error('error when created new clinic')

        }
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

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    handleOnChangeInput = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value
        this.setState({
            ...stateCopy
        })
    }

    render() {

        return (
            <>
                <div className='manage-specialty-container'>
                    <div className='ms-title'>Manage Clinic</div>
                    <div className='add-new-specialty row'>
                        <div className='col-6 form-group'>
                            <label>Clinic's name</label>
                            <input className='form-control' value={this.state.name} onChange={e => this.handleOnChangeInput(e, 'name')} />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Clinic's avatar</label>
                            <input onChange={e => this.handleOnChangeImage(e)} className='form-control-file' type='file' />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Clinic's address</label>
                            <input onChange={e => this.handleOnChangeInput(e, 'address')} className='form-control' value={this.state.address} />
                        </div>
                        <div
                            className='col-12'
                        >
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className='col-12'>
                            <button
                                onClick={() => this.handleSaveNewClinic()}
                                className='btn-save-specialty'>Save</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
