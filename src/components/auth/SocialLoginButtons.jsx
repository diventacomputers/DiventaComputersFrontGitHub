import Button from '../ui/Button';
import GoogleIcon from '../../assets/images/google-icon.svg';
import AppleIcon from '../../assets/images/apple-icon.svg';

export default function SocialLoginButtons() {
  return (
    <div className="social-login-buttons">
      <Button className="social-button google-button">
        <img src={GoogleIcon} alt="Google" />
        Iniciar Sesión con Google
      </Button>
      <Button className="social-button apple-button">
        <img src={AppleIcon} alt="Apple" />
        Iniciar Sesión con Apple
      </Button>
    </div>
  );
}