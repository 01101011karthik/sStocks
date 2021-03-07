import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    display: 'flex',
    width: '200px',
    minWidth: 120,
    marginLeft: '50px'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Dropdown(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  useEffect(() => {
    if(label === 'for'){
      setValue(props.value)
    }else {
      const sourceType = localStorage.getItem('source_type');
      setValue(sourceType)
    }
  },[])

  const {options, label, loading, errorMessage} = props;

  const handleChange = (e) => {
    setValue(e.target.value);
    props.onChange(e.target.value)
    if(label !== 'for'){
      localStorage.setItem('source_type', e.target.value)
    }
  };

  return (
    <div>
      {
        options && options.length && !loading && !errorMessage ?
        <FormControl className={classes.formControl}>
          <InputLabel>{label === 'for' ? 'Show For' : 'Source Type'}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            onChange={handleChange}
          >
            {
              options.map((option, index) => {
                return <MenuItem key={`${option}_${index}`} value={option}>{option}</MenuItem>
              })
            }
          </Select>
        </FormControl> 
        : 
        <FormControl className={classes.formControl} disabled>
          <InputLabel htmlFor="native-disabled-${label}">{label === 'for' ? 'Show For' : 'Source Type'}</InputLabel>
          <NativeSelect
            inputProps={{
              name: `${label}`,
              id: `native-disabled-${label}`,
            }}
          >
            <optgroup label="Author">
              <option value="hai">{value}</option>
            </optgroup>
          </NativeSelect>
        </FormControl>
      }
    </div>
  );
}