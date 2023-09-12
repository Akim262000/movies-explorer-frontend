import "./Footer.css";

function Footer(props) {
  return (
    <footer className={!props.savedMoviesPage ? "footer" : "footer__save-movies"}>
      <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
      <div className="footer__container">
        <p className="footer__year"> &copy; 2023</p>
        <ul className="footer__links">
          <li className="footer__item"><a className="footer__link app__link" href="https://practicum.yandex.ru" target='_blank' rel='noopener noreferrer'>Яндекс.Практикум</a></li>
          <li className="footer__item"><a className="footer__link app__link" href="https://github.com/Akim262000" target='_blank' rel='noopener noreferrer'>Github</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
