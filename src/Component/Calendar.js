import React, { useState } from "react";
import "../Component/Calendar.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import {
  format,
  addDays,
  getWeek,
  addWeeks,
  subWeeks,
  subDays,
  isWeekend,
} from "date-fns";
// import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "20px 20px 0px 20px",
      width: theme.spacing(16),
      height: "auto",
    },
  },
  paper: {
    width: "100%",
  },
  calender: {
    float: "right",
    margin: "20px 10px",
  },
  heading: {
    marginLeft: "20px",
  },
  layout: {
    margin: "40px 20px",
  },
  icon: {
    border: "1px solid #ADD8E6",
    padding: "5px",
    color: "red",
  },
  Dateicon: {
    display: "inline-block",
    border: "1px solid #ADD8E6",
    padding: "5px",
    color: "#0000FF",
  },
  view: {
    padding: "5px",
    width: "120px",
  },
  week: {
    color: "red",
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: "18px",
  },
  
  day: {
    color: "#000000c9",
    fontSize: "12px",
  },
  main: {
    background: "#8080802b",
    padding: "0px 20px",
  },
}));

const timeData = [
  {
    first: '8:00AM',
    second: "2:00PM",
    third: "7:00PM",
  },
  {
    first: '8:30AM',
    second: "2:30PM",
    third: "7:30PM",
  },
  {
    first: "9:00AM",
    second: "3:00PM",
    third: "8:00PM",
  },
  {
    first: "9:30AM",
    second: "3:30PM",
    third: "8:30PM",
  },
  {
    first: "10:00AM",
    second: "4:00PM",
    third: "9:00PM",
  },
  {
    first: "10:30AM",
    second: "4:30PM",
    third: "9:30PM",
  },
  {
    first: "11:00AM",
    second: "5:00PM",
    third: "10:00PM",
  },
  {
    first: "11:30AM",
    second: "5:30PM",
    third: "10:30PM",
  },
  {
    first: "12:00PM",

    second: "6:00PM",
    third: "11:00PM",
  },
  {
    first: "12:30PM",

    second: "6:30PM",
    third: "11:30PM",
  },
];

const Calendar = () => {
  const [timeZone, setTimeZone] = useState('UTC'); // initial time zone


  const classes = useStyles();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // eslint-disable-next-line
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [startDate, setStartDate] = useState(new Date());




  const handleTimezoneChange = (event) => {
    setTimeZone(event.target.value);
  };

  const getTimeInTimeZone = (time) => {
    if (timeZone === 'UTC') {
      return time;
    } else if (timeZone === 'IST') {
      const timeFormat = /^(\d{1,2}):(\d{2})([AP]M)$/; // regular expression to match time format
      const match = time.match(timeFormat);
      if (!match) {
        return 'Invalid Time';
      }
      const hours = parseInt(match[1], 10) + (match[3] === 'PM' ? 12 : 0); // convert hours to 24-hour format
      const minutes = parseInt(match[2], 10);
      const utcTime = new Date();
      utcTime.setUTCHours(hours);
      utcTime.setUTCMinutes(minutes);
      if (isNaN(utcTime.getTime())) {
        return 'Invalid Time';
      }
      return utcTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric' });
    }
  };

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const showDate = new Date();

  const dt =
    month[showDate.getMonth("MMM")] +
    ", " +
    showDate.getDate() +
    " " +
    showDate.getFullYear();

  

  const changeWeekHandle = (btnType) => {
    if (btnType === "prev") {
      setStartDate((date) => {
        return subDays(date, 7);
      });
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      setStartDate((date) => {
        return addDays(date, 7);
      });
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

 

  const renderCells = () => {
    // const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d ";
    const dateFormatMonth = " MM ";
    const dateFormatWeek = "EEE";
    // const filteredDays = endDate.filter(day => !isWeekend(day));
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    let formattedDateMonth = "";
    let formattedDateWeek = "";
    // while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      if (!isWeekend(day)) {
        console.log(day);
        formattedDate = format(day, dateFormat);
        formattedDateMonth = format(day, dateFormatMonth);
        formattedDateWeek = format(day, dateFormatWeek);
        days.push(
          <div style={{ display: "flex" }}>
            <table>
              <div
                key={day}
                className={classes.view}
                style={{
                  display: "flex",
                  border: "1px",
                  borderTopWidth: "2px",
                  borderBottomWidth: "0px",
                }}
              >
                <div className={classes.week}>
                  {formattedDateWeek}

                  <div className={classes.day}>
                    {formattedDate}/<span>{formattedDateMonth}</span>
                  </div>
                </div>
              </div>
            </table>

            <div className="second">
              {timeData.map((item,index) => (
                <div key={index}>
                  <div style={{ display: "flex" }}>

                    <input type="checkbox" className="check-input"></input>

                    <span style={{ margin: "auto" }}>{getTimeInTimeZone(item.first)}</span>
                  </div>

                  <div style={{ display: "flex" }}>
                    <input type="checkbox" className="check-input"></input>

                    <span style={{ margin: "auto" }}>{getTimeInTimeZone(item.second)}</span>
                  </div>

                  <div style={{ display: "flex" }}>
                    <input type="checkbox" className="check-input"></input>

                    <span style={{ margin: "auto" }}>{getTimeInTimeZone(item.third)}</span>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        );
      }
      day = addDays(day, 1);
    }

    rows.pop();
    rows.push(<div key={day}>{days}</div>);
    days = [];
    // }

    return (
      <div className={classes.main}>
        <Grid container>
          <Grid item lg={10}>
            <div>{rows}</div>
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <div className="main">
      <div className="header">
        
        <div className="previous" onClick={() => changeWeekHandle("prev")}>Previous Week</div>
        <span>{dt}</span>
                    
        <span className="next" onClick={() => changeWeekHandle("next")}>Next Week</span>
      </div>
      <div className="timezone">Timezone:</div>
      

      <select value={timeZone} onChange={handleTimezoneChange} className="time-dropdown">
        <option value="UTC">UTC - Universal Time Coordinated </option>
        <option value="IST">IST - Indian Standard Time</option>
      </select>

      <div className={classes.root}>
        <Paper className={classes.paper} variant="outlined" elevation={0}>
          <Grid container spacing={2}>
            <Grid item lg={8}>
              
            </Grid>
          </Grid>
          <div className={classes.layout}>{renderCells()}</div>
        </Paper>
      </div>
    </div>
  );
};

export default Calendar;
