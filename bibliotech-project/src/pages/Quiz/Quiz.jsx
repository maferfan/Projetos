import { useState } from "react";
import "./Quiz.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import libilustration from "../../assets/images/imagemquiz.jpg"
import { useNavigate } from "react-router-dom";

const Questions = [
    {
        questionText: 'Qual dos escritores escreveu a "Divina Comédia"?',
        answerOptions: [
            { answerText: "Machado de Assis", isCorrect: false },
            { answerText: "Visconde de Taunay", isCorrect: false },
            { answerText: "Gil Vicente", isCorrect: false },
            { answerText: "Camões", isCorrect: false },
            { answerText: "Dante Alighieri", isCorrect: true },
        ],
    },
    {
        questionText: "Qual obra está corretamente relacionada ao seu autor?",
        answerOptions: [
            {
                answerText: "A Hora da Estrela - Cecília Meirelles",
                isCorrect: false,
            },
            { answerText: "O Cortiço - Machado de Assis", isCorrect: false },
            { answerText: "Macunaíma - Guimarães Rosa", isCorrect: false },
            { answerText: "O Mulato - Aluísio de Azevedo", isCorrect: true },
            { answerText: "Os Lusíadas - Gil Vicente", isCorrect: false },
        ],
    },
    {
        questionText: "Qual destes livros NÃO retrata costumes orientais?",
        answerOptions: [
            { answerText: "As mil e uma noite", isCorrect: false },
            { answerText: "A doçura do mundo", isCorrect: false },
            { answerText: "Luanda Beira Bahia", isCorrect: true },
            { answerText: "Vente leste, vento oeste", isCorrect: false },
        ],
    },
    {
        questionText:
            '"Assassinato no Expresso do Oriente" e "Morte no Nilo" são dois títulos dessa escritora inglesa, considerada a rainha do crime:',
        answerOptions: [
            { answerText: "J.K Rowling", isCorrect: false },
            { answerText: "Agatha Christie", isCorrect: true },
            { answerText: "Georgia Byng", isCorrect: false },
            { answerText: "Imelda Staunton", isCorrect: false },
            { answerText: "Emily Brontë", isCorrect: false },
        ],
    },
    {
        questionText:
            'Importante escritor colombiano que escreveu entre outras obras, "Cem Anos de Solidão" e "O Amor nos Tempos do Cólera":',
        answerOptions: [
            { answerText: "Gabriel García Márquez", isCorrect: true },
            { answerText: "José Assunción Silva", isCorrect: false },
            { answerText: "Germán Arciniegas", isCorrect: false },
            { answerText: "Álvaro Mutis", isCorrect: false },
            { answerText: "Tomás Carrasquilla", isCorrect: false },
        ],
    },
    {
        questionText: "Faz parte da literatura francesa os seguintes livros:",
        answerOptions: [
            {
                answerText: "Cidadela, Uma paixão no deserto, Matilda",
                isCorrect: false,
            },
            {
                answerText:
                    "O corcunda de Notre-Dame, Tormenta de amor e Madame Bovary",
                isCorrect: true,
            },
            {
                answerText:
                    "Correio do Sul, Viagem ao centro da Terra, O jardim da meia-noite",
                isCorrect: false,
            },
            {
                answerText:
                    "O Pequeno Príncipe, A mulher de trinta anos, Assassinato no Expresso do Oriente",
                isCorrect: false,
            },
        ],
    },
    {
        questionText: 'Quem escreveu "As Aventuras de Sherlock Holmes"?',
        answerOptions: [
            { answerText: "Charles Dickens", isCorrect: false },
            { answerText: "Oscar Wilde", isCorrect: false },
            { answerText: "Conan Doyle", isCorrect: true },
            { answerText: "J.R.R Tolkien", isCorrect: false },
            { answerText: "Aldous Houxley", isCorrect: false },
        ],
    },
    {
        questionText:
            '"Os Assassinatos na Rua Morgue"; "Ligéia"; "Berenice" e "A Queda da Casa de Usher" são alguns dos contos de terror e mistério de:',
        answerOptions: [
            { answerText: "William Shakespeare", isCorrect: false },
            { answerText: "Hunter S. Thompson", isCorrect: false },
            { answerText: "Franz Kafka", isCorrect: false },
            { answerText: "Edgar Allan Poe", isCorrect: true },
            { answerText: "Fiódor Dostoiévski", isCorrect: false },
        ],
    },
    {
        questionText:
            '"O Silêncio das Montanhas" e "O Caçador de Pipas" são duas célebres obras deste autor:',
        answerOptions: [
            { answerText: "Al-Khowarizmi", isCorrect: false },
            { answerText: "Ibn Al-Nafis", isCorrect: false },
            { answerText: "Fadwa Toquan", isCorrect: false },
            { answerText: "Khalil Gibran", isCorrect: false },
            { answerText: "Khaled Hosseini", isCorrect: true },
        ],
    },
    {
        questionText: 'Quem escreveu o romance "Macunaíma"?',
        answerOptions: [
            { answerText: "Tarsila do Amaral", isCorrect: false },
            { answerText: "Charles Berlitz", isCorrect: false },
            { answerText: "G. Brocardo", isCorrect: false },
            { answerText: "Vitor Brecheret", isCorrect: false },
            { answerText: "Mário de Andrade", isCorrect: true },
        ],
    },
];

export function Quiz() {
    const [showCard, setShowCard] = useState(false);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    // Se a resposta clicada estiver correta, somar +1 no score
    function handleAnswer(isCorrect) {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        // Se o numero da proxima questão for MENOR que o campo de questões
        // continua executando
        if (nextQuestion < Questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            // Senão, mostra o score final
            setShowScore(true);
        }
    }

    function handleStart() {
        setShowCard(true)
    }


    const navigate = useNavigate();
    function voltarQuiz() {
        navigate('/quiz');
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setShowCard(false);
    }

    function voltarCadastro(){
        navigate("/cadastro")
    }

    return (
        <Container fluid className="welcome">
            <div className="opacidade">
                <div>
                    <h2 className="text-center">
                        Seja bem-vindo(a) ao <strong>Quiz</strong>!
                    </h2>
                    <hr />
                    <p className="paragrafo-quiz">
                        Este quiz possui perguntas sobre escritores nacionais e estrangeiros e
                        suas respectivas contribuições literárias. <br />
                        Para começar, clique no botão abaixo.
                    </p>
                    <div className="d-flex" style={{gap:20}}>
                    <Button className="btn-start" onClick={handleStart}><i class="bi bi-book"></i> Iniciar</Button>
                    <Button className="btn-start" variant="warning" onClick={voltarCadastro}><i class="bi bi-arrow-left"></i> Voltar</Button>
                    </div>
                </div>
                {/* Ao clicar em Iniciar mostra o card */}
                {!showCard ? null : (handleStart = true ? <Card className="card-quiz" >
                    <div className="score-section">
                        {showScore ? (
                            <div>
                                <div>
                                    Você acertou {score} de {Questions.length} perguntas!
                                </div>
                                <div>
                                    <Button className="btn-return" variant="warning" onClick={voltarQuiz}>Voltar</Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Questão */}
                                <div className="question-section">
                                    <Card.Header className="d-flex align-items-center justify-content-between quiz-header">
                                        <span className="quizquestao">Questão {currentQuestion + 1}/{Questions.length}</span>
                                        <Button className="btn-return" variant="warning" onClick={voltarQuiz}>Reiniciar</Button>
                                    </Card.Header>
                                    {/* Texto da questão */}
                                    <Card.Body className="d-flex flex-column" style={{ gap: 20 }}>
                                        <Card.Title className="card-title">
                                            {Questions[currentQuestion].questionText}
                                        </Card.Title>
                                        {/* Opções de resposta */}
                                        <Card.Text className="d-flex justify-content-between" style={{ gap: 50 }}>
                                            {Questions[currentQuestion].answerOptions.map(
                                                (answerOption, index) => (
                                                    <Button
                                                        variant="dark"
                                                        className="btn-answer"
                                                        onClick={() => handleAnswer(answerOption.isCorrect)}
                                                        key={index}
                                                    >
                                                        {answerOption.answerText}
                                                    </Button>
                                                )
                                            )}
                                        </Card.Text>
                                    </Card.Body>
                                </div>
                            </>
                        )}
                    </div>
                </Card> : null)}
            </div>
        </Container>

    );
}