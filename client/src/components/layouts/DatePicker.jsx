// import React from "react";
// import { DatePicker } from "@nextui-org/react";
// import { now, getLocalTimeZone } from "@internationalized/date";

// export default function Picker({setDate}) {
//   return (
//     <div className="w-full max-w-xl flex flex-row gap-4">
//       <DatePicker
//         label="Event Date"
//         variant="bordered"
//         hideTimeZone
//         showMonthAndYearPickers
//         defaultValue={now(getLocalTimeZone())}
//         onChange={(e) => {
//           console.log(e);
//           const offsetHours = Math.floor(e.offset / 3600000);
// const offsetMinutes = (e.offset % 3600000) / 60000;

// // Format the offset as a string in the format ±HH:MM
// const offsetString = `${offsetHours >= 0 ? '+' : '-'}${String(Math.abs(offsetHours)).padStart(2, '0')}:${String(Math.abs(offsetMinutes)).padStart(2, '0')}`;

// // Construct the ISO 8601 formatted date string
// const isoDateString = `${e.year}-${String(e.month).padStart(2, '0')}-${String(e.day).padStart(2, '0')}T${String(e.hour).padStart(2, '0')}:${String(e.minute).padStart(2, '0')}:${String(e.second).padStart(2, '0')}.${String(e.millisecond).padStart(3, '0')}${offsetString}`;

// console.log(isoDateString);  // "2024-05-29T14:24:43.342+01:00"

// // Create an ISODate object in MongoDB
// const mongoDate = new Date(isoDateString);

// setDate(isoDateString)

// console.log(mongoDate); 
//         }}
//       />
//     </div>
//   );
// }




import React from "react";
import { DatePicker } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";

export default function Picker({ setDate }) {
  return (
    <div className="w-full max-w-xl flex flex-row gap-4">
      <DatePicker
        label="Event Date"
        variant="bordered"
        hideTimeZone
        showMonthAndYearPickers
        defaultValue={now(getLocalTimeZone())}
        onChange={(e) => {
          const offsetHours = Math.floor(e.offset / 3600000);
          const offsetMinutes = (e.offset % 3600000) / 60000;

          // Format the offset as a string in the format ±HH:MM
          const offsetString = `${offsetHours >= 0 ? '+' : '-'}${String(
            Math.abs(offsetHours)
          ).padStart(2, '0')}:${String(Math.abs(offsetMinutes)).padStart(
            2,
            '0'
          )}`;

          // Construct the ISO 8601 formatted date string without seconds
          const isoDateString = `${e.year}-${String(e.month).padStart(
            2,
            '0'
          )}-${String(e.day).padStart(2, '0')}T${String(e.hour).padStart(
            2,
            '0'
          )}:${String(e.minute).padStart(2, '0')}${offsetString}`;

          // Create an ISODate object in MongoDB
          const mongoDate = new Date(isoDateString);

          setDate(isoDateString);

          console.log(mongoDate);
        }}
      />
    </div>
  );
}
