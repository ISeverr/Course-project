import styled from 'styled-components';
import { InputGroup } from 'react-bootstrap'

export const INPUTGROUP = styled(InputGroup)`
.error {
    border: 2px solid #FF6565;
  }

  .error-message {
    margin-top: 2.5em;
    color: #FF6565;
    padding: .5em .2em;
    height: 1em;
    position: absolute;
    font-size: .8em;
  }
`;