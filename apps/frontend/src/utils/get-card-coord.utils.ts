interface IGetCardCoord {
  (
    maxCoord: number, 
    coord: number, 
    cardSize: number, 
    offset: number
  ): number
}

const getCardCoord: IGetCardCoord = (
  maxCoord, 
  coord, 
  cardSize, 
  offset
) => 
  coord > maxCoord - cardSize 
    ? maxCoord - cardSize - offset 
    : coord;

export default getCardCoord;