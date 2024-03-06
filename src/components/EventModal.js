import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import burgerIcon from "../assets/menu-burger.png";
import closeIcon from "../assets/circle-xmark.png";
import schedule from "../assets/schedule.png";
import dayjs from "dayjs";
import check from "../assets/check.svg";
import bookmark from "../assets/bookmark.png";
import segment from "../assets/description-alt.png";
import deleteIcon from '../assets/trash.png'
const labelClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? selectedEvent.selectedLabel : labelClasses[0]
  );
  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title: title,
      description: description,
      selectedLabel: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else dispatchCalEvent({ type: "push", payload: calendarEvent });
    setShowEventModal(false);
  }
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="text-gray-400">
            <img
              src={burgerIcon}
              alt=""
              style={{ width: "15px", height: "15px" }}
            />
          </span>
          <div className="flex">
            {selectedEvent && (
                <img
                onClick={()=>{
                    dispatchCalEvent({type: 'delete', payload:selectedEvent});
                    setShowEventModal(false);
                    
                }}
                className="mr-2"
                src={deleteIcon}
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
            )}
            <button onClick={() => setShowEventModal(false)}>
              <img
                src={closeIcon}
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <img
              src={schedule}
              alt=""
              style={{ width: "20px", height: "20px" }}
            />
            <p>
              {daySelected
                ? daySelected.format("dddd, MMMM DD")
                : dayjs().format("dddd, MMMM DD")}
            </p>
            <img
              src={segment}
              alt=""
              style={{ width: "20px", height: "20px" }}
            />
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <img
              src={bookmark}
              alt=""
              style={{ width: "20px", height: "20px" }}
            />
            <div className="flex gap-x-2">
              {labelClasses.map((lblClasses, i) => (
                <span
                  key={i}
                  className={`bg-${lblClasses}-500 w-6 rounded-full h-6 flex items-center justify-center cursor-pointer`}
                  onClick={() => {
                    setSelectedLabel(lblClasses);
                  }}
                >
                  {selectedLabel === lblClasses && (
                    <img
                      src={check}
                      alt=""
                      style={{ width: "12px", height: "12px" }}
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
            onClick={handleSubmit}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
