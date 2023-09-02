import "./AboutMe.css";
import photo from "../../images/photo.jpg";

function AboutMe() {
  return (
    <section className="student" id="student">
      <h2 className="content__title">Студент</h2>
      <article className="about-me">
        <div className="about-me__container">
          <div className="about-me__info">
            <h3 className="about-me__title">Аким</h3>
            <p className="about-me__subtitle">Фронтенд-разработчик, 23 года</p>
            <p className="about-me__description">
              Я живу в Ростове-на-Дону, закончил факультет ИТУ. У меня есть кот Степан и кошка Молли. Увлекаюсь футболом. Люблю слушать музыку.
              Работаю системным администратором. Стремлюсь к тому, чтобы полностью перейти в сферу программирования.
            </p>
          </div>
          <ul className="about-me__contacts">
            <li className="about-me__contact">
              <a className="about-me__link app__link-outside" href="https://github.com/Akim262000">
                Github
              </a>
            </li>
          </ul>
        </div>
        <div className="about-me__photo-container">
          <img className="about-me__photo" src={photo} alt="Фото студента" />
        </div>
      </article>
    </section>
  );
}

export default AboutMe;
