import { SxProps } from '@mui/material';
import { blue } from '@mui/material/colors';


interface ICssStyle {
  [propName: string]: string | number 
}

export const layerStyle: ICssStyle = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}

export const linkStyle: SxProps = {
  bgcolor: blue[700],
  color: '#fff',
  p: '8px 16px', 
  borderRadius: 1
}  