import "./Portfolio.css";
import arrow from "../../images/arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__projects">
        <li className="portfolio__project">
          <p className="portfolio__subtitle">Статичный сайт</p>
          <a className="portfolio__link app__link" href="https://github.com/Akim262000/how-to-learn" target="_blank" rel="noopener noreferrer">
            <img src={arrow} alt="Ссылка на проект со статичным сайтом" />
          </a>
        </li>
        <li className="portfolio__project">
          <p className="portfolio__subtitle">Адаптивный сайт</p>
          <a className="portfolio__link app__link" href="https://github.com/Akim262000/russian-travel" target="_blank" rel="noopener noreferrer">
            <img src={arrow} alt="Ссылка на проект с адаптивным сайтом" />
          </a>
        </li>
        <li className="portfolio__project">
          <p className="portfolio__subtitle">Одностраничное приложение</p>
          <a className="portfolio__link app__link" href="https://github.com/Akim262000/react-mesto-api-full-gha" target="_blank" rel="noopener noreferrer">
            <img src={arrow} alt="Ссылка на проект с одностраничным приложением" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
