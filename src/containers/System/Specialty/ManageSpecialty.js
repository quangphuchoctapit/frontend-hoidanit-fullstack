import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant';
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService'
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    handleOnChangeInput = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html
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

    handleSaveNewSpecialty = async () => {
        console.log('check state save: ', this.state)
        let res = await createNewSpecialty({ ...this.state })
        if (res && res.errCode === 0) {
            toast.success('Successfully created new specialty')
        }
        else {
            toast.error('Error! Cannot Save Specialty')
        }
    }

    render() {

        return (
            <>
                <div className='manage-specialty-container'>
                    <div className='ms-title'>Manage Specialties</div>
                    <div className='add-new-specialty row'>
                        <div className='col-6 form-group'>
                            <label>Specialty's name</label>
                            <input className='form-control' value={this.state.name} onChange={e => this.handleOnChangeInput(e, 'name')} />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Specialty's avatar</label>
                            <input onChange={e => this.handleOnChangeImage(e)} className='form-control-file' type='file' />
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
                                onClick={() => this.handleSaveNewSpecialty()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
