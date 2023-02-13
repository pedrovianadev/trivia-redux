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
      question: null,
      answers: null,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    console.log(token);
    await dispatch(thunkQuestions(token));
    const { questions } = this.props;
    console.log(questions);
    const { questionIndex } = this.state;

    this.setState({
      question: questions[questionIndex],
    }, () => this.getAnswers());
  }

  getAnswers() {
    const { question } = this.state;
    return question && this.setState({
      answers: [...question.incorrect_answers, question.correct_answer].sort(),
    });
  }

  nextQuestion() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    if (questionIndex <= questions.length - 2) {
      this.setState((prevState) => ({
        questionIndex: prevState.questionIndex + 1,
        question: questions[prevState.questionIndex + 1],
      }), () => this.getAnswers());
    }
  }

  render() {
    const { question, answers } = this.state;
    const { questions, redirect } = this.props;

    return (redirect ? <Redirect to="/" />
      : <div>
        <Header />
        {
          question
          && <div>
            <Question question={ question } />
            <Answers answers={ answers } />
          </div>
        }
        <button onClick={ () => this.nextQuestion() }>Próxima Pergunta </button>
      </div>

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
  token: PropTypes.string.isRequired,
  questions: PropTypes.shape([]).isRequired,
};

export default connect(mapStateToProps)(Game);
