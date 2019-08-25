import {
  NavigationActions,
  NavigationDispatch,
  NavigationParams,
  NavigationNavigateAction,
  NavigationContainerComponent,
} from 'react-navigation';

let _dispatch: NavigationDispatch;

export function navigate(routeName: string, params?: NavigationParams) {
  const action = NavigationActions.navigate({
    routeName,
    params,
  });
  _dispatch(action);
}

export function dispatchNavigation(action: NavigationNavigateAction) {
  _dispatch(action);
}

export function registerAppContainer(container: NavigationContainerComponent) {
  _dispatch = container.dispatch;
}
