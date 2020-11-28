import { HttpProgressState } from 'app/enums/HttpProgressState ';

export interface IHttpState {
    url: string;
    state: HttpProgressState;
}