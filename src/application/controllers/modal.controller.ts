import { Presentation } from '@modules/presentation/presentation';
import { Singleton } from '@modules/rdi/attributes';

interface PresentationModel {
  display: JSX.Element | null;
}

@Singleton()
export class FormBuilderController {
  public readonly presentation = Presentation.create<PresentationModel>({
    display: null,
  });

  constructor() {
    // Empty
  }

  public attach(): void {}
}
