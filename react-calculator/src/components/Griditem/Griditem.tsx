import { Level } from '../../helpers/imc'
import styles from './Griditem.module.css'
import upImg from '../../assets/up.png'
import downImg from '../../assets/down.png'

type Props = {
    item: Level
}

export function Griditem({ item }: Props) {
    return (
        <div className={styles.main} style={{ background: item.color }}>
            <div className={styles.gridIcon}>
                <img src={item.icon === 'up' ? upImg : downImg} alt='' width={30} />
            </div>
            <div className={styles.gridTitle}>
                {item.title}
            </div>
            {item.seuImc && <div className={styles.yourImc}>Seu imc é de {item.seuImc} kg/m²</div>}
            <div className={styles.gridInfo}>
                <>
                    IMC está entre <strong>{item.imc[0]}</strong> e <strong>{item.imc[1]}.</strong>
                </>
            </div>
        </div>
    )
}