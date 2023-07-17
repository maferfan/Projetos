import { TableType } from '../../Data/table';
import img from '../../assets/imageLogo.png'
import './Header.css'
import { useState } from 'react'
import { motion } from 'framer-motion';
import { fadeIn } from '../../Data/variants';

export const Header = ({ tableList, setTableList }: { tableList: TableType[]; setTableList: React.Dispatch<React.SetStateAction<TableType[]>> }) => {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [categories, setCategories] = useState<'Despesa' | 'Receita'>('Despesa');
    const [data, setData] = useState('');

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    const addExpense = () => {
        if (title && categories && data && value) {
            const newExpense: TableType = {
                title,
                value,
                categories,
                data
            }
            setTableList([...tableList, newExpense])
            alert('tabela adicionada com sucesso')
        } else {
            alert('Algumas informações não foram preenchidas.')
        }
    }

    return (
        <>
            <div className='header-container'>
                <div className='header'>
                    <div className='header-info'>
                        <img className='header-img' src={img} alt="" />
                        <h1 className='header-title'>Sistema financeiro</h1>
                        <p className='header-me'>by @ferrazzam_</p>
                    </div>
                    <div className='header-newtransition'>
                        <button className='header-button' onClick={handleOpenModal}>Nova transação</button>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className='modal-overlay'>
                    <motion.div className='modal' variants={fadeIn('top', 0.1)} initial='hidden' whileInView={'show'} viewport={{ once: false, amount: 0.3 }}>
                        <h2 className='modal-title'>$</h2>
                        <input type="text" placeholder='Digíte o título' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input type="number" placeholder='Valor' value={value} onChange={(e) => setValue(parseFloat(e.target.value.replace(',', '.')))} />
                        <select className='modal-select' value={categories} onChange={(e) => setCategories((e.target.value as 'Despesa' | 'Receita'))}>
                            <option value="">Selecione a categoria</option>
                            <option value="Despesa">Despesa</option>
                            <option value="Receita">Receita</option>
                        </select>
                        <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
                        <div className='modal-button'>
                            <button onClick={handleCloseModal}>Fechar</button>
                            <button onClick={addExpense} >Adicionar</button>
                        </div>
                    </motion.div>
                </div>
            )}
            {!showModal && <div className='modal-overlay-hidden'></div>}
        </>
    )
}