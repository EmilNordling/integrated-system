/// <reference types="../environment" />
import '../../src/_css_vars.css';
import '../../src/_reset.css';
import '../../src/_main.css';
import '../../src/_focus_ring.css';

export const Parent: FC = ({ children }) => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        overflowY: 'hidden',
      }}
    >
      {children}
    </div>
  );
};
