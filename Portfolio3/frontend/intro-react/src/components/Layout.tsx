import { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
    <>
        <header>Prosjektoversikt</header>
        <main>{children}</main>
    </>
);

export default Layout;