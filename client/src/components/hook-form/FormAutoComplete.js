import { Autocomplete, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'



const FormAutoComplete = ({ name, label, helperText, ...others }) => {
    const { control, setValue } = useFormContext()

    const onChangeValue = (event, newValue) => {
        setValue(name, newValue, {
            shouldValidate: true
        })
    }

    return (
        <Controller 
            name={name}
            control={control}
            render={
                ({ field, fieldState : { error }}) => (
                    <Autocomplete
                        {...field}
                        fullWidth
                        value={
                            typeof field.value === "number" && field.value === 0
                            ? ""
                            : field.value
                        }
                        onChange={onChangeValue}
                        error={!!error}
                       
                        {...others}
                        renderInput={(params) => (
                            <TextField 
                                label={label}  
                                helperText={error ? error.message : helperText} 
                                error={!!error} 
                                {...params}
                                />
                        )}
                    />
                )
            }
        />
    )
}

FormAutoComplete.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.node
}

export default FormAutoComplete