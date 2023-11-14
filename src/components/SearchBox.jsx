const SearchBox = () => {
  return (
    <div className='flex gap-2 p-2 h-14 border'>
        <input 
          type='text' 
          name='user' 
          className='w-full h-full bg-transparent border outline-none px-2 rounded-lg' 
          placeholder='Search for user or group'
        />
    </div>
  )
}

export default SearchBox;