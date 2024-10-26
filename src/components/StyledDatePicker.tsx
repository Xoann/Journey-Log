import React, { useState, useEffect } from "react";
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
  const [selectedColor, setSelectedColor] = useState<string>(
    currentTheme?.getShade(Shade.High)
  );

  useEffect(() => {
    setSelectedColor(currentTheme?.getShade(Shade.High));
  }, [currentTheme]);

  const popperSx = {
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
      backgroundColor: `${selectedColor} !important`, // Change selected day background color here
      color: "white", // Ensure text color is readable
    },
    "& .MuiPickersMonth-monthButton.Mui-selected": {
      backgroundColor: `${selectedColor} !important`,
    },
    "& .MuiPickersMonth-monthButton:hover": {
      border: `1px solid ${selectedColor} !important`,
    },
    "& .MuiPickersDay-root.MuiPickersDay-dayOutsideMonth": {
      // Change days outside current month color here
      color: "gray",
    },
    "& .MuiPickersDay-root:hover": {
      border: `1px solid ${selectedColor} !important`, // Change selected day border color on hover here
      color: "white", // Ensure text color is readable
    },
    "& .MuiSvgIcon-root": {
      color: "white", // Change icon color here
    },
    "& .MuiTypography-root": {
      color: "white", // Change text color here
    },
  };

  const textFieldSx = {
    "& .MuiInputLabel-root": {
      color: "white", // Change label color here
      "&.Mui-focused": {
        color: `${selectedColor} !important`, // Change label color when focused here
      },
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
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="Entry Date"
        value={date}
        onChange={onChange}
        views={["month", "day"]} // Ensure the year view is included
        showDaysOutsideCurrentMonth
        slotProps={{
          textField: {
            sx: textFieldSx,
            size: "small",
          },
          popper: {
            sx: popperSx,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default StyledDatePicker;
