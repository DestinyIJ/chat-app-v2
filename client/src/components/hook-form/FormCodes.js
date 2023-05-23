import { useRef } from "react"
import { useFormContext, Controller } from 'react-hook-form'
import { TextField, Stack } from '@mui/material'

const FormCodes = ({ keyName = "", inputs = [], ...others }) => {
    const codesRef = useRef(null)

    const { control } = useFormContext()

    const handleChangeWithNextField = (event, handleChange) => {
        const { maxLength, value, name } = event.target

        const fieldIndex = name.replace(keyName, "")
        let fieldIntIndex = Number(fieldIndex)

        if(event.key === "Backspace") {
            fieldIntIndex -= 1
        } else {
            fieldIntIndex += 1
        }

        const nextField = document.querySelector(`input[name=${keyName}${fieldIntIndex}]`)

        if(value.length > maxLength) {
            event.target.value = value[0]
        }

        if(fieldIntIndex > 0 && fieldIntIndex <= inputs.length) {
            nextField.focus()
        }

        handleChange(event)
    }

    return (
        <Stack direction="row" spacing={2} justifyContent="center" ref={codesRef}>
            {
                inputs.map((name, index) => (
                    <Controller
                        key={index}
                        name={`${name}`}
                        control={control}
                        render={
                            ({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    autoFocus={index === 0}
                                    placeholder={"-"}
                                    error={!!error}
                                    onChange={(event) => {
                                        handleChangeWithNextField(event, field.onChange)
                                    }}
                                    onFocus={(event) => event.currentTarget.select()}
                                    InputProps={{
                                        sx: {
                                            width: { xs: 36, sm: 56 },
                                            height: { xs: 36, sm: 56 },
                                            '& input': { p: 0, textAlign: "center" }
                                        }
                                    }}
                                    inputProps={{
                                        maxLength: 1,
                                        type: "string"
                                    }}
                                    {...others}
                                />
                            )
                        }
                    />
                ))
            }
        </Stack>
    )
}

export default FormCodes