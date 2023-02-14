import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Question from '../components/Question';
import Answers from '../components/Answers';
import Timer from '../components/Timer';
import { thunkQuestions, runTime } from '../redux/action';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      answered: false,
      isDisabled: false,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    /*     this.getAnswers = this.getAnswers.bind(this); */
    this.handAnswers = this.handAnswers.bind(this);
    this.testResponse = this.testResponse.bind(this);
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
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

  testResponse() {
    const { dispatch } = this.props;
    this.setState({
      answered: true,
      isDisabled: true,
    });
    dispatch(runTime());
  }

  nextQuestion() {
    const { questionIndex } = this.state;
    const { questions, dispatch } = this.props;
    dispatch(runTime());
    if (questionIndex <= questions.length - 2) {
      this.setState((prevState) => ({
        questionIndex: prevState.questionIndex + 1,
        answered: false,
      /*   question: questions[prevState.questionIndex + 1], */
      })/* , () => this.getAnswers() */);
    }
  }

  handAnswers() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    const correct = {
      answers: questions[questionIndex].correct_answer,
      dataTest: 'correct-answer',
      style: 'correct-answer',
    };
    const incorrect = questions[questionIndex].incorrect_answers.map((alt, index) => ({
      answers: alt,
      dataTest: `wrong-answer-${index}`,
      style: 'wrong-answer',
    }));
    const magicnumber = 0.5;
    const mergeAlt = [correct, ...incorrect].sort(() => Math.random() - magicnumber);
    return mergeAlt;
  }

  render() {
    const { questionIndex, answered, isDisabled } = this.state;
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
                  answered={ answered }
                  answers={ this.handAnswers() }
                  isDisabled={ isDisabled }
                  testResponse={ this.testResponse }
                />
              </div>)
          }
          {
            answered && (
              <button
                data-testid="btn-next"
                onClick={ () => this.nextQuestion() }
              >
                Next
              </button>
            )
          }
          <Timer />
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
  questions: PropTypes.objectOf.isRequired,
  redirect: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Game);
