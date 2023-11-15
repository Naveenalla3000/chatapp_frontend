import SearchAndCreateBox from './SearchBox';
import ContactItem from './ContactItem';
import { useState } from 'react';

const SideBar = () => {
  return (
    <div className='w-1/4 min-h-screen'>
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
