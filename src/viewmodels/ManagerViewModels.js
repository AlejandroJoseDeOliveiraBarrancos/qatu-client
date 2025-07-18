import Signup from "./SignupViewModel.js";
import Home from "./HomeViewModel.js";
import Login from "./LoginViewModel.js";
import OtpValidation from "./OtpValidationViewModel.js";
import ForgotPassword from "./ForgotPassword.js";
import ResetPassword from "./ResetPasswordViewModel.js";
import Market from "./MarketViewModel.js";
import Product from "./ProductViewModel.js";
import UserManagement from "./UserManagement.js";
import UserProfile from "./UserProfileViewModel.js"; 
import deleteCatalog from "./DeleteCatalogViewModel.js";
import EditCatalog from "./EditCatalogViewModel.js";
import CatalogList from "./CatalogListViewModel.js";
import SupportChat from "./SupportChat.js";
import Cart from "./Cart.js";
import Catalog from "./CatalogViewModel.js";  
import EditProduct from "./EditProductViewModel.js"; 
import DeleteProduct from "./DeleteProductViewModel.js";

const pages = {
  signup: Signup,
  home: Home,
  login: Login,
  otpValidation: OtpValidation,
  forgotPassword: ForgotPassword,
  resetPassword: ResetPassword,
  market: Market,
  product: Product,
  userManagement: UserManagement,
  editProduct: EditProduct,
  deleteProduct: DeleteProduct,
  userProfile: UserProfile,
  catalogList: CatalogList,
  deleteCatalog: deleteCatalog,
  editCatalog: EditCatalog,
  catalog: Catalog,
  supportChat: SupportChat,
  userProfile: UserProfile,
  cart: Cart,
};

export { pages };
