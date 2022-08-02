import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Jogo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quadrados: Array(9).fill(null),
            proximoX: true,
        };
    }

    renderQuadrado(i) {
        return (<Quadrado value={this.state.quadrados[i]}
            onClick={() => { this.handleClick(i) }} />);
    }

    handleClick(i) {
        const quadrados = this.state.quadrados.slice();
        const winner = calculateWinner(this.state.quadrados);
        if (quadrados[i] == null && !winner) {
            quadrados[i] = (this.state.proximoX ? 'X' : 'O');
            this.setState({
                quadrados: quadrados,
                proximoX: !this.state.proximoX,
            });
        }
    }

    reiniciaJogo() {
        const quadrados = Array(9).fill(null);
        this.setState({ quadrados: quadrados, proximoX: true });
    }

    render() {
        const winner = calculateWinner(this.state.quadrados);
        let status;
        if (winner) {
            status = "Ganhador: " + winner;
        } else if (!winner && !possuiQuadradosVazios(this.state.quadrados)) {
            status = "Empate :/ ";
         } else {
            status = "Próximo jogador: " + (this.state.proximoX ? 'X' : 'O');
        }
        return (
            <div className="quadro">
                <div className="status">{status}</div>
                <div className="coluna-jogo">
                    {this.renderQuadrado(0)}
                    {this.renderQuadrado(1)}
                    {this.renderQuadrado(2)}
                </div>
                <div className="coluna-jogo">
                    {this.renderQuadrado(3)}
                    {this.renderQuadrado(4)}
                    {this.renderQuadrado(5)}
                </div>
                <div className="coluna-jogo">
                    {this.renderQuadrado(6)}
                    {this.renderQuadrado(7)}
                    {this.renderQuadrado(8)}
                </div>
                <button className="botao-reiniciar" onClick={() => { this.reiniciaJogo() }}>  Reiniciar o Jogo </button>
            </div>

        );
    }
}


function Quadrado(props) {
    return (
        <button className="quadrado" onClick={() => { props.onClick() }}>
            {props.value}
        </button>
    );
}

class JogoDaVelha extends React.Component {
    render() {
        return <div className="jogao">
            <div className="jogao-brabo">
                <div><Jogo /></div>
            </div>
        </div>;
    }
}

function possuiQuadradosVazios(quadrados) {
    let possuivazio = false;
    for (let index = 0; index < quadrados.length; index++) {
        if (quadrados[index] == null) {
            possuivazio = true;
        }
    }

    return possuivazio;
}

function calculateWinner(quadrados) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
            return quadrados[a];
        }
    }
    return null;
}

// ======================

ReactDOM.render(<JogoDaVelha />,
    document.getElementById('root'));