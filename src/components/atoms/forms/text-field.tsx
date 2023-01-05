import './form-item.scss';
import './text-field.scss';

type TextFieldProps = {
  id?: string,
  state?: 'valid' | 'invalid',
  label?: {
    labelText: string,
    isVisuallyHidden?: boolean,
  },
  inputType: 'email' | 'text',
  name?: string,
  autofocus?: boolean,
  value?: string,
  required?: boolean,
  disabled?: boolean,
  placeholder?: string,
  messageGroup?: {
    id: string,
  } & (
    {
      errorText: string,
    } |
    {
      infoText: string,
    }
  ),
};

export const TextField = ({
  id,
  state,
  label,
  inputType,
  name,
  autofocus,
  value,
  required,
  disabled,
  placeholder,
  messageGroup,
}: TextFieldProps) => (
  <div className={`form-item${state ? ` form-item--${state}` : ''}`}>
    {label ? (
      <div className="form-item__label_container">
        <label
          className={`form-item__label${label.isVisuallyHidden ? ' visuallyhidden' : ''}`}
          {...{ for: id || undefined }}
        >
        {label.labelText}
      </label>
      </div>
    ) : ''}

    <input
      type={inputType}
      className={`text-field text-field--${inputType}${state ? ` text-field--${state}` : ''}`}
      {...{
        id,
        name,
        autofocus: autofocus ? '' : undefined,
        required,
        disabled,
        placeholder,
      }}
      {...value ? { value } : {}}
    />

    {messageGroup ? (
      <div id={messageGroup.id}>

        {'infoText' in messageGroup ? (
          <div className="form-item__message form-item__message--info">{messageGroup.infoText}</div>
        ) : ''}

        {'errorText' in messageGroup ? (
          <div className="form-item__message form-item__message--invalid">{messageGroup.errorText}</div>
        ) : ''}

      </div>
    ) : ''}
  </div>
);
