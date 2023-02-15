import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Question from '../components/Question';
import Answers from '../components/Answers';
import Timer from '../components/Timer';
import { thunkQuestions } from '../redux/action';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      timer: 5,
      answered: false,
      isDisabled: false,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handAnswers = this.handAnswers.bind(this);
    this.testResponse = this.testResponse.bind(this);
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    await dispatch(thunkQuestions(token));
    this.handleTimer();
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
    const mergeAlt = [correct, ...incorrect];
    return mergeAlt;
  }

  nextQuestion() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    if (questionIndex <= questions.length - 2) {
      this.setState((prevState) => ({
        questionIndex: prevState.questionIndex + 1,
        answered: false,
        isDisabled: false,
        timer: 5,
      }));
    }
    this.handleTimer();
  }

  testResponse() {
    this.setState({
      answered: true,
      isDisabled: true,
    });
  }

  render() {
    const { questionIndex, answered, isDisabled, timer } = this.state;
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
                  answers={ this.handAnswers }
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
const mapStateToProps = (state) => ({
  token: state.user.token,
  questions: state.user.questions,
  redirect: state.user.redirect,
});
Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.objectOf.isRequired,
  redirect: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps)(Game);
