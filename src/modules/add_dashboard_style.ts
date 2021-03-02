type Disposer = () => void;

let dependent = 0;

export function addDashboardStyle(): Disposer {
  document.documentElement.classList.add('dashBoard');
  dependent++;

  return () => {
    dependent--;

    if (dependent === 0) {
      document.documentElement.classList.remove('dashBoard');
    }
  };
}
