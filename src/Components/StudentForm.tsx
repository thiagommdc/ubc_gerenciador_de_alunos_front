import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { IStudent } from '../Interface/IStudent';

interface StudentFormProps {
  student?: IStudent | undefined;
  onChange: any
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onChange }) => {
  const [formData, setFormData] = useState({
    id: student?.id || 0,
    nome: student?.nome || '',
    idade: student?.idade || 0,
    serie: student?.serie || 0,
    notaMedia: student?.notaMedia || 0,
    endereco: student?.endereco || '',
    nomePai: student?.nomePai || '',
    nomeMae: student?.nomeMae || '',
    dataNascimento: student?.dataNascimento ? new Date(student.dataNascimento).toISOString().split('T')[0] : ''
  });
  
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let temp: any = {};
    temp.nome = formData.nome ? "" : "Este campo é obrigatório.";
    temp.idade = formData.idade > 0 ? "" : "Idade deve ser um número positivo.";
    temp.serie = formData.serie > 0 ? "" : "Série deve ser um número positivo.";
    temp.notaMedia = formData.notaMedia > 0 ? "" : "Nota Média deve ser um número positivo.";
    temp.endereco = formData.endereco ? "" : "Este campo é obrigatório.";
    temp.nomePai = formData.nomePai ? "" : "Este campo é obrigatório.";
    temp.nomeMae = formData.nomeMae ? "" : "Este campo é obrigatório.";
    temp.dataNascimento = formData.dataNascimento ? "" : "Este campo é obrigatório.";
    setErrors({
      ...temp
    });
    return Object.values(temp).every(x => x === "");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const newFormData = { ...prevData, [name]: value };
      if (name === 'dataNascimento') {
        newFormData.idade = calculateAge(value);
      }
      return newFormData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onChange(formData);
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          {student ? 'Editar Estudante' : 'Novo Estudante'}
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nome"
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            error={!!errors.nome}
            helperText={errors.nome}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="dataNascimento"
            label="Data de Nascimento"
            name="dataNascimento"
            type="date"
            InputLabelProps={{ shrink: true, required: true }}
            value={formData.dataNascimento}
            onChange={handleChange}
            error={!!errors.dataNascimento}
            helperText={errors.dataNascimento}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="idade"
            label="Idade"
            name="idade"
            type="number"
            value={formData.idade}
            onChange={handleChange}
            error={!!errors.idade}
            helperText={errors.idade}
            disabled
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="serie"
            label="Série"
            name="serie"
            type="number"
            value={formData.serie}
            onChange={handleChange}
            error={!!errors.serie}
            helperText={errors.serie}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="notaMedia"
            label="Nota Média"
            name="notaMedia"
            type="number"
            value={formData.notaMedia}
            onChange={handleChange}
            error={!!errors.notaMedia}
            helperText={errors.notaMedia}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="endereco"
            label="Endereço"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            error={!!errors.endereco}
            helperText={errors.endereco}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nomePai"
            label="Nome do Pai"
            name="nomePai"
            value={formData.nomePai}
            onChange={handleChange}
            error={!!errors.nomePai}
            helperText={errors.nomePai}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nomeMae"
            label="Nome da Mãe"
            name="nomeMae"
            value={formData.nomeMae}
            onChange={handleChange}
            error={!!errors.nomeMae}
            helperText={errors.nomeMae}
          />          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            {student ? 'Atualizar' : 'Adicionar'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default StudentForm;
