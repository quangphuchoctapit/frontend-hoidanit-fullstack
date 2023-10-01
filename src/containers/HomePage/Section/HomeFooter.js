import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';


class HomeFooter extends Component {
    render() {

        return (
            <div className='section-share home-footer'>
                <p>&copy; 2023 Tommy Le. For more information, feel free to visit my Facebook&nbsp;
                    <a target="_blank" href='https://github.com/quangphuchoctapit'>
                        &#8594; Click here &#8592;
                    </a><br />
                    <a target='_blank' href='https://www.figma.com/file/Cl8fhCRsSYKn30INNBToK2/Untitled?type=design&node-id=0%3A1&mode=design&t=8KCAjCDqBsaUCHWu-1'>
                        View Figma which I learned from youtube
                    </a>
                </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
