import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodeExample } from './code-example.component';
import { PythonService } from '../services/python.service';
import { of } from 'rxjs';

describe('CodeExampleComponent', () => {
  let component: CodeExample;
  let fixture: ComponentFixture<CodeExample>;
  let pythonServiceSpy: jasmine.SpyObj<PythonService>;

  beforeEach(() => {
    pythonServiceSpy = jasmine.createSpyObj('PythonService', {
      connect: null,
      runCode: of('mock'),
      getOutput: of('mock'),
      disconnect: null,
    });

    TestBed.configureTestingModule({
      imports: [CodeExample],
      providers: [{ provide: PythonService, useValue: pythonServiceSpy }],
    });

    fixture = TestBed.createComponent(CodeExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('terminal should init as false', () => {
    expect(component.isTerminalOpen).toBe(false);
  });

  it('subscribe should init as null', () => {
    expect(component.subscribtion).toBe(null);
  });

  it('runScript works', () => {
    component.runScript('test');
    expect(component.isTerminalOpen).toBe(true);
    expect(component.subscribtion).not.toBeNull;

    component.stopScript;
    expect(component.isTerminalOpen).toBeFalsy;
    expect(component.subscribtion).toBeNull;
  });
});
