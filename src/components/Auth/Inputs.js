import React from "react";
import {Grid, TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";

const Input = ({name, label, type, autoFocus, handleShowPassword,  handleChange, half}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField name={name}
                       onChange={handleChange}
                       variant="outlined"
                       label={label}
                       type={type}
                       autoFocus={autoFocus}
                       InputProps={name === 'password' && {
                           endAdornment: (
                               <InputAdornment position="end">
                                   <IconButton onClick={handleShowPassword}>
                                       {type === "password" ? <Visibility/> : <VisibilityOff/> }
                                   </IconButton>
                               </InputAdornment>
                           )
                       }}
                       fullWidth
                       required
            />
        </Grid>
    )
};

export default Input;
