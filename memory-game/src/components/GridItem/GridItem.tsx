import { Grid } from '../../types/Grid'
import * as C from './styles'
import b7svg from '../../svgs/b7.svg'
import { items } from '../../data/items'

type Props = {
    item: Grid,
    onClick: () => void
}

export function GridItem({ item, onClick }: Props) {
    return (
        <C.Container onClick={onClick} showBackground={item.permanentShown || item.shown}>
            {item.permanentShown === false && item.shown === false &&
                <C.Icon src={b7svg} alt=''  opacity={.1}/>}
            {(item.permanentShown || item.shown) && item.item !== null &&
                <C.Icon src={items[item.item].icon} alt='' />}
        </C.Container>
    )
}