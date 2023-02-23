import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Question from '../components/Question';
import Answers from '../components/Answers';
import Timer from '../components/Timer';
import { thunkQuestions, score } from '../redux/action';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      timer: 30,
      answered: false,
      isDisabled: false,
      answers: [],
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handAnswers = this.handAnswers.bind(this);
    this.testResponse = this.testResponse.bind(this);
    this.sumScore = this.sumScore.bind(this);
  }

  async componentDidMount() {
    const { thunk } = this.props;
    const token = localStorage.getItem('token');
    if (!token) return;
    const questions = await thunk(token);
    if (!questions || questions.length === 0) {
      return;
    }
    this.handleTimer();
    this.handAnswers(questions);
  }

  handleTimer() {
    const magicNumber = 1000;
    const interval = setInterval(() => {
      const { timer, answered } = this.state;
      if (timer === 0 || answered) {
        this.setState({
          isDisabled: true,
        });
        return clearInterval(interval);
      }
      if (timer >= 0 && !answered) {
        this.setState({
          timer: timer - 1,
        });
      }
    }, magicNumber);
  }

  handAnswers(questions) {
    const { questionIndex } = this.state;
    const correctAnswer = 'correct-answer';
    console.log('aaa');
    const correct = {
      answers: questions[questionIndex].correct_answer,
      dataTest: correctAnswer,
      style: correctAnswer,
    };
    const incorrect = questions[questionIndex].incorrect_answers.map((alt, index) => ({
      answers: alt,
      dataTest: `wrong-answer-${index}`,
      style: 'wrong-answer',
    }));
    const mergeAlt = [correct, ...incorrect];
    const sortNumber = 0.5;
    this.setState({
      answers: mergeAlt.sort(() => (Math.random() - sortNumber)),
    });
  }

  sumScore() {
    const { timer, questionIndex } = this.state;
    const { sumScore, questions } = this.props;
    const mandatoryNum = 10;
    let sumPoints = 0;
    if (questions[questionIndex].difficulty === 'hard') {
      const hard = 3;
      sumPoints = mandatoryNum + (timer * hard);
    }
    if (questions[questionIndex].difficulty === 'medium') {
      const medium = 2;
      sumPoints = mandatoryNum + (timer * medium);
    }
    if (questions[questionIndex].difficulty === 'easy') {
      const easy = 1;
      sumPoints = mandatoryNum + (timer * easy);
    }
    sumScore(sumPoints);
  }

  nextQuestion() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    console.log(questions);
    if (questionIndex <= questions.length - 2) {
      this.setState((prevState) => ({
        questionIndex: prevState.questionIndex + 1,
        answered: false,
        isDisabled: false,
        timer: 30,
      }), () => this.handAnswers(questions));
    }
    this.handleTimer();
    if (questionIndex === questions.length - 1) {
      const { history } = this.props;
      history.push('/feedback');
    }
  }

  testResponse(dataTest) {
    console.log(dataTest);
    this.setState({
      answered: true,
      isDisabled: true,
    });
    if (dataTest === 'correct-answer') {
      this.sumScore();
    }
  }

  render() {
    const { questionIndex, answered, isDisabled, timer, answers } = this.state;
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
                  timer={ timer }
                  answered={ answered }
                  answers={ answers }
                  isDisabled={ isDisabled }
                  testResponse={ this.testResponse }
                />
              </div>)
          }
          {
            (answered || timer === 0) && (
              <button
                data-testid="btn-next"
                onClick={ () => this.nextQuestion() }
              >
                Next
              </button>
            )
          }
          <Timer
            handleTimer={ timer }
          />
        </div>)
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sumScore: (sumPoints) => dispatch(score(sumPoints)),
  thunk: (token) => dispatch(thunkQuestions(token)),
});

const mapStateToProps = (state) => ({
  token: state.user.token,
  questions: state.user.questions,
  redirect: state.user.redirect,
});

Game.propTypes = {
  sumScore: PropTypes.func.isRequired,
  thunk: PropTypes.func.isRequired,
  questions: PropTypes.objectOf.isRequired,
  redirect: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
