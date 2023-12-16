import Landing from '../views/pages/landing';
import SignIn from '../views/pages/signIn';
import SignUp from '../views/pages/signUp';
import Dashboard from '../views/pages/dashboard';
import About from '../views/pages/about';
import Detail from '../views/pages/detail';

// Destination
import Search from '../views/pages/search';
import AddDestination from '../views/pages/destination/add';
import ListDestination from '../views/pages/destination/list';
import EditDestination from '../views/pages/destination/edit';

// Auth
import VerifyEmail from '../views/auth/verify-email';
import ResendEmailVerification from '../views/auth/resend-email-verification';

// User
import Profile from '../views/pages/profile';

// Mitra
import DashboardMitra from '../views/pages/mitra/dashboard';

const routes = {
  '/': Landing,
  '/landing': Landing,
  '/sign-in': SignIn,
  '/sign-up': SignUp,
  '/dashboard': Dashboard,
  '/about': About,
  '/detail/:id': Detail,

  '/search': Search,
  '/destination-add': AddDestination,
  '/destination-list': ListDestination,
  '/destination-edit/:id': EditDestination,

  '/verify-email': VerifyEmail,
  '/resend-email': ResendEmailVerification,

  '/profile': Profile,

  '/dashboard-mitra': DashboardMitra,
};

export default routes;
