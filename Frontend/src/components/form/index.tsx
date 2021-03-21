import React, { MouseEventHandler } from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

interface Props {
  ctas: CtaProps[];
  inputs: InputType[];
}

const Form: React.FC<Props> = ({ ctas, inputs }) => {
  return (
    <Container>
      {inputs.map((input, i) => (
        <TextField
          key={i}
          error={!!input.error}
          helperText={input.error}
          label={input.label}
          margin="dense"
          onChange={input.onChange}
          type={input.type === "TEXT" ? "text" : "password"}
          placeholder={input.placeholder}
          value={input.value}
        />
      ))}

      <CTAsContainer>
        {ctas.map((c, i) => (
          <Button
            key={i}
            color={c.primary ? "primary" : "default"}
            onClick={c.onClick}
            style={{ margin: "2rem 0 1rem 1rem" }}
            variant="contained"
          >
            {c.label}
          </Button>
        ))}
      </CTAsContainer>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
  text-align: center;
`;

const CTAsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface InputProps {
  error?: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value: string;
}

interface InputTextProps extends InputProps {
  type: "TEXT";
}

interface InputPasswordProps extends InputProps {
  type: "PASSWORD";
}

type InputType = InputTextProps | InputPasswordProps;

interface CtaProps {
  primary?: boolean;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default Form;
