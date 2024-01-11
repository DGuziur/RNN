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

  sendInput(input: string): void {
    this.socket.emit('runPythonCode', input);
  }

  getOutput(): Observable<string> {
    return this.socket.fromEvent('output');
  }
}
