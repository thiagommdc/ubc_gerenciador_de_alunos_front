import React, { useContext, useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, Typography, Box, IconButton, Pagination, Modal, Fade, DialogTitle, DialogContent, Dialog, DialogContentText, DialogActions, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import { IStudent } from '../Interface/IStudent';
import { allStudantsService, deleteStudentService, newStudentService, updateStudentService } from '../Service/service';
import { AuthContext } from '../Context/AuthContext';
import moment from 'moment';
import StudentForm from './StudentForm';

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [page, setPage] = useState(1);
  const studentsPerPage = 5;
  const { token, setLogged } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<IStudent>();
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<{open: boolean, id: number | null}>({open: false, id: null});
  const erroLoginTxt = 'Sua sessão está expirada, faça o login novamente';

  useEffect(() => {
    getStudants();
  }, []);

  const getStudants = async () => {
    try {
      if (token) setStudents(await allStudantsService(token));
    } catch (error) {
      alert('Houve um erro ao recuperar a lista de estudantes');
    }
  }

  const handlePageChange = (event: any, value: number) => {
    setPage(value);
  };

  const handleOpen = (student?: IStudent) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedStudent(undefined);
  };

  const handleLogout = () => {
    setLogged(false);
    setOpenConfirmLogout(false);
  };

  const handleStudentOperation = async (operation: (token: string, data: any) => Promise<void>, data: any) => {
    try {
      if (token) {
        await operation(token, data);
        getStudants();
        setModalOpen(false);
      } else {
        alert(erroLoginTxt);
        setLogged(false);
      }
    } catch {
      alert(erroLoginTxt);
      setLogged(false);
    }
  };
  
  const handleNewStudent = async (student: IStudent) => {
    handleStudentOperation(newStudentService, student);
    alert('Estudante adicionado com sucesso!');
  };
  
  const handleUpdateStudent = async (student: IStudent) => {
    handleStudentOperation(updateStudentService, student);
    alert('Estudante editado com sucesso!');
  };
  
  const handleDeleteStudent = async (id: number) => {
    handleStudentOperation(deleteStudentService, id);
    setOpenConfirmDelete({open: false, id: null});
    alert('Estudante excluido com sucesso!');
  };


  const paginatedStudents = students.slice((page - 1) * studentsPerPage, page * studentsPerPage);

  return (
    <Container sx={{ backgroundColor: '#A8DADC', padding: '20px', borderRadius: '10px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 2 }}>
          Lista de Estudantes
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton color="primary" aria-label="add" onClick={() => handleOpen()} sx={{ backgroundColor: 'white', borderRadius: '5px' }}>
            <AddIcon />
          </IconButton>
          <IconButton color="error" aria-label="logout" onClick={() => setOpenConfirmLogout(true)} sx={{ backgroundColor: 'white', borderRadius: '5px' }}>
            <LogoutIcon  />
          </IconButton>
        </Box>
      </Box>
      <List>
        {paginatedStudents.map((student, index) => (
          <ListItem key={student.id} sx={{ backgroundColor: index % 2 === 0 ? '#F0F0F0' : 'white', borderRadius: '5px', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <ListItemText 
                primary={`${student.nome} (${student.idade} anos) - ${student.serie}ª série (Média: ${student.notaMedia})`} 
                secondary={`Endereço: ${student.endereco}, Nome do Pai: ${student.nomePai}, Nome da Mãe: ${student.nomeMae}, Data de Nascimento: ${moment(student.dataNascimento).format('DD/MM/YYYY')}`}
                sx={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px', flexGrow: 1 }} 
              />
              <IconButton color="primary" aria-label="edit" onClick={() => handleOpen(student)}>
                <EditIcon />
              </IconButton>
              <IconButton color="secondary" aria-label="delete" onClick={() => setOpenConfirmDelete({open: true, id: student.id})}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      <Pagination 
        count={Math.ceil(students.length / studentsPerPage)} 
        page={page} 
        onChange={handlePageChange} 
        sx={{ mt: 2 }} 
      />
      <Modal
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={modalOpen}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, maxHeight: '85vh', overflowY: 'auto', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <StudentForm student={selectedStudent} onChange={selectedStudent ? handleUpdateStudent : handleNewStudent} />
          </Box>
        </Fade>
      </Modal>
      <Dialog
        open={openConfirmLogout}
        onClose={() => setOpenConfirmLogout(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmação de Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você tem certeza que deseja se deslogar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmLogout(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openConfirmDelete.open}
        onClose={() => setOpenConfirmDelete({open: false, id: null})}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmação de Exclusão"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você tem certeza que deseja excluir este estudante?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDelete({open: false, id: null})} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleDeleteStudent(openConfirmDelete.id!)} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentList;
