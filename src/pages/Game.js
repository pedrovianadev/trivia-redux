import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { thunkQuestions } from '../redux/action';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      filteredQuestion: [],
      answers: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateCounter = this.updateCounter.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    dispatch(thunkQuestions(token));
  }

  handleClick() {
    this.updateCounter();
  }

  handleAnswers(question) {
    const { answers } = this.state;
    const array = Object.entries(question);
    console.log(question);
  }

  updateCounter() {
    const { counter } = this.state;
    const { questions } = this.props;
    const max = 4;
    if (counter === max) {
      this.setState({
        counter: 0,
      });
    } else {
      this.setState((prevState) => ({
        counter: prevState.counter + 1,
      }));
    }
    const filter = questions.map((e) => (e)).filter((_key, i) => i === counter);
    console.log(filter[0]);
    this.setState({
      filteredQuestion: filter[0],
    });
  }

  render() {
    const { counter, filteredQuestion } = this.state;
    const { questions } = this.props;
    return (
      <div>
        <Header />
        <div data-testid="answer-options">
          <p data-testid="question-category">{filteredQuestion.category}</p>
          <p data-testid="question-text">
            {filteredQuestion.question}
          </p>
          {this.handleAnswers(filteredQuestion)}
        </div>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Buscar
        </button>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.user.questions,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

export default connect(mapStateToProps)(Game);

{ /* { questions.map((answer, index) => (

            <button
              type="button"
              key={ index }
              data-testid={
                answer.correct ? 'correct-answer' : `wrong-answer-${index}`
              }
              onClick={ this.handleClick }
              style={
                answered ? { border: answer.correct ? '3px solid rgb(6,240,15)' : '3px solid red'}
                : { border: '3px solid black' }
              }
            >
              Resposta
              { answer.correctquestions ? { answer.correct_answer } : {incorrect_answers.find((incorrect, index) => index === answer.index)}}
            </button>

          ))} */ }

{ }

//   <button
//   type="button"
//   data-testid={
//     e.correct ? 'correct-answer' : `wrong-answer-${index}`
//   }
//   id={
//     e.correct ? 'correct-answer' : `wrong-answer-${index}`
//   }
// >
//   Resposta
//   { index }
// </button>

// (Object.keys(filteredQuestion)
//             .find((key) => console.log(key === 'incorrect_answers')))
