import styles from './App.module.css'
import poweredImg from './assets/powered.png'
import leftArrow from './assets/leftarrow.png'
import { useState } from 'react'
import { levels, calculateImc, Level } from './helpers/imc'
import { Griditem } from './components/Griditem/Griditem'

function App() {
  const [altura, setAltura] = useState<number>(0)
  const [peso, setPeso] = useState<number>(0)
  const [show, setShow] = useState<Level | null>(null)

  const calcular = () => {
    if (altura && peso) {
      setShow(calculateImc(altura, peso))
    } else {
      alert("Os campos necessitam estar preenchidos!")
    }
  }

  const backButton = () => {
    setShow(null);
    setPeso(0)
    setAltura(0)
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>IMC</h1>
          <p>O IMC é um cálculo simples que permite avaliar se a pessoa está dentro do peso que é considerado ideal para a sua altura.
            Também conhecido como Índice de Massa Corporal, o IMC é uma fórmula utilizada por vários profissionais de saúde, incluindo médicos,
            enfermeiros e nutricionistas, para saber, de uma forma rápida, se a pessoa precisa ganhar ou perder peso.</p>

          <input
            type="number"
            placeholder='Digite a sua altura. Ex: 1.5 (em metros)'
            value={altura === 0 ? '' : altura}
            onChange={(e) => setAltura(parseFloat(e.target.value))}
            disabled={show ? true : false}
          />

          <input
            type="number"
            placeholder='Digite o seu peso. Ex: 75.3 (em kg)'
            value={peso === 0 ? '' : peso}
            onChange={(e) => setPeso(parseFloat(e.target.value))}
            disabled={show ? true : false}
          />

          <button onClick={calcular}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!show ? (<div className={styles.grid}>
            {levels.map((item, key) => (
              <Griditem key={key} item={item}/>
            ))}
          </div>) : (<div className={styles.rightBig}>
            <div className={styles.rightArrow} onClick={backButton}>
              <img src={leftArrow} alt="arrow" width={25} />
            </div>
            <Griditem item={show}/>
          </div>) }
        </div>
      </div>
    </div>
  )
}

export default App