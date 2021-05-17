import { useState, useMemo } from 'react'
import tinycolor from 'tinycolor2'

import './styles.css'

export default function App() {
  const DEFAULT_INPUTS = { color1: 'white', color2: '#340652' }

  const [inputs, setInputs] = useState(DEFAULT_INPUTS)

  const handleInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value
    setInputs({ ...inputs, [target.name]: value })
  }

  const contrast = useMemo(
    () => tinycolor.readability(inputs.color1, inputs.color2),
    [inputs]
  )

  return (
    <form className="App">
      <h1>WCAG Color Contrast Finder</h1>
      <InputWithLabel
        id="color1"
        label="Color 1"
        value={inputs.color1}
        onChange={handleInputChange}
      />
      <InputWithLabel
        id="color2"
        label="Color 2"
        value={inputs.color2}
        onChange={handleInputChange}
      />
      <h2
        style={{
          color: inputs.color1,
          backgroundColor: inputs.color2,
          margin: 'auto',
          width: '11em',
          padding: '0.5em',
          marginTop: '1em',
          borderRadius: '0.25em'
        }}
      >
        Contrast: {contrast.toFixed(3)}
      </h2>
      <p>
        (Contrast of at least 3.0 is desired – 
        <a
          href="https://www.w3.org/TR/WCAG/#contrast-minimum"
          target="_blank"
          rel="noopener noreferrer"
        >
          read more
        </a>
        )
      </p>
    </form>
  )
}

const Fieldset = ({ children, id, label, description }) => {
  return (
    <div className="fieldset" title={description}>
      <label htmlFor={id + 'Field'}>{label}: </label>
      {children}
    </div>
  )
}

const ButtonIncrement = (props) => {
  return (
    <button type="button" style={{ marginLeft: '0.5em' }} {...props}></button>
  )
}

const InputWithLabel = ({
  id,
  label,
  placeholder,
  description,
  type = 'text',
  autoComplete = 'off',
  value,
  onChange,
  inProgress,
  required,
  disabled,
  className
}) => (
  <Fieldset id={id} label={label} description={description}>
    <input
      id={id + 'Field'}
      name={id}
      type={type}
      autoComplete={autoComplete}
      placeholder={placeholder || description || label}
      value={value || ''}
      onChange={onChange}
      required={required}
      disabled={disabled || inProgress}
      className={className}
      style={{ width: '5em' }}
    />
    <input
      type="color"
      name={id}
      value={tinycolor(value).toHexString()}
      onChange={onChange}
    />
    <ButtonIncrement
      onClick={(e) =>
        onChange({ target: { name: id, value: tinycolor(value).lighten(1) } })
      }
    >
      Lighten ↑
    </ButtonIncrement>
    <ButtonIncrement
      onClick={(e) =>
        onChange({ target: { name: id, value: tinycolor(value).brighten(1) } })
      }
    >
      Brighten ↑
    </ButtonIncrement>
    <ButtonIncrement
      onClick={(e) =>
        onChange({ target: { name: id, value: tinycolor(value).darken(1) } })
      }
    >
      Darken ↓
    </ButtonIncrement>
  </Fieldset>
)
