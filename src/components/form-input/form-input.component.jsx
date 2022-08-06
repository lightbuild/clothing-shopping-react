import {Group,Input,FormInputLabel} from "./form-input.style"

const FormInput = ({label, ...otherProps}) => {
  return (
    <Group >
      <Input {...otherProps}/>
      {label && (
        <FormInputLabel shrink={otherProps.value.length ? 'shrink' : ''}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  )
}

export default FormInput;