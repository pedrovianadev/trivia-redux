import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Question from '../components/Question';
import Answers from '../components/Answers';
import { thunkQuestions } from '../redux/action';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
    /*   question: null,
      answers: null, */
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    /*     this.getAnswers = this.getAnswers.bind(this); */
    this.handAnswers = this.handAnswers.bind(this);
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    console.log(token);
    await dispatch(thunkQuestions(token));
    const { questions } = this.props;
    console.log(questions);
    // const { questionIndex } = this.state;

  /*   this.setState({
      question: questions[questionIndex],
    }, () => this.getAnswers() ); */
  }

  /*  getAnswers() {
    const { question } = this.state;
    return question && this.setState({
      answers: [...question.incorrect_answers, question.correct_answer].sort(),
    });
  } */

  nextQuestion() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    if (questionIndex <= questions.length - 2) {
      this.setState((prevState) => ({
        questionIndex: prevState.questionIndex + 1,
      /*   question: questions[prevState.questionIndex + 1], */
      }), () => this.getAnswers());
    }
  }

  handAnswers() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    const correct = {
      answers: questions[questionIndex].correct_answer,
      dataTest: 'correct-answer',
    };
    const incorrect = questions[questionIndex].incorrect_answers.map((alt, index) => ({
      answers: alt,
      dataTest: `wrong-answer-${index}`,
    }));
    const magicnumber = 0.5;
    const mergeAlt = [correct, ...incorrect].sort(() => Math.random() - magicnumber);
    return mergeAlt;
  }

  render() {
    const { questionIndex } = this.state;
    const { questions, redirect } = this.props;

    return (redirect ? <Redirect to="/" />
      : (
        <div>
          <Header />
          {
            questions.length > 0
            && (
              <div>
                <Question question={ questions[questionIndex] } />
                <Answers
                  answers={ this.handAnswers() }
                />
              </div>)
          }
          <button onClick={ () => this.nextQuestion() }>Próxima Pergunta </button>
        </div>)
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  time: state.time.time,
  questions: state.user.questions,
  redirect: state.user.redirect,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.shape([]).isRequired,
  redirect: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Game);

/*   { questions.map((answer, index) => (
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
  ))} */

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
