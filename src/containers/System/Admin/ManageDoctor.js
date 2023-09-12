import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss'
import * as actions from '../../../store/actions'
import Select from 'react-select'


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'dog', label: 'Dog' },
    { value: 'meow', label: 'Meow' },
]


class ManageDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: ''
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: text,
            contentMarkdown: html
        })
    }

    handleSaveContentMarkdown = () => {
        console.log('check state', this.state)
    }

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor })
        console.log('option selected: ', selectedDoctor)
    }

    handleOnChangeDesc = e => {
        this.setState({
            description: e.target.value
        })
    }

    render() {
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Create new doctor's information
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Choose doctor</label>
                        <Select
                            option={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={options}
                        />
                    </div>
                    <div className='content-right'>

                        <label>Introduction Info: </label>
                        <textarea className='form-control' rows='4'
                            onChange={(e) => this.handleOnChangeDesc(e)}
                            value={this.state.description}
                        >
                            asdav
                        </textarea>
                    </div>

                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
                </div>
                <button className='save-content-doctor'
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    Save
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
