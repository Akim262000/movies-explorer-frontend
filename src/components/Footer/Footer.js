import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
      <div className="footer__container">
        <p className="footer__year"> &copy; 2023</p>
        <ul className="footer__links">
          <li className="footer__item"><a href="https://practicum.yandex.ru" target='_blank' rel='noopener noreferrer'>Яндекс.Практикум</a></li>
          <li className="footer__item"><a href="https://github.com/Akim262000" target='_blank' rel='noopener noreferrer'>Github</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
