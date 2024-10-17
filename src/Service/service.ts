import { ILogin } from '../Interface/ILogin';
import { IStudent } from '../Interface/IStudent';
import { IToken } from '../Interface/IToken';
import { requestAxios } from './api';

export async function loginService(login: ILogin): Promise<IToken | any> {
    try {
        const retorno = await requestAxios<IToken>('POST', 'login', 'auth', login);
        return retorno;
    } catch (error: any) {
        console.error('Erro ao realizar login:', error);
        throw error;
    }
}

export async function allStudantsService(token:string): Promise<IStudent[] | any> {
    try {
        const retorno = await requestAxios<IToken>('GET', '', 'students', null, token);
        return retorno;
    } catch (error: any) {
        console.error('Erro ao recuperar lista de estudantes:', error);
        throw error;
    }
}

export async function newStudentService(token:string, student: IStudent): Promise<any> {
    try {
        const retorno = await requestAxios<IToken>('POST', '', 'students', student, token);
        return retorno;
    } catch (error: any) {
        console.error('Erro ao adicionar novo estudante:', error);
        throw error;
    }
}

export async function updateStudentService(token:string, student: IStudent): Promise<any> {
    try {
        const retorno = await requestAxios<IToken>('PUT', student.id.toString(), 'students', student, token);
        return retorno;
    } catch (error: any) {
        console.error('Erro ao editar o estudante:', error);
        throw error;
    }
}

export async function deleteStudentService(token:string, studentId: number): Promise<any> {
    try {
        const retorno = await requestAxios<IToken>('DELETE', studentId.toString(), 'students', null, token);
        return retorno;
    } catch (error: any) {
        console.error('Erro ao tentar excluir estudante:', error);
        throw error;
    }
}

