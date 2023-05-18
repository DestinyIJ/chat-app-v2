import { TextField } from '@mui/material'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'



const FormTextField = ({ name, helperText, ...others }) => {
    const { control } = useFormContext()

    return (
        <Controller 
            name={name}
            control={control}
            render={
                ({ field, fieldState : { error }}) => (
                    <TextField 
                        {...field}
                        fullWidth
                        value={
                            typeof field.value === "number" && field.value === 0
                            ? ""
                            : field.value
                        }
                        error={!!error}
                        helperText={error ? error.message : helperText}
                        {...others}
                    />
                )
            }
        />
    )
}

FormTextField.propTypes = {
    name: PropTypes.string,
    helperText: PropTypes.node
}

export default FormTextField