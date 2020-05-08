import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import './bootstrap.min.css';


function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>);
}

function Book({ title, onClick }) {
  return (
    <div className="answer answer-hover" onClick={() => { onClick(title); }}>
      <h4>{title}</h4>
    </div>
  );
}

// deconstructing author and books from the props object..I think
// highlight will have a value that's determined by the logic of onAnswerSelected that will be either 'correct' or 'wrong'. 'none' will be default which is white
function Turn({ author, books, highlight, onAnswerSelected }) {
  function highLightToBgColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }

  return (
    <div className="row turn" style={{ backgroundColor: highLightToBgColor(highlight) }}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorimage" alt="Author" />
      </div>
      <div className="col-6">
        {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} />)}
      </div>
    </ div>
  );
}

Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
}

function Continue() {
  return (
    <div />
  )
}

function Footer() {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">All images are from <a href="http://commons.wikimedia.org/wiki/Main">Wikemedia Commons</a> and are in the public domain</p>
      </div>
    </div>
  )
}

function AuthorQuiz({ turnData, highlight, onAnswerSelected }) {
  return (
    <div className="container-fluid">
      <Hero />
      {/* highlight will be passed to the highLightToBgColor() function to determine the color of the background and is given via onAnsweredSelected*/}
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
      <Continue />
      <Footer />
    </div>
  );
}

export default AuthorQuiz;
