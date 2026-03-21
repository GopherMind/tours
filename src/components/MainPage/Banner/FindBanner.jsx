import { useState } from 'react';
import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { MapPinIcon, ClockIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import countrydb from './countrydata';
import CounterNight from './counter/CounterNight';
import CounterGuest from './counter/CounterGuest';
import useFindStore from '../../../stores/useFindStore';
import { message } from 'antd';
import { useNavigate } from 'react-router';

dayjs.extend(customParseFormat);

const FindBanner = () => {
  const navigate = useNavigate();
  const { nights, guests, country, setCountry } = useFindStore();
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = () => {
    const showMessageValidation = (type, text) => {
      messageApi.open({ type, content: text });
    };
    if (!nights?.[0] || !nights?.[1] || !country || !guests) {
      showMessageValidation('warning', 'Please fill in all fields');
    } else {
      navigate('/tours');
    }
  };

  return (
    <>
      {contextHolder}
      <div className="w-full lg:w-3/4 bg-gradient-to-r from-white to-blue-50 rounded-3xl shadow-xl p-8 flex flex-col transition-all duration-500">
        
        <div className="w-full">
          <h1 className="text-4xl font-bold text-[#008EC4] mb-1">text</h1>
          <h2 className="text-xl font-medium text-black opacity-80">view world with mirage</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full border border-[#D9D9D9] rounded-3xl mt-6 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          
          {/* Country */}
          <div className="flex gap-3 items-center w-full p-2 rounded-xl hover:bg-blue-50 transition-colors duration-300">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-blue-100 rounded-full">
              <MapPinIcon className="w-6 h-6 text-[#008EC4]" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p className="text-sm font-medium text-gray-700">Country</p>
              <Select
                options={countrydb}
                placeholder="Select country"
                className="w-full rounded-xl"
                value={country || undefined}
                onChange={(value) => setCountry(value)}
              />
            </div>
          </div>

          {/* Nights */}
          <div className="flex gap-3 items-center w-full p-2 rounded-xl hover:bg-blue-50 transition-colors duration-300">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-blue-100 rounded-full">
              <ClockIcon className="w-6 h-6 text-[#008EC4]" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p className="text-sm font-medium text-gray-700">Nights</p>
              <CounterNight />
            </div>
          </div>

          {/* Guests */}
          <div className="flex gap-3 items-center w-full p-2 rounded-xl hover:bg-blue-50 transition-colors duration-300">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-blue-100 rounded-full">
              <UserIcon className="w-6 h-6 text-[#008EC4]" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p className="text-sm font-medium text-gray-700">People</p>
              <CounterGuest />
            </div>
          </div>
        </div>

        <div
          className="mt-4 rounded-2xl flex self-center bg-amber-400 h-16 w-full lg:w-1/3 py-4 px-8 text-center text-2xl gap-3 cursor-pointer text-white font-semibold justify-center items-center hover:bg-amber-500 transition-all duration-300 transform hover:scale-105"
          onClick={showMessage}
        >
          <div className="border-r border-[#cfcbcb] px-4 hover:text-3xl transition-all duration-300">find</div>
          <MagnifyingGlassIcon className="text-white w-12 transform transition-all duration-300 hover:-translate-y-1" />
        </div>
      </div>
    </>
  );
};

export default FindBanner;