import SearchAndCreateBox from './SearchAndCreateBox';
import ContactItem from './ContactItem';
import { useState } from 'react';

const SideBar = () => {
  const [selectContact,setSelectContact]= useState();
  return (
    <div className='w-1/4 min-h-screen'>
      <SearchAndCreateBox />
      <div className="holder p-1 flex flex-col gap-1 h-screen overflow-auto">
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
        <ContactItem/>
      </div>
    </div>
  );
};

export default SideBar;
