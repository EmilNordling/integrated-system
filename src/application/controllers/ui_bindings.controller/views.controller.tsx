import { SpacesApiService } from '@api/spaces_api.service';
import { Presentation } from '@modules/presentation/mod';
import { Singleton } from '@modules/rdi/attributes';
import { __sprinkelMetaData } from '@modules/rdi/meta';
import { ApplicationService, BootCycleEvents } from '@services/application.service';
import { DiagnosticsService } from '@services/diagnostics.service/mod';
import { HomeView } from '@views/home_view/mod';
import type { SpacesApiModel } from '@api/models/spaces_api_model';

export interface ViewStackModel {
  id: string;
  title: string;
  routeTo: string;
  icon: string | null;
  listable: boolean;
  jsxComponent: () => JSX.Element;
}

interface PresentationModel {
  routes: ViewStackModel[];
}

@Singleton()
export class ViewsController {
  private static readonly TRACE_ORIGIN = 'ViewsController';
  private static readonly INVARIABLE_VIEWS: Readonly<ViewStackModel[]> = [
    {
      id: 'static_home',
      icon: 'eva_wifi_off',
      routeTo: '',
      title: 'Home',
      listable: true,
      jsxComponent: HomeView,
    },
    {
      id: 'static_analytic',
      icon: 'eva_trending',
      routeTo: 'analytic',
      title: 'analytic',
      listable: true,
      jsxComponent: function AnalyticRoute() {
        return <div></div>;
      },
    },
  ];

  public readonly routes = Presentation.createConcurrent<PresentationModel>();
  private readonly exhaustibleAfterCycle: Readonly<ViewStackModel>[] = [];

  constructor(
    private readonly spacesApi: SpacesApiService,
    private readonly diagnostics: DiagnosticsService,
    private readonly application: ApplicationService,
  ) {
    this.application.interceptBootCycle(BootCycleEvents.Boot_After, this.queueAfterBootCycle.bind(this));
  }

  public addRoute(view: ViewStackModel): void {
    if (!this.routes.isMutable) {
      this.exhaustibleAfterCycle.push(view);

      return;
    }

    this.routes.unsafeWrite((data) => {
      const old = data.extract();
      old.routes.push(view);

      return {
        routes: old.routes,
      };
    });
  }

  private async queueAfterBootCycle(): Promise<void> {
    this.diagnostics.traceSource.info('Views Boot_After', ViewsController.TRACE_ORIGIN);
    // add routes from loaded extensions

    this.routes.suspend(this.spacesApi.getAll(), (response) => {
      const routes: ViewStackModel[] = [...ViewsController.INVARIABLE_VIEWS];

      const apiRoutes = this.mapOverSpacesApiResponse(response);
      routes.push(...apiRoutes);

      while (this.exhaustibleAfterCycle.length) {
        const route = this.exhaustibleAfterCycle.pop();
        if (route == null) break;

        routes.push(route);
      }

      return {
        routes,
      };
    });
  }

  private mapOverSpacesApiResponse({ spaces }: SpacesApiModel): ViewStackModel[] {
    const routes: ViewStackModel[] = [];

    for (const space of spaces) {
      routes.push({
        id: space.id,
        icon: space.icon,
        routeTo: space.id,
        title: space.name,
        listable: space.listable,
        jsxComponent: function AnalyticRoute() {
          return <div></div>;
        },
      });
    }

    return routes;
  }
}
// A vite plugin will be added later
__sprinkelMetaData(ViewsController, [SpacesApiService, DiagnosticsService, ApplicationService]);
