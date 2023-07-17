import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineDollarCircle } from 'react-icons/ai'
import './Main.css'
import { motion } from 'framer-motion'
import { fadeIn } from '../../Data/variants'
import { TableType } from '../../Data/table'
export const Main = ({ tableList }: { tableList: TableType[] }) => {

    const calculateSums = () => {
        let sumD = 0;
        let sumR = 0;

        for (let i = 0; i < tableList.length; i++) {
            if (tableList[i].categories === "Despesa") {
                sumD += tableList[i].value;
            } else {
                sumR += tableList[i].value;
            }
        }

        return { sumD, sumR };
    };

    const { sumD, sumR } = calculateSums();

    return (
        <div className='main-container'>
            <motion.div
                className='main'
                variants={fadeIn('left', 0.3)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: false, amount: 0.3 }}
            >
                <div className='card'>
                    <div className='main-arrow'>
                        Entradas
                        <AiOutlineArrowUp className='arrow' color='green' />
                    </div>
                    {sumR >= 0 && (
                        <div>
                            <h1 className='main-value'> {sumR.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</h1>
                        </div>
                    )}
                </div>
                <div className='card'>
                    <div className='main-arrow'>
                        Saída
                        <AiOutlineArrowDown className='arrow' color='red' />
                    </div>
                    {sumD >= 0 && (
                        <div>
                            <h1 className='main-value'> {sumD.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</h1>
                        </div>
                    )}
                </div>
                <div className='card' style={{ backgroundColor: (sumR - sumD) < 0 ? 'red' : 'green'}}>
                    <div className='main-arrow'>
                        Total
                        <AiOutlineDollarCircle className='arrow' />
                    </div>
                    <div>
                        <h1 className='main-value'>{(sumR - sumD) < 0 ? `-  ${(sumD - sumR).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}` :  ` ${(sumR - sumD).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`}</h1>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};