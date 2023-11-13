const SearchAndCreateBox = () => {
  return (
    <div className='flex gap-2 p-2 h-14 border'>
        <input 
          type='text' 
          name='user' 
          className='w-2/3 h-full bg-transparent border outline-none px-2 rounded-lg' 
          placeholder='Search for user or group'
        ></input>
        <button className='w-1/3 h-full bg-transparent border outline-none px-2 rounded-lg' >Create</button>
    </div>
  )
}

export default SearchAndCreateBox