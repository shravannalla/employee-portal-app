import { Grid, TextField } from "@mui/material";
import React from "react";

interface InputProps {
  placeholder: string;
  variant: "standard" | "outlined" | "filled";
  styles: React.CSSProperties | null;
  value?: string;
  type?: string;
  color?: "primary" | "secondary" | "info" | "success" | "warning";
  error?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({
  placeholder,
  variant,
  styles,
  value,
  type,
  color,
  handleChange,
  error,
}: InputProps) => {
  return (
    <Grid container flexDirection={"row"} maxWidth={"400px"}>
      <Grid item>
        <TextField
          variant={variant}
          value={value}
          onChange={handleChange}
          color={color}
          sx={styles}
          placeholder={placeholder}
          type={type}
          error={!!error}
          helperText={error}
        />
      </Grid>
    </Grid>
  );
};
