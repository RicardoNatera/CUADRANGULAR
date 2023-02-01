function NavBarDashboard({ selected, setSelected }) {
    const lista = ['Grupos','Usuarios','Maestros','Tarjetas']
    const handleClick = (key) =>{
        console.log(key)
        setSelected(key)
    }
  return (
    <nav  className='header nav'>
        <ul>
            {lista.map((e,key)=>(
                selected==key ? (<li key={key} className="selected">{e}</li>):(<li onClick={()=>handleClick(key)} key={key}>{e}</li>)
            ))}
        </ul>
    </nav >
  )
}

export default NavBarDashboard