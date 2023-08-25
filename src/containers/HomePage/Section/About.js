import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class About extends Component {
    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói về Tommy Le
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe
                            width="100%" height="400"
                            title="BookingCare trên VTV1"
                            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen="" src="https://www.youtube-nocookie.com/embed/FyDQljKtWnI?autoplay=1">
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>Heelo m nam oki8 bruh brah OPwa lmfao keke vay quanh 4 huong trong dau la 5 gram cocain
                            Tylko jedno w głowie mam
                            Koksu pięc gram
                            Odlecieć sam
                            W krainę zapomnienia
                            W głowie mysli mam
                            Kiedy skończy się ten stan
                            Gdy już nie będę sam
                            Bo wjedzie biały węgorz
                            Tylko jedno w głowie mam
                            Koksu pięc gram
                            Odlecieć sam
                            W krainę zapomnienia
                            W głowie mysli mam
                            Kiedy skończy się ten stan
                            Gdy już nie będę sam
                            Bo wjedzie biały węgorz
                            Ja pierdolę, ale mam zjazd
                            Nie chwytam gwiazd, jak kłoda leżę
                            Nie wierzę
                            Co się dzieje
                            Jak kura z głodu pieję
                            Jak wilkołak do księżyca
                            W głowie dziury jak ulica
                            Przed twoją chatą
                            Rozpuszczam się jak baton
                            Który leży na blacie
                            Zejście jest jak nie wciągacie
                            Bracie kurwa ryj mi krzywi
                            W głowie burdеl jak w TV
                            Mnie nie dziwi taki stan
                            Brak towaru, w myślach ćpam
                            Rade dam albo niе dam
                            Wszystko kurwa z chaty sprzedam
                            W sumie mam już przejebane
                            Wszystko jednak jest sprzedane
                            Ja pierdolę, same długi
                            Kinol jak u Tabalugi
                            Dzień drugi bez walenia
                            Gdzie jest wąż? Biała chemia
                            Jebane zejście tak wykańcza
                            Jak by w chuja dziabła cię szarańcza
                            Tylko jedno w głowie mam
                            Koksu pięc gram
                            Odlecieć sam
                            W krainę zapomnienia
                            W głowie mysli mam
                            Kiedy skończy się ten stan
                        </p>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
