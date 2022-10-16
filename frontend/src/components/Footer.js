import { useLocation } from 'react-router-dom';

function Footer() {

    const path = useLocation();

    if(path.pathname !== '/') {
        return null;
    } else {
        return (
            <footer className="footer">
                <p className="footer__copyright">© {new Date().getFullYear()} Mesto Russia</p>
            </footer>
        );
    }
}

export default Footer;