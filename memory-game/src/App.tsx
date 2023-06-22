import { useEffect, useState } from "react"
import * as C from "./App.styles"
import logoImg from './assets/devmemory_logo.png'
import { Button } from "./components/Button/Button"
import { InfoItem } from "./components/InfoItem/InfoItem"
import restartIcon from './svgs/restart.svg'
import { Grid } from "./types/Grid"
import { items } from "./data/items"
import { GridItem } from "./components/GridItem/GridItem"
import { formatTime } from "./helpers/formatTime"

function App() {
  const [playing, setPlaying] = useState<boolean>(false)
  const [time, setTime] = useState<number>(0)
  const [move, setMove] = useState<number>(0)
  const [shownCount, setShownCount] = useState<number>(0)
  const [grid, setGrid] = useState<Grid[]>([])

  useEffect(() => {
    resetAndCreateGrid();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing === true) {
        setTime(time + 1)
      }
    }, 1000);
    return () => clearInterval(timer)
  }, [playing, time])

  useEffect(() => {
    if(move > 0 && grid.every(item => item.permanentShown = true)){
      setPlaying(false)
    }
  }, [move, grid])

  useEffect(() => {
    if (shownCount === 2) {
      let opened = grid.filter((item) => item.shown === true)
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...grid]
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true
              tmpGrid[i].shown = false
            }
            setGrid(tmpGrid)
            setShownCount(0)
          }
        } else {
          setTimeout(() => {
            let tmpGrid = [...grid]
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false
            }
            setGrid(tmpGrid)
            setShownCount(0)
          }, 1000)
        }
        setMove(move => move + 1)
      }
    }
  }, [shownCount, grid])

  function resetAndCreateGrid() {
    setTime(0)
    setMove(0)
    setShownCount(0)
    let gridTemp: Grid[] = []
    for (let i = 0; i < (items.length * 2); i++) {
      gridTemp.push({
        item: null,
        shown: false,
        permanentShown: false
      })
    }

    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let position = -1
        while (position < 0 || gridTemp[position].item !== null) {
          position = Math.floor(Math.random() * (items.length * 2))
        }
        gridTemp[position].item = i;
      }
    }

    setGrid(gridTemp)

    setPlaying(true)
  }

  const handleItem = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tmpGrid = [...grid]

      if (tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true
        setShownCount(shownCount + 1)
      }
      setGrid(tmpGrid)
    }

  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink>
          <img src={logoImg} width='200' alt=""></img>
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTime(time)}></InfoItem>
          <InfoItem label="Movimentos" value={move.toString()}></InfoItem>
        </C.InfoArea>

        <Button label='Reiniciar' icon={restartIcon} onClick={resetAndCreateGrid} />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {grid.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItem(index)}
            />
          )
          )}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  )
}

export default App 
