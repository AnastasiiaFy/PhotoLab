import '../styles/Home.css';
import heroImageBig from '/assets/images/hero-image-big.png';
import heroImageSmall from '/assets/images/hero-image-small.png';

import qualityIcon from '/assets/icons/quality.png';
import colorIcon from '/assets/icons/color.png';
import paperIcon from '/assets/icons/paper.png';
import formatIcon from '/assets/icons/format.png';

import printClassicImage from '/assets/images/photo-10x15-1.png';
import instaxImage from '/assets/images/instax-1.png';
import polaroidImage from '/assets/images/polaroid-1.png';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
          <div className="hero-text">
              <h1>
                <span>Зроби</span>
                <span>спогади</span>
                <span>відчутними</span>
              </h1>
              <p>Естетичний друк ваших улюблених моментів у будь-якому форматі.</p>
          </div>
          <div className="hero-images">
            <img src={heroImageBig} alt="Основне hero" className="hero-img-big" />
            <img src={heroImageSmall} alt="Декоративне hero" className="hero-img-small"/>
          </div>
      </div>

      <div className="services">
          <h2>Lumina Lotus це</h2>

          <div className="services-grid">
            <div className="service-item">
              <img src={qualityIcon} alt="Висока якість друку" className="service-item-icon" />
              <p>Вічна якість, <br /> що не вигорає</p>
            </div>

            <div className="service-item">
              <img src={colorIcon} alt="Точність передачі кольору" />
              <p>Точність <br /> передачі кольору</p>
            </div>

            <div className="service-item">
              <img src={paperIcon} alt="Преміальні матеріали" />
              <p>Преміальний вибір <br /> паперу та фактур</p>
            </div>

            <div className="service-item">
              <img src={formatIcon} alt="Формати друку" />
              <p>Широкий вибір <br /> форматів</p>
            </div>

          </div>
      </div>

      <div className="popular">
        <h2>Найпопулярніші послуги</h2>

        <div className="popular-grid">
          <div className="popular-item">
            <img src={printClassicImage} alt="Друк фото 10x15" />
            <p>Друк фото 10×15</p>
          </div>

          <div className="popular-item">
            <img src={instaxImage} alt="Друк фото Instax" />
            <p>Друк фото Instax</p>
          </div>

          <div className="popular-item">
            <img src={polaroidImage} alt="Друк фото Polaroid" />
            <p>Друк фото Polaroid</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
