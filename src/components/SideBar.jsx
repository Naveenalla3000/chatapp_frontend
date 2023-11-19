import SearchAndCreateBox from './SearchBox';
import ContactItem from './ContactItem';


const SideBar = () => {
  return (
    <div className='w-1/4'>
      <SearchAndCreateBox />
      <div className="holder p-1 flex flex-col gap-1 h-screen overflow-auto bg-[#f0f2f5]">
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
        <ContactItem/>
   
      </div>
    </div>
  );
};

export default SideBar;
