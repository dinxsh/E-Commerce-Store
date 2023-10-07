import React, { useState } from 'react'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import PFP from './assets/user.png'
import { Dashboard , Person , ExitToApp , ListAlt } from '@material-ui/icons'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import './Header.css'
import { useAlert } from 'react-alert'
import { logout } from './actions/userAction'
import { useDispatch } from 'react-redux'

const UserOptions = ({user}) => { 
  const [ open, setOpen] = useState(false)
  
  const alert = useAlert()
  const history = useHistory()
  const dispatch = useDispatch()

  const account = ()=>{
    history.push('/account')
  }

  const List = ()=>{
    history.push('/List')
  }

  const Logout = ()=>{
    history.push('/Logout')
    alert.success("Logged Out Successfully")
    dispatch(logout())
  }

  const dashBoard = ()=>{
    history.push('/dashBoard')
  }
  const options = [
    {icon: <Person/> , name:"Person" , func: account},
    {icon: <ListAlt /> , name:"List", func:List },
    { icon: <ExitToApp/>, name:"Exit", func: Logout  }
  ]
  if(user.role==="admin"){
    options.unshift({
      icon: <Dashboard/>,
       name:"Dashboard",
       func:dashBoard 
      });
  }
  return ( 
    <div className='speed-dial' >
      <SpeedDial
      style={{zIndex:"11"}}
      ariaLabel='SpeedDial'
      onMouseEnter={()=> setOpen(true)}
      onMouseLeave={()=> setOpen(false)}
      open ={open}
      direction="down"
      icon={
        <img
        className='speed-dial-icon'
        src={user.avatar[0].url? user.avatar[0].url : PFP}
        />
      }
      >  
      {options.map((item)=>(
              <SpeedDialAction
              key={item.name}
              icon={item.icon }
              tooltipTitle={item.name}
              onClick={item.func}
              />
      ))}
      </SpeedDial>
    </div>
  )
}

export default UserOptions