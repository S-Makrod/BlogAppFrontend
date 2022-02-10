import { useState } from 'react'

export const useField = (type, name) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = (event) => {
        setValue('')
    }
  
    return {
        form: {
            type,
            name,
            value,
            onChange,
        },
        reset,
    }
}

export const useToggle = () => {
    const [show, setShow] = useState(false)

    const toggle = (event) => {
        setShow(!show)
    }

    return {
        show,
        toggle,
    }
}