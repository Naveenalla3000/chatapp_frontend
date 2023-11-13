import { useState } from 'react';
import { GrContactInfo } from 'react-icons/gr';

const ContactItem = () => {
  const [visibleDots, setVisibleDots] = useState(false);

  return (
    <div
      className={`flex border px-4 justify-between items-center rounded-2xl cursor-pointer`}
      onMouseEnter={() => setVisibleDots(true)}
      onMouseLeave={() => setVisibleDots(false)}
    >
      <div className="flex items-center">
        {visibleDots && <GrContactInfo size={30} className='text-blue-500 mr-4' />}
        <img
          src={'/avatar.jpg'}
          alt='icon'
          className='w-10 h-10 rounded-full'
        />
        <div className="flex flex-col ml-8">
          <p>naveen</p>
          <p>last message</p>
        </div>
      </div>
      <div className="">
        <span className='text-green-900'>online</span>
      </div>
    </div>
  );
};

export default ContactItem;
