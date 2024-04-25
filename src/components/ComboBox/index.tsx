import { Dropdown } from "react-native-element-dropdown"
import { useCallback, useState } from "react"

import { Icon } from "./styles"

interface ComboBoxProps {
  data: { label: any; value: any }[]
  iconName: string
  value: any
  selectionChange: (value: number) => void
  dropDownStyle?: {}
}

const ComboBox: React.FC<ComboBoxProps> = ({
  data,
  iconName,
  value,
  selectionChange,
  dropDownStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  return (
    <Dropdown
      style={[
        dropDownStyle,
        { borderColor: isFocused ? "#3fd5c8" : "#4169E1" },
      ]}
      data={data}
      value={value}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      labelField="label"
      valueField="value"
      onChange={(item) => {
        selectionChange(item.value)
        setIsFilled(true)
      }}
      renderLeftIcon={() => (
        <Icon
          name={iconName}
          size={22}
          color={isFocused || isFilled || value ? "#3fd5c8" : "#4169E1"}
        />
      )}
    />
  )
}

export default ComboBox
