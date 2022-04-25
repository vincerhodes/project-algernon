
import { Container, Dropdown } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';

export const ParameterDropdown = ({ title, values, onSelect }) => (
    <DropdownButton 
      id="dropdown-basic-button" 
      title={title}
      onSelect={(eventKey) => onSelect(eventKey)}
    >
      {values.map((d) => (
        <Dropdown.Item
          key={d.value}
          eventKey={d.value}
        >
            {d.label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
)