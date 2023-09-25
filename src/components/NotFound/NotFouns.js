import { Link } from "react-router-dom";

import './NotFound.css';

function NotFound () {
  return (
    <div className="not-found__container">
      <div className="not-found__error">
        <span className="not-found__status">404</span>
        <span className="not-found__message">Страница не найдена</span>
      </div>
      <Link to='/' className="not-found__link">Назад</Link>
    </div>
  )
}

export default NotFound;

// import { Link, useNavigate } from "react-router-dom";

// import './NotFound.css';

// function NotFound () {

//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(-1);
//   }

//   return (
//     <div className="not-found__container">
//       <div className="not-found__error">
//         <span className="not-found__status">404</span>
//         <span className="not-found__message">Страница не найдена</span>
//       </div>
//       <Link onClick={handleClick} className="not-found__link">Назад</Link>
//     </div>
//   )
// }

// export default NotFound;