const SearchBox = () => {
  return (
    <div className='flex gap-2 p-2 h-14 border bg-[#f0f2f5]'>
        <input 
          type='text' 
          name='user' 
          className='w-full h-full bg-white border outline-none px-2 rounded-lg' 
          placeholder='Search for user or group'
        />
    </div>
  )
}

export default SearchBox;