import axios from "axios";
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getVoos, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const voo = ref.current;

      voo.cia_aerea.value = onEdit.cia_aerea;
      voo.horario.value = onEdit.horario;
      voo.valor.value = onEdit.valor;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const voo = ref.current;

    if (
      !voo.cia_aerea.value ||
      !voo.horario.value ||
      !voo.valor.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id,{
          cia_aerea: voo.cia_aerea.value,
          horario: voo.horario.value,
          valor: voo.valor.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          cia_aerea: voo.cia_aerea.value,
          horario: voo.horario.value,
          valor: voo.valor.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
    //Limpar formulário
    voo.cia_aerea.value = "";
    voo.horario.value = "";
    voo.valor.value = "";

    setOnEdit(null);
    getVoos();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit} >
      <InputArea>
        <Label>Cia Aérea</Label>
        <Input name="cia_aerea" />
      </InputArea>
      <InputArea>
        <Label>Horário</Label>
        <Input name="horario" type="time" />
      </InputArea>
      <InputArea>
        <Label>Valor</Label>
        <Input name="valor" />
      </InputArea>

      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
};

export default Form;