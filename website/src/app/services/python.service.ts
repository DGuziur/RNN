import { Injectable, inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PythonService {

  constructor(private socket: Socket) {}

  connect(): void {
    this.socket.connect();
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  runCode(code: string): void {
    this.socket.emit('runPythonCode', code);
  }

  sendInput(input: string): void {
    this.socket.emit('input', input);
  }

  getOutput(): Observable<string> {
    return this.socket.fromEvent('output');
  }
}
