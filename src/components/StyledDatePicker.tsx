import React, { useState } from "react";
import { Dayjs } from "dayjs";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Shade, useTheme } from "@/context/ThemeContext";

interface StyledDatePickerProps {
  date: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
}

const StyledDatePicker: React.FC<StyledDatePickerProps> = ({
  date,
  onChange,
}) => {
  const { currentTheme } = useTheme();
  const selectedColor = currentTheme.getShade(Shade.High);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Entry Date"
          value={date}
          onChange={onChange}
          views={["month", "day"]} // Ensure the year view is included
          showDaysOutsideCurrentMonth
          slotProps={{
            textField: {
              sx: {
                "& .MuiInputLabel-root": {
                  color: "white", // Change label color here
                },
                "& .MuiInputBase-input": {
                  color: "white", // Change text color here
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Change border color here
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // Change border color on hover here
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Change border color when focused here
                  },
                },
                "& .MuiSvgIcon-root": {
                  // Change icon color here
                  color: "white",
                },
              },
            },
            popper: {
              sx: {
                "& .MuiPaper-root": {
                  backgroundColor: "#111", // Change calendar background color here
                  border: "1px solid white", // Change calendar border color here
                  color: "white", // Change calendar text color here
                  marginTop: "8px",
                  marginBottom: "8px",
                },
                "& .MuiPickersDay-root": {
                  color: "white", // Change day text color here
                },
                "& .MuiPickersDay-today": {
                  borderColor: "white", // Change today's date border color here
                },
                "& .MuiPickersDay-root.Mui-selected": {
                  backgroundColor: selectedColor, // Change selected day background color here
                  color: "white", // Ensure text color is readable
                },
                "& .MuiPickersDay-root.MuiPickersDay-dayOutsideMonth": {
                  color: "rgba(255, 255, 255, 0.5)", // Change days outside current month color here
                },
                "& .Mui-selected": {
                  backgroundColor: selectedColor, // Change selected month background color here
                  color: "white", // Ensure text color is readable
                },
                "& .MuiSvgIcon-root": {
                  color: "white", // Change icon color here
                },
                "& .MuiTypography-root": {
                  color: "white", // Change text color here
                },
              },
            },
            layout: {},
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default StyledDatePicker;
