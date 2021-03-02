import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from "./components/game";
import Header from "./components/header";
import Footer from "./components/footer/footer";

ReactDOM.render(
    <Fragment>
        <Header />
        <main className="main">
            <Game />
        </main>
        <Footer />
    </Fragment>,
    document.getElementById('root')
);
