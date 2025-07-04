import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { formatDate } from 'utils/dateUtils.js';
import { isSameDay } from 'date-fns';
import Modal from './Modal.js';

const HistorySection = ({
  historyView,
  setHistoryView,
  sortedHistory,
  today,
  tileContent,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateClick = (date) => {
    const entry = sortedHistory.find(entry => isSameDay(entry.date, date));
    if (entry) {
      setSelectedDate(entry);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <section className="p-8 bg-white rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">히스토리</h2>
        <div className="flex space-x-2">
          {historyView === 'list' ? (
            <button
              onClick={() => setHistoryView('calendar')}
              className="cursor-pointer text-sm font-bold px-4 py-2 rounded transition bg-gray-100 hover:scale-105"
            >
              달력 보기
            </button>
          ) : (
            <button
              onClick={() => setHistoryView('list')}
              className="cursor-pointer text-sm font-bold px-4 py-2 rounded transition bg-gray-100 hover:scale-105"
            >
              리스트 보기
            </button>
          )}
        </div>
      </div>
      {/* 뷰 전환 */}
      {historyView === 'list' ? (
        <div>
          <p className="text-sm text-gray-500">최근 7일</p>
          <table className="w-full bg-white rounded shadow text-gray-700 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">날짜</th>
                <th className="py-2 px-4 text-left">푼 문제</th>
                <th className="py-2 px-4 text-left">맞춘 문제</th>
                <th className="py-2 px-4 text-left">정답률</th>
              </tr>
            </thead>
            <tbody>
              {sortedHistory.slice(0, 7).map((entry, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-2 px-4">{formatDate(entry.date)}</td>
                  <td className="py-2 px-4">{entry.solvedCount}</td>
                  <td className="py-2 px-4">{entry.correctCount}</td>
                  <td className="py-2 px-4">{entry.correctRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 cursor-pointer flex justify-center items-center relative">
          <Calendar
            tileContent={tileContent}
            onClickDay={handleDateClick}
          />
          {isModalOpen && selectedDate && (
            <Modal onClose={closeModal}>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-2">⭐️{formatDate(selectedDate.date)}⭐️</h3>
                <p>푼 문제 수: {selectedDate.solvedCount}</p>
                <p>맞춘 문제 수: {selectedDate.correctCount}</p>
                <p>정답률: {selectedDate.correctRate}%</p>
                <button
                  onClick={closeModal}
                  className="cursor-pointer mt-4 bg-blue-500 text-white px-4 py-2 rounded mx-auto block"
                >
                  닫기
                </button>
              </div>
            </Modal>
          )}
        </div>
      )}
    </section>
  );
};

export default HistorySection;
