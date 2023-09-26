import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss'
import * as actions from '../../../store/actions'
import Select from 'react-select'
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { getDetailInfoDoctor } from '../../../services/userService';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'dog', label: 'Dog' },
//     { value: 'meow', label: 'Meow' },
// ]


class ManageDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            listPayment: [],
            listProvince: [],
            listPayment: [],
            listPrice: [],

            //save to doctor_info table
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedNameClinic: '',
            selectedAddressClinic: '',
            note: '',


            hasOldData: false
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = []
        let { language } = this.props

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let label = type === 'USERS' ?
                    (language === LANGUAGES.VI ?
                        `${item.lastName} ${item.firstName}` :
                        `${item.firstName} ${item.lastName}`) :
                    (language === LANGUAGES.VI ? item.valueVi
                        : item.valueEn)
                // let labelEn = language === LANGUAGES.VI ? `${item.lastName} ${item.firstName}`
                object.label = label
                object.value = item.id
                result.push(object)
            })

        }
        return result
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.fetchAllRequiredDoctorInfo()
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo
            let dataSelectPrice = this.buildDataInputSelect(resPayment)
            let dataSelectPayment = this.buildDataInputSelect(resPrice)
            let dataSelectProvince = this.buildDataInputSelect(resProvince)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
            console.log('check data selcet: ', dataSelectPrice,
                dataSelectPayment,
                dataSelectProvince)
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: text,
            contentMarkdown: html
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
        console.log('check state', this.state)
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption })
        let res = await getDetailInfoDoctor(selectedOption.value)
        console.log('check res: ', res)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
    }

    handleOnChangeDesc = e => {
        this.setState({
            description: e.target.value
        })
    }

    render() {
        let { hasOldData } = this.state
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id='admin.manage-doctor.title' />
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>
                            <FormattedMessage id='admin.manage-doctor.choose-doctor' />

                        </label>
                        <Select
                            value={this.state.selectedOption}
                            option={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                        />
                    </div>
                    <div className='content-right'>

                        <label>
                            <FormattedMessage id='admin.manage-doctor.intro' />

                        </label>
                        <textarea className='form-control'
                            onChange={(e) => this.handleOnChangeDesc(e)}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>

                </div>
                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label>Select price</label>
                        <Select
                            // option={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-price' />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Select method payment</label>
                        <Select
                            // option={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-payment' />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Select province</label>
                        <Select
                            // option={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-province' />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Select clinic's address</label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Select clinic's name</label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Note</label>
                        <input className='form-control' />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentHTML}
                    />
                </div>
                <button className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    <span>{hasOldData === true ?
                        <FormattedMessage id='admin.manage-doctor.add' />
                        :
                        <FormattedMessage id='admin.manage-doctor.save' />
                    }</span>
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllRequiredDoctorInfo: () => dispatch(actions.fetchRequiredDoctorInfo()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
