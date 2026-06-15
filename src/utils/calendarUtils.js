export const generateCalendarLink = (type, data) => {
  const { doctor, department, date, time, patientName } = data;
  const title = `Doctor Appointment: ${doctor}`;
  const details = `Department: ${department}\nPatient: ${patientName}\nHospital: Sparsh Hospital, Bhubaneswar`;
  const location = "Plot No. 184, Sahid Nagar, Bhubaneswar, Odisha 751007";

  // Parse date and time
  if (!date || !time) return '#';
  
  const [year, month, day] = date.split('-');
  let [timeStr, modifier] = time.split(' ');
  let [hours, minutes] = timeStr.split(':');
  if (hours === '12') hours = '00';
  if (modifier === 'PM') hours = (parseInt(hours, 10) + 12).toString();
  
  const startStr = `${year}${month}${day}T${hours.padStart(2, '0')}${minutes}00`;
  
  let endMins = parseInt(minutes, 10) + 30;
  let endHours = parseInt(hours, 10);
  if (endMins >= 60) {
    endMins -= 60;
    endHours += 1;
  }
  const endStr = `${year}${month}${day}T${endHours.toString().padStart(2, '0')}${endMins.toString().padStart(2, '0')}00`;

  switch (type) {
    case 'google':
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    
    case 'outlook':
      return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${year}-${month}-${day}T${hours.padStart(2, '0')}:${minutes}:00&enddt=${year}-${month}-${day}T${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}:00&body=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    
    case 'apple':
      // Apple/iCal uses .ics files usually, but we can generate a basic data URI or link
      const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${startStr}\nDTEND:${endStr}\nSUMMARY:${title}\nDESCRIPTION:${details}\nLOCATION:${location}\nEND:VEVENT\nEND:VCALENDAR`;
      return `data:text/calendar;charset=utf8,${encodeURIComponent(icsData)}`;

    default:
      return '#';
  }
};
