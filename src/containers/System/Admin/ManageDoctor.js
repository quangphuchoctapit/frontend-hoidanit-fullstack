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
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {}
                    let label = (language === LANGUAGES.VI ? `${item.lastName} ${item.firstName}` : `${item.firstName} ${item.lastName}`)
                    // let labelEn = language === LANGUAGES.VI ? `${item.lastName} ${item.firstName}`
                    object.label = label
                    object.value = item.id
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                console.log('checkk price: ', inputData)
                inputData.map((item, index) => {
                    let object = {}
                    let label = (language === LANGUAGES.VI ? `${item.valueVi} VND` : `${item.valueEn} USD`)
                    // let labelEn = language === LANGUAGES.VI ? `${item.lastName} ${item.firstName}`
                    object.label = label
                    object.value = item.keyMap
                    result.push(object)
                }
                )
            }
            if (type === 'PAYMENT') {
                console.log('checkk payment: ', inputData)
                inputData.map((item, index) => {
                    let object = {}
                    let label = (language === LANGUAGES.VI ? `${item.valueVi}` : `${item.valueEn}`)
                    // let labelEn = language === LANGUAGES.VI ? `${item.lastName} ${item.firstName}`
                    object.label = label
                    object.value = item.keyMap
                    result.push(object)
                }
                )
            }
            if (type === 'PROVINCE') {
                console.log('checkk province: ', inputData)
                inputData.map((item, index) => {
                    let object = {}
                    let label = (language === LANGUAGES.VI ? `${item.valueVi}` : `${item.valueEn}`)
                    // let labelEn = language === LANGUAGES.VI ? `${item.lastName} ${item.firstName}`
                    object.label = label
                    object.value = item.keyMap
                    result.push(object)
                }
                )
            }
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
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')

            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
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
            //save to markdown table
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,


            //save to doctor_info table
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedNameClinic: this.state.selectedNameClinic,
            selectedAddressClinic: this.state.selectedAddressClinic,
            note: this.state.note
        })
        // console.log('check: ', this.state.selectedPrice.value,
        //     this.state.selectedPayment.value,
        //     this.state.selectedProvince.value,
        //     'clinic name: ',
        //     this.state.selectedNameClinic,
        //     'clinic address: ',
        //     this.state.selectedAddressClinic,
        //     this.state.note
        // )
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption })
        let res = await getDetailInfoDoctor(selectedOption.value)
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

    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption
        this.setState({
            ...stateCopy
        })
        console.log('check handleChangeSelectDoctorInfo: ', selectedOption, stateName)
    }

    handleOnChangeText = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value
        this.setState({
            ...stateCopy
        })
    }

    render() {
        console.log('chekc state: ', this.state)
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
                            onChange={(e) => this.handleOnChangeText(e, 'description')}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>

                </div>
                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label>Select price</label>
                        <Select
                            value={this.state.selectedPrice}
                            // option={this.state.selectedOption}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPrice}
                            name={'selectedPrice'}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-price' />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Select method payment</label>
                        <Select
                            value={this.state.selectedPayment}
                            // option={this.state.selectedOption}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPayment}
                            name={'selectedPayment'}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-payment' />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Select province</label>
                        <Select
                            value={this.state.selectedProvince}
                            // option={this.state.selectedOption}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listProvince}
                            name={'selectedProvince'}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-province' />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Select clinic's address</label>
                        <input className='form-control'
                            onChange={(e) => this.handleOnChangeText(e, 'selectedAddressClinic')}
                            value={this.state.selectedAddressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Select clinic's name</label>
                        <input className='form-control'
                            onChange={(e) => this.handleOnChangeText(e, 'selectedNameClinic')}
                            value={this.state.selectedNameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Note</label>
                        <input className='form-control'
                            onChange={(e) => this.handleOnChangeText(e, 'note')}
                            value={this.state.note}
                        />
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
